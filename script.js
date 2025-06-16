/**
 * Contador de Páginas Vistas en GTM (V1.2) - LIMITADO A 20 PAGEVIEWS
 * 
 * Script profesional para el seguimiento granular de páginas vistas por sesión.
 * NUEVA FUNCIONALIDAD: Límite máximo de 20 pageviews para optimizar performance.
 * 
 * CARACTERÍSTICAS:
 * - Cross-Domain: Funciona entre subdominios y dominio principal
 * - Un Solo Evento: 'page_view_custom' con variables para triggers específicos
 * - Fallback Robusto: Cookies → SessionStorage → Modo degradado
 * - Hitos de Engagement: Variables para crear triggers personalizados
 * - Integridad de Datos: Validación completa y manejo de errores
 * - Alta Compatibilidad: 100% compatible con ES5 y modo incógnito
 * - LÍMITE MÁXIMO: 20 pageviews para evitar sobrecarga
 * 
 * EVENTOS ENVIADOS:
 * - 'page_view_custom': Evento único para TODOS los casos
 *   · page_views: 1, 2, 3... hasta 20, luego "max_reached"
 *   · page_views: "blocked" (storage bloqueado)
 * - 'engagement_milestone': Solo en páginas 3, 5, 10, 15, 20
 * 
 * VARIABLES PARA TRIGGERS:
 * - page_views: Valor principal (1-20, "max_reached", "blocked")
 * - page_number: Alias del anterior para compatibilidad
 * - storage_method: Método usado (cookie, sessionStorage, blocked)
 * - is_new_session: true/false
 * - tracking_working: true/false
 * - is_max_reached: true/false
 * 
 * TRIGGERS SIMPLIFICADOS:
 * - page_views equals 3 (conversión usuarios comprometidos)
 * - page_views greater than 4 AND page_views not equals "max_reached" (usuarios VIP)  
 * - page_views equals "blocked" (privacy-focused)
 * - page_views equals "max_reached" (usuarios super activos)
 * - page_views matches RegEx ^([1-9]|1[0-9]|20)$ (páginas 1-20)
 * 
 * Realizado por CONVERTIAM.COM By Juan Carlos Díaz
 * Contacto: jcarlos@convertiam.com | ¿Necesitas ayuda? ¡Escríbeme!
 * Versión: 1.2 | Fecha: Junio 2025
 * 
 * 🚀 ¿Quieres más scripts como este? Visita:
 * https://convertiam.com/?utm_source=github&utm_medium=script&utm_campaign=pageview_counter
 */

