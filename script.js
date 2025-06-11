
/**
 * Contador de Páginas Vistas en GTM (V1.1 )
 * 
 * Script profesional para el seguimiento granular de páginas vistas por sesión.
 * 
 * CARACTERÍSTICAS:
 * - Cross-Domain: Funciona entre subdominios y dominio principal
 * - Un Solo Evento: 'page_view_custom' con variables para triggers específicos
 * - Fallback Robusto: Cookies → SessionStorage → Modo degradado
 * - Hitos de Engagement: Variables para crear triggers personalizados
 * - Integridad de Datos: Validación completa y manejo de errores
 * - Alta Compatibilidad: 100% compatible con ES5 y modo incógnito
 * 
 * EVENTOS ENVIADOS:
 * - 'page_view_custom': Evento único para TODOS los casos
 *   · page_views: 1, 2, 3... (páginas normales)
 *   · page_views: "blocked" (storage bloqueado)
 * - 'engagement_milestone': Solo en páginas 3, 5, 10 (opcional)
 * 
 * VARIABLES PARA TRIGGERS:
 * - page_views: Valor principal (1, 2, 3... o "blocked")
 * - page_number: Alias del anterior para compatibilidad
 * - storage_method: Método usado (cookie, sessionStorage, blocked)
 * - is_new_session: true/false
 * - tracking_working: true/false
 * 
 * TRIGGERS SIMPLIFICADOS:
 * - page_views equals 3 (conversión usuarios comprometidos)
 * - page_views greater than 4 (usuarios VIP)  
 * - page_views equals "blocked" (privacy-focused)
 * - page_views matches RegEx ^[1-9]|1[0-5]$ (páginas 1-15)
 * 
 * Realizado por CONVERTIAM.COM By Juan Carlos Díaz
 * Contacto: jcarlos@convertiam.com | ¿Necesitas ayuda? ¡Escríbeme!
 * Versión: 1.1 | Fecha: Junio 2025
 * 
 * 🚀 ¿Quieres más scripts como este? Visita:
 * https://convertiam.com/?utm_source=github&utm_medium=script&utm_campaign=pageview_counter
 */

(function() {
    'use strict';
    
    // 🔧 CONFIGURACIÓN DEL SCRIPT
    var CONFIG = {
        storageKey: 'pageViews',           // Nombre de la clave en storage/cookie
        maxTrackedViews: 15,               // Máximo número de páginas a trackear individualmente
        cookieExpiry: 1800,                // Expiración cookie en segundos (30 min)
        sendMilestones: true,              // Enviar eventos de hitos (opcional)
        milestones: [3, 5, 10],           // Páginas que disparan eventos especiales
        domain: 'auto'                     // 'auto' detecta dominio, o especificar '.tudominio.com'
    };
    
    // 📊 ESTADO DEL TRACKING
    var trackingState = {
        currentViews: 0,
        storageMethod: 'none',
        errors: [],
        isNewSession: false,
        trackingWorking: false
    };
    
    /**
     * 🍪 Función para obtener dominio para cookies cross-domain
     */
    function getCookieDomain() {
        if (CONFIG.domain !== 'auto') {
            return CONFIG.domain;
        }
        
        // Extraer dominio raíz (ej: subdominio.ejemplo.com → .ejemplo.com)
        var hostname = location.hostname;
        var parts = hostname.split('.');
        
        if (parts.length > 2) {
            return '.' + parts.slice(-2).join('.');
        }
        
        return hostname;
    }
    
    /**
     * 🔍 Función principal: Obtener e incrementar contador de páginas
     */
    function getAndIncrementPageViews() {
        var success = false;
        var cookieDomain = getCookieDomain();
        
        // 🍪 MÉTODO 1: Cookies primero (cross-domain)
        try {
            var regex = new RegExp(CONFIG.storageKey + '=(\\d+)');
            var cookieMatch = document.cookie.match(regex);
            var wasEmpty = !cookieMatch;
            
            // Obtener o crear valor
            trackingState.currentViews = cookieMatch ? parseInt(cookieMatch[1]) + 1 : 1;
            trackingState.isNewSession = wasEmpty;
            
            // Cookie cross-domain
            var cookieString = CONFIG.storageKey + '=' + trackingState.currentViews + 
                             '; path=/' + 
                             '; max-age=' + CONFIG.cookieExpiry +
                             '; domain=' + cookieDomain;
            
            // Añadir flags de seguridad si es HTTPS
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
        
        // 💾 MÉTODO 2: Fallback a sessionStorage
        if (!success) {
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
        }
        
        // 🚨 MÉTODO 3: Modo bloqueado (sin persistencia)
        if (!success) {
            trackingState.currentViews = 'blocked';
            trackingState.storageMethod = 'blocked';
            trackingState.isNewSession = true;
            trackingState.trackingWorking = false;
        }
    }
    
    /**
     * 📤 Función para enviar eventos al dataLayer
     */
    function sendTrackingEvents() {
        // Inicializar dataLayer si no existe
        window.dataLayer = window.dataLayer || [];
        
        // 📊 EVENTO ÚNICO PARA TODO (simplificado)
        var eventData = {
            'event': 'page_view_custom',
            'page_views': trackingState.currentViews,      // Valor clave para triggers
            'page_number': trackingState.currentViews,     // Alias para compatibilidad
            'storage_method': trackingState.storageMethod,
            'is_new_session': trackingState.isNewSession,
            'tracking_working': trackingState.trackingWorking,
            'domain_tracking': getCookieDomain()
        };
        
        // 🚨 CASOS ESPECIALES: Valores específicos para errores
        if (trackingState.currentViews === 'blocked') {
            eventData.page_views = 'blocked';           // Valor especial para triggers
            eventData.page_number = 'blocked';
            eventData.privacy_level = 'high';
            eventData.user_type = 'privacy_focused';
        }
        
        // Añadir errores si existen
        if (trackingState.errors.length > 0) {
            eventData.tracking_errors = trackingState.errors.join(', ');
        }
        
        // Enviar evento único
        window.dataLayer.push(eventData);
        
        // 🏆 EVENTOS DE HITOS (opcional - solo para números válidos)
        if (CONFIG.sendMilestones && 
            typeof trackingState.currentViews === 'number' &&
            CONFIG.milestones.indexOf && 
            CONFIG.milestones.indexOf(trackingState.currentViews) !== -1) {
            
            window.dataLayer.push({
                'event': 'engagement_milestone',
                'milestone_type': 'page_views',
                'milestone_value': trackingState.currentViews,
                'milestone_page': trackingState.currentViews,
                'storage_method': trackingState.storageMethod
            });
        }
    }
    
    // 🚀 EJECUCIÓN PRINCIPAL
    try {
        getAndIncrementPageViews();
        sendTrackingEvents();
    } catch (globalError) {
        // 🚨 Error crítico: usar el mismo evento para consistencia
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            'event': 'page_view_custom',
            'page_views': 'error',                    // Valor especial para error crítico
            'page_number': 'error',
            'storage_method': 'error',
            'is_new_session': true,
            'tracking_working': false,
            'error_type': 'pageview_counter_failed',
            'error_message': globalError.message || 'Unknown error'
        });
    }
    
})();
