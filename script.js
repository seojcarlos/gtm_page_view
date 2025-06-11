 /**
 * Contador de Páginas Vistas en GTM (V2.0 - Final)
 * 
 * Script profesional para el seguimiento granular de páginas vistas por sesión.
 * 
 * CARACTERÍSTICAS:
 * - Eventos Específicos: Envía 'page_view_1', 'page_view_2', etc. para cada página vista
 * - Fallback Robusto: SessionStorage → Cookies → Modo degradado (sin persistencia)
 * - Notificación de Error Integrada: Si storage está bloqueado, funciona en modo básico
 * - Hitos de Engagement: Eventos especiales en páginas 3, 5, 10 para conversiones
 * - Integridad de Datos: Validación completa y manejo de errores transparente
 * - Alta Compatibilidad: 100% compatible con ES5 y modo incógnito
 * - Código Robusto y Seguro: Usa try-catch y IIFE para evitar conflictos
 * 
 * EVENTOS ENVIADOS:
 * - 'page_view_custom': Evento general con contador total
 * - 'page_view_N': Evento específico para cada página (N = número)
 * - 'page_view_blocked': Evento especial cuando storage está completamente bloqueado
 * - 'engagement_milestone_X_pages': Eventos especiales en hitos importantes
 * - 'tracking_blocked_analysis': Evento técnico para análisis de bloqueos
 * 
 * CASOS DE USO:
 * - Conversiones basadas en engagement (ej: "usuarios que vieron 3+ páginas")
 * - Análisis de embudo granular página por página
 * - Audiencias específicas por nivel de engagement
 * - Triggers condicionales en GTM basados en página específica
 * - Medición de usuarios privacy-focused (storage bloqueado)
 * - Análisis de impacto de ad-blockers y restricciones de privacidad
 * 
 * COMPATIBILIDAD:
 * - Todos los navegadores modernos
 * - Modo incógnito / privado
 * - Navegadores con storage deshabilitado
 * - GTM Web Container
 * - GTM Server-Side (como evento entrante)
 * 
 * Realizado por Juan Carlos Díaz By CONVERTIAM.COM
 * Contacto: jcarlos@convertiam.com | ¿Necesitas ayuda? ¡Escríbeme!
 * Versión: 1.0 | Fecha: Junio 2025
 * Licencia: MIT | Uso libre con atribución
 * 
 * ¿Quieres más scripts como este? Visita:
 * https://convertiam.com/?utm_source=github&utm_medium=script&utm_campaign=pageview_counter
 */