(function() {
    'use strict';
    
    // 🔧 CONFIGURACIÓN DEL SCRIPT
    var CONFIG = {
        storageKey: 'pageViews',           // Nombre de la clave en storage/cookie
        maxTrackedViews: 20,               // LÍMITE MÁXIMO: 20 páginas
        cookieExpiry: 1800,                // Expiración cookie en segundos (30 min)
        sendMilestones: true,              // Enviar eventos de hitos (opcional)
        milestones: [3, 5, 10, 15, 20],   // Páginas que disparan eventos especiales
        domain: 'auto'                     // 'auto' detecta dominio, o especificar '.tudominio.com'
    };
    
    // 📊 ESTADO DEL TRACKING
    var trackingState = {
        currentViews: 0,
        storageMethod: 'none',
        errors: [],
        isNewSession: false,
        trackingWorking: false,
        isMaxReached: false
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
     * 🔍 Función principal: Obtener e incrementar contador de páginas (CON LÍMITE)
     */
    function getAndIncrementPageViews() {
        var success = false;
        var cookieDomain = getCookieDomain();
        
        // 🍪 MÉTODO 1: Cookies primero (cross-domain)
        try {
            var regex = new RegExp(CONFIG.storageKey + '=(\\d+|max_reached)');
            var cookieMatch = document.cookie.match(regex);
            var wasEmpty = !cookieMatch;
            
            if (cookieMatch) {
                var storedValue = cookieMatch[1];
                
                // Si ya se alcanzó el máximo, no incrementar
                if (storedValue === 'max_reached') {
                    trackingState.currentViews = 'max_reached';
                    trackingState.isMaxReached = true;
                    trackingState.isNewSession = false;
                } else {
                    var currentCount = parseInt(storedValue, 10);
                    
                    // Validar y aplicar límite
                    if (currentCount >= CONFIG.maxTrackedViews) {
                        trackingState.currentViews = 'max_reached';
                        trackingState.isMaxReached = true;
                        trackingState.isNewSession = false;
                    } else {
                        trackingState.currentViews = currentCount + 1;
                        trackingState.isMaxReached = false;
                        trackingState.isNewSession = false;
                        
                        // Verificar si con este incremento alcanzamos el máximo
                        if (trackingState.currentViews >= CONFIG.maxTrackedViews) {
                            trackingState.currentViews = 'max_reached';
                            trackingState.isMaxReached = true;
                        }
                    }
                }
            } else {
                // Primera visita
                trackingState.currentViews = 1;
                trackingState.isNewSession = true;
                trackingState.isMaxReached = false;
            }
            
            // Guardar valor (max_reached o número)
            var valueToStore = trackingState.isMaxReached ? 'max_reached' : trackingState.currentViews;
            var cookieString = CONFIG.storageKey + '=' + valueToStore + 
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
                    
                    if (stored) {
                        // Si ya se alcanzó el máximo, no incrementar
                        if (stored === 'max_reached') {
                            trackingState.currentViews = 'max_reached';
                            trackingState.isMaxReached = true;
                            trackingState.isNewSession = false;
                        } else {
                            var currentCount = parseInt(stored, 10);
                            
                            // Validar que sea un número válido
                            if (isNaN(currentCount) || currentCount < 0) {
                                currentCount = 0;
                                trackingState.isNewSession = true;
                            }
                            
                            // Aplicar límite
                            if (currentCount >= CONFIG.maxTrackedViews) {
                                trackingState.currentViews = 'max_reached';
                                trackingState.isMaxReached = true;
                                trackingState.isNewSession = false;
                            } else {
                                trackingState.currentViews = currentCount + 1;
                                trackingState.isMaxReached = false;
                                trackingState.isNewSession = false;
                                
                                // Verificar si con este incremento alcanzamos el máximo
                                if (trackingState.currentViews >= CONFIG.maxTrackedViews) {
                                    trackingState.currentViews = 'max_reached';
                                    trackingState.isMaxReached = true;
                                }
                            }
                        }
                    } else {
                        // Primera visita
                        trackingState.currentViews = 1;
                        trackingState.isNewSession = true;
                        trackingState.isMaxReached = false;
                    }
                    
                    // Guardar valor
                    var valueToStore = trackingState.isMaxReached ? 'max_reached' : trackingState.currentViews;
                    sessionStorage.setItem(CONFIG.storageKey, valueToStore.toString());
                    
                    // Actualizar estado
                    trackingState.storageMethod = 'sessionStorage';
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
            trackingState.isMaxReached = false;
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
            'is_max_reached': trackingState.isMaxReached,  // NUEVA VARIABLE
            'max_limit': CONFIG.maxTrackedViews,           // NUEVA VARIABLE
            'domain_tracking': getCookieDomain()
        };
        
        // 🚨 CASOS ESPECIALES: Valores específicos para diferentes estados
        if (trackingState.currentViews === 'blocked') {
            eventData.page_views = 'blocked';
            eventData.page_number = 'blocked';
            eventData.privacy_level = 'high';
            eventData.user_type = 'privacy_focused';
        } else if (trackingState.currentViews === 'max_reached') {
            eventData.page_views = 'max_reached';
            eventData.page_number = 'max_reached';
            eventData.user_type = 'super_active';
            eventData.engagement_level = 'maximum';
        }
        
        // Añadir errores si existen
        if (trackingState.errors.length > 0) {
            eventData.tracking_errors = trackingState.errors.join(', ');
        }
        
        // Enviar evento único
        window.dataLayer.push(eventData);
        
        // 🏆 EVENTOS DE HITOS (opcional - solo para números válidos y max_reached)
        if (CONFIG.sendMilestones) {
            var shouldSendMilestone = false;
            var milestoneValue = 0;
            
            // Verificar si es un número y está en los hitos
            if (typeof trackingState.currentViews === 'number' &&
                CONFIG.milestones.indexOf && 
                CONFIG.milestones.indexOf(trackingState.currentViews) !== -1) {
                shouldSendMilestone = true;
                milestoneValue = trackingState.currentViews;
            }
            
            // O si se alcanzó el máximo (hito especial)
            if (trackingState.currentViews === 'max_reached' && 
                CONFIG.milestones.indexOf && 
                CONFIG.milestones.indexOf(CONFIG.maxTrackedViews) !== -1) {
                shouldSendMilestone = true;
                milestoneValue = CONFIG.maxTrackedViews;
            }
            
            if (shouldSendMilestone) {
                window.dataLayer.push({
                    'event': 'engagement_milestone',
                    'milestone_type': 'page_views',
                    'milestone_value': milestoneValue,
                    'milestone_page': milestoneValue,
                    'storage_method': trackingState.storageMethod,
                    'is_max_milestone': milestoneValue === CONFIG.maxTrackedViews
                });
            }
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
            'is_max_reached': false,
            'error_type': 'pageview_counter_failed',
            'error_message': globalError.message || 'Unknown error'
        });
    }
    
})();