(function() {
    'use strict';
    
    // CONFIGURACIÓN DEL SCRIPT
    var CONFIG = {
        storageKey: 'pageViews',           // Nombre de la clave en storage/cookie
        maxTrackedViews: 15,               // Máximo número de páginas a trackear individualmente
        cookieExpiry: 1800,                // Expiración cookie en segundos (30 min)
        includeGeneralEvent: true,         // Enviar también evento general 'page_view_custom'
        milestones: [3, 5, 10],           // Páginas que disparan eventos especiales
        eventPrefix: 'page_view_',         // Prefijo para eventos específicos
        generalEventName: 'page_view_custom' // Nombre del evento general
    };
    
    // ESTADO DEL TRACKING
    var trackingState = {
        currentViews: 0,
        storageMethod: 'none',
        errors: [],
        isNewSession: false,
        trackingWorking: false
    };
    
    /**
     * Función principal: Obtener e incrementar contador de páginas
     */
    function getAndIncrementPageViews() {
        var success = false;
        
        // MÉTODO 1: Intentar sessionStorage (preferido)
        try {
            if (window.sessionStorage) {
                var stored = sessionStorage.getItem(CONFIG.storageKey);
                var wasEmpty = !stored;
                
                // Obtener valor actual
                trackingState.currentViews = stored ? parseInt(stored, 10) : 0;
                
                // Validar que sea un número válido
                if (isNaN(trackingState.currentViews) || trackingState.currentViews < 0) {
                    trackingState.currentViews = 0;
                    trackingState.isNewSession = true;
                }
                
                // Incrementar y guardar
                trackingState.currentViews += 1;
                sessionStorage.setItem(CONFIG.storageKey, trackingState.currentViews.toString());
                
                // Actualizar estado
                trackingState.storageMethod = 'sessionStorage';
                trackingState.isNewSession = wasEmpty;
                trackingState.trackingWorking = true;
                success = true;
            }
        } catch (e) {
            trackingState.errors.push('sessionStorage_failed: ' + e.message);
        }
        
        // MÉTODO 2: Fallback a cookies (modo incógnito)
        if (!success) {
            try {
                var regex = new RegExp(CONFIG.storageKey + '=(\\d+)');
                var cookieMatch = document.cookie.match(regex);
                var wasEmpty = !cookieMatch;
                
                // Obtener o crear valor
                trackingState.currentViews = cookieMatch ? parseInt(cookieMatch[1]) + 1 : 1;
                trackingState.isNewSession = wasEmpty;
                
                // Cookie más robusta y segura
                var cookieString = CONFIG.storageKey + '=' + trackingState.currentViews + 
                                 '; path=/' + 
                                 '; max-age=' + CONFIG.cookieExpiry;
                
                // Añadir flags de seguridad solo si es HTTPS
                if (location.protocol === 'https:') {
                    cookieString += '; secure; samesite=lax';
                } else {
                    cookieString += '; samesite=lax';
                }
                
                document.cookie = cookieString;
                
                // Actualizar estado
                trackingState.storageMethod = 'cookie';
                trackingState.trackingWorking = true;
                success = true;
            } catch (e) {
                trackingState.errors.push('cookie_failed: ' + e.message);
            }
        }
        
        // MÉTODO 3: Modo bloqueado (sin persistencia - para análisis)
        if (!success) {
            trackingState.currentViews = 'blocked';  // Valor especial
            trackingState.storageMethod = 'blocked';
            trackingState.isNewSession = true;
            trackingState.trackingWorking = false;
        }
    }
    
    /**
     * Función para enviar eventos al dataLayer
     */
    function sendTrackingEvents() {
        // Inicializar dataLayer si no existe
        window.dataLayer = window.dataLayer || [];
        
        // CASO ESPECIAL: Storage completamente bloqueado
        if (trackingState.currentViews === 'blocked') {
            // Evento general para storage bloqueado
            if (CONFIG.includeGeneralEvent) {
                window.dataLayer.push({
                    'event': CONFIG.generalEventName,
                    'page_views': 'blocked',
                    'storage_method': 'blocked',
                    'is_new_session': true,
                    'tracking_working': false,
                    'tracking_errors': trackingState.errors.join(', '),
                    'privacy_level': 'high'  // Usuario con alta privacidad
                });
            }
            
            // Evento específico para identificar usuarios bloqueados
            window.dataLayer.push({
                'event': 'page_view_blocked',
                'page_number': 'blocked',
                'storage_method': 'blocked',
                'is_new_session': true,
                'tracking_working': false,
                'privacy_level': 'high',
                'user_type': 'privacy_focused'
            });
            
            // Evento especial para análisis de bloqueo
            window.dataLayer.push({
                'event': 'tracking_blocked_analysis',
                'block_type': 'complete_storage_block',
                'affected_features': ['sessionStorage', 'cookies'],
                'fallback_available': false,
                'business_impact': 'session_tracking_impossible'
            });
            
            return; // Salir aquí para usuarios bloqueados
        }
        
        // EVENTOS NORMALES (cuando tracking funciona)
        
        // EVENTO GENERAL (resumen)
        if (CONFIG.includeGeneralEvent) {
            window.dataLayer.push({
                'event': CONFIG.generalEventName,
                'page_views': trackingState.currentViews,
                'storage_method': trackingState.storageMethod,
                'is_new_session': trackingState.isNewSession,
                'tracking_working': trackingState.trackingWorking,
                'tracking_errors': trackingState.errors.length > 0 ? trackingState.errors.join(', ') : undefined
            });
        }
        
        // EVENTO ESPECÍFICO (página individual)
        if (trackingState.currentViews <= CONFIG.maxTrackedViews) {
            window.dataLayer.push({
                'event': CONFIG.eventPrefix + trackingState.currentViews,
                'page_number': trackingState.currentViews,
                'storage_method': trackingState.storageMethod,
                'is_new_session': trackingState.isNewSession,
                'tracking_working': trackingState.trackingWorking
            });
        }
        
        // EVENTOS DE HITOS (engagement especial)
        if (CONFIG.milestones.indexOf && CONFIG.milestones.indexOf(trackingState.currentViews) !== -1) {
            window.dataLayer.push({
                'event': 'engagement_milestone_' + trackingState.currentViews + '_pages',
                'milestone_type': 'page_views',
                'milestone_value': trackingState.currentViews,
                'milestone_reached': CONFIG.eventPrefix + trackingState.currentViews,
                'storage_method': trackingState.storageMethod
            });
        }
    }
    
    // EJECUCIÓN PRINCIPAL
    try {
        getAndIncrementPageViews();
        sendTrackingEvents();
    } catch (globalError) {
        // Error crítico: enviar evento de emergencia
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            'event': 'tracking_critical_error',
            'error_type': 'pageview_counter_failed',
            'error_message': globalError.message || 'Unknown error',
            'fallback_page_views': 1
        });
    }
    
})(); // IIFE (Immediately Invoked Function Expression) para evitar contaminar scope global
