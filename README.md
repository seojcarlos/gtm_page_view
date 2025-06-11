# 📊 GTM PageView Counter - Contador Inteligente de Páginas Vistas

> **¿Tu sitio web es un misterio? 🕵️‍♂️ ¡Descubre exactamente cuántas páginas ven tus usuarios!**

![GTM](https://img.shields.io/badge/GTM-Ready-brightgreen) ![ES5](https://img.shields.io/badge/ES5-Compatible-blue) ![Privacy](https://img.shields.io/badge/Privacy-Friendly-orange) ![MIT](https://img.shields.io/badge/License-MIT-yellow)

> **📧 ¿Necesitas ayuda con la implementación?** Contacta a Juan Carlos: jcarlos@convertiam.com  
> **🎁 Primera consulta GRATIS** | **🚀 Más scripts en [convertiam.com](https://convertiam.com/?utm_source=github&utm_medium=badge&utm_campaign=pageview_counter)**

## 🎯 ¿Qué hace este script mágico?

Imagínate que tienes una tienda física y quieres saber:
- 🚪 **¿Cuántos pasillos visita cada cliente?**
- 🛍️ **¿Los que ven 3+ secciones compran más?**
- 📈 **¿En qué momento se van la mayoría?**

**¡Este script hace exactamente eso para tu sitio web!** 🎉

### ✨ Características principales

- 🎯 **Eventos específicos**: `page_view_1`, `page_view_2`, `page_view_3`...
- 🔄 **Fallback inteligente**: SessionStorage → Cookies → Modo básico
- 🕵️ **Modo incógnito**: ¡Funciona incluso cuando el usuario navega en privado!
- 🏆 **Hitos especiales**: Eventos automáticos en páginas 3, 5 y 10
- 🛡️ **Súper robusto**: Nunca rompe tu sitio, siempre funciona
- 🎮 **Fácil de usar**: Copy, paste, ¡y funciona!

### 🛡️ Para análisis de privacidad
- **Usuarios privacy-focused**: ¿Cuántos bloquean completamente el tracking?
- **Impacto de ad-blockers**: Medir el porcentaje real de usuarios afectados
- **Estrategias alternativas**: Ofertas especiales para usuarios "bloqueados"
- **Compliance**: Demostrar respeto por la privacidad del usuario

### 🕵️ **"Insight de usuarios privacy-focused"**
```javascript
// Trigger en page_view_blocked
// Crear audiencia especial: "Usuarios con alta privacidad"
// Estrategia: Contenido sobre transparencia y privacidad
```

### 📊 **"Dashboard de bloqueo"**
```javascript
// Métricas en GA4:
// % de usuarios con page_view_blocked
// Correlación: usuarios bloqueados vs conversiones
// Insight: ¿Los usuarios privacy-focused compran más o menos?
```

---

## 🚀 Guía paso a paso (¡Sin ser un experto!)

### Paso 1: 📋 Copia el código

1. Ve al archivo `pageview-counter.js` de este repositorio
2. **Copia todo el código** (desde `/**` hasta `})();`)
3. ¡Guárdalo en tu portapapeles! 📎

### Paso 2: 🏠 Entra a Google Tag Manager

1. Ve a [tagmanager.google.com](https://tagmanager.google.com)
2. **Entra con tu cuenta de Google** 🔐
3. **Selecciona tu contenedor** (la cajita de tu sitio web)

> **🤔 ¿No tienes GTM?** [Aquí tienes una guía súper fácil](https://support.google.com/tagmanager/answer/6103696?hl=es)

### Paso 3: 🏷️ Crear un nuevo tag

1. En el menú izquierdo, haz clic en **"Etiquetas"** (Tags)
2. Haz clic en **"Nueva"** (botón rojo)
3. Haz clic en **"Configuración de etiqueta"**
4. Selecciona **"HTML personalizado"**

### Paso 4: 📝 Pegar el código

1. **Pega el código** que copiaste en el paso 1
2. **🚨 MUY IMPORTANTE**: Debes **añadir las etiquetas** `<script>` al principio y `</script>` al final

**Así debe quedar en GTM:**
```html
<script>
/**
 * Contador de Páginas Vistas en GTM (V1.0 - Final)
 * 
 * Script profesional para el seguimiento granular de páginas vistas por sesión.
 * 
 * CARACTERÍSTICAS:
 * - Eventos Específicos: Envía 'page_view_1', 'page_view_2', etc.
 * [... resto del comentario ...]
 * 
 * Realizado por CONVERTIAM.COM By Juan Carlos Díaz
 * Contacto: jcarlos@convertiam.com
 */

(function() {
    'use strict';
    
    // 🔧 CONFIGURACIÓN DEL SCRIPT
    var CONFIG = {
        storageKey: 'pageViews',
        maxTrackedViews: 15,
        // ... resto de configuración ...
    };
    
    // ... resto del código completo ...
    
})();
</script>
```

3. **Nombra tu tag**: `"HTML - Contador de Páginas Vistas"`
4. ✅ **Marca la casilla** "Admitir document.write"

### 🎬 **Ejemplo visual paso a paso:**

**1️⃣ Tu código original (.js):**
```javascript
/**
 * Contador de Páginas Vistas...
 */
(function() {
    // código aquí
})();
```

**2️⃣ Lo que debes pegar en GTM:**
```html
<script>
/**
 * Contador de Páginas Vistas...
 */
(function() {
    // código aquí
})();
</script>
```

> **💡 ¿Por qué añadir `<script>`?** Nuestro código es un archivo `.js` puro (JavaScript). Pero GTM necesita que esté envuelto en etiquetas HTML para funcionar correctamente.

**✅ CORRECTO EN GTM:**
```html
<script>
[tu código completo aquí]
</script>
```

**❌ INCORRECTO EN GTM:**
```javascript
[código sin etiquetas script]
```

### Paso 5: ⚡ Configurar cuándo se ejecuta

1. Haz clic en **"Activación"**
2. Selecciona **"All Pages"** (Todas las páginas)
3. Haz clic en **"Guardar"**

### Paso 6: 🧪 ¡Tiempo de probar!

1. Haz clic en **"Vista previa"** (Preview)
2. **Abre tu sitio web** en una nueva pestaña
3. **Navega por 3-4 páginas diferentes**
4. ¡Ve la magia acontecer! ✨

### Paso 7: 🚀 ¡Publicar cuando esté listo!

1. Si todo funciona bien en Preview, haz clic en **"Enviar"**
2. Añade un comentario: **"Contador de páginas vistas implementado"**
3. Haz clic en **"Publicar"**

---

## 🏷️ Configuración avanzada: Crear triggers y tags específicos

### 📋 Paso 1: Crear variables necesarias

#### Variable: Número de página
1. Ve a **"Variables"** → **"Nueva"** (en Variables definidas por el usuario)
2. **Tipo**: Variable de capa de datos
3. **Nombre de variable de capa de datos**: `page_number`
4. **Nombre de la variable**: `DL - Page Number`
5. **Guardar**

#### Variable: Método de storage
1. **Nueva variable** → **Capa de datos**
2. **Nombre de variable de capa de datos**: `storage_method`
3. **Nombre**: `DL - Storage Method`
4. **Guardar**

#### Variable: Nivel de privacidad
1. **Nueva variable** → **Capa de datos**
2. **Nombre de variable de capa de datos**: `privacy_level`
3. **Nombre**: `DL - Privacy Level`
4. **Guardar**

### 🎯 Paso 2: Crear triggers específicos

#### Trigger: Tercera página vista
1. Ve a **"Activadores"** → **"Nuevo"**
2. **Tipo**: Evento personalizado
3. **Nombre del evento**: `page_view_3`
4. **Nombre del trigger**: `CE - Page View 3`
5. **Guardar**

#### Trigger: Quinta página vista
1. **Nuevo activador** → **Evento personalizado**
2. **Nombre del evento**: `page_view_5`
3. **Nombre**: `CE - Page View 5`
4. **Guardar**

#### Trigger: Hito de 3 páginas
1. **Nuevo activador** → **Evento personalizado**
2. **Nombre del evento**: `engagement_milestone_3_pages`
3. **Nombre**: `CE - Engagement Milestone 3`
4. **Guardar**

#### Trigger: Usuarios privacy-focused
1. **Nuevo activador** → **Evento personalizado**
2. **Nombre del evento**: `page_view_blocked`
3. **Nombre**: `CE - Privacy Focused User`
4. **Guardar**

#### Trigger: Cualquier página específica (1-10)
1. **Nuevo activador** → **Evento personalizado**
2. **Nombre del evento**: `page_view_.*` 
3. ✅ **Marcar**: "Utilizar coincidencia de expresión regular"
4. **Condiciones**:
   - **Variable**: `{{DL - Page Number}}`
   - **Operador**: coincide con RegEx
   - **Valor**: `^[1-9]|10# 📊 GTM PageView Counter - Contador Inteligente de Páginas Vistas

> **¿Tu sitio web es un misterio? 🕵️‍♂️ ¡Descubre exactamente cuántas páginas ven tus usuarios!**

![GTM](https://img.shields.io/badge/GTM-Ready-brightgreen) ![ES5](https://img.shields.io/badge/ES5-Compatible-blue) ![Privacy](https://img.shields.io/badge/Privacy-Friendly-orange) ![MIT](https://img.shields.io/badge/License-MIT-yellow)

> **📧 ¿Necesitas ayuda con la implementación?** Contacta a Juan Carlos: jcarlos@convertiam.com  
> **🎁 Primera consulta GRATIS** | **🚀 Más scripts en [convertiam.com](https://convertiam.com/?utm_source=github&utm_medium=badge&utm_campaign=pageview_counter)**

## 🎯 ¿Qué hace este script mágico?

Imagínate que tienes una tienda física y quieres saber:
- 🚪 **¿Cuántos pasillos visita cada cliente?**
- 🛍️ **¿Los que ven 3+ secciones compran más?**
- 📈 **¿En qué momento se van la mayoría?**

**¡Este script hace exactamente eso para tu sitio web!** 🎉

### ✨ Características principales

- 🎯 **Eventos específicos**: `page_view_1`, `page_view_2`, `page_view_3`...
- 🔄 **Fallback inteligente**: SessionStorage → Cookies → Modo básico
- 🕵️ **Modo incógnito**: ¡Funciona incluso cuando el usuario navega en privado!
- 🏆 **Hitos especiales**: Eventos automáticos en páginas 3, 5 y 10
- 🛡️ **Súper robusto**: Nunca rompe tu sitio, siempre funciona
- 🎮 **Fácil de usar**: Copy, paste, ¡y funciona!

### 🛡️ Para análisis de privacidad
- **Usuarios privacy-focused**: ¿Cuántos bloquean completamente el tracking?
- **Impacto de ad-blockers**: Medir el porcentaje real de usuarios afectados
- **Estrategias alternativas**: Ofertas especiales para usuarios "bloqueados"
- **Compliance**: Demostrar respeto por la privacidad del usuario

### 🕵️ **"Insight de usuarios privacy-focused"**
```javascript
// Trigger en page_view_blocked
// Crear audiencia especial: "Usuarios con alta privacidad"
// Estrategia: Contenido sobre transparencia y privacidad
```

### 📊 **"Dashboard de bloqueo"**
```javascript
// Métricas en GA4:
// % de usuarios con page_view_blocked
// Correlación: usuarios bloqueados vs conversiones
// Insight: ¿Los usuarios privacy-focused compran más o menos?
```

---

## 🚀 Guía paso a paso (¡Sin ser un experto!)

### Paso 1: 📋 Copia el código

1. Ve al archivo `pageview-counter.js` de este repositorio
2. **Copia todo el código** (desde `/**` hasta `})();`)
3. ¡Guárdalo en tu portapapeles! 📎

### Paso 2: 🏠 Entra a Google Tag Manager

1. Ve a [tagmanager.google.com](https://tagmanager.google.com)
2. **Entra con tu cuenta de Google** 🔐
3. **Selecciona tu contenedor** (la cajita de tu sitio web)

> **🤔 ¿No tienes GTM?** [Aquí tienes una guía súper fácil](https://support.google.com/tagmanager/answer/6103696?hl=es)

### Paso 3: 🏷️ Crear un nuevo tag

1. En el menú izquierdo, haz clic en **"Etiquetas"** (Tags)
2. Haz clic en **"Nueva"** (botón rojo)
3. Haz clic en **"Configuración de etiqueta"**
4. Selecciona **"HTML personalizado"**

### Paso 4: 📝 Pegar el código

1. **Pega el código** que copiaste en el paso 1
2. **Nombra tu tag**: `"HTML - Contador de Páginas Vistas"`
3. ✅ **Marca la casilla** "Admitir document.write"

### Paso 5: ⚡ Configurar cuándo se ejecuta

1. Haz clic en **"Activación"**
2. Selecciona **"All Pages"** (Todas las páginas)
3. Haz clic en **"Guardar"**

 (páginas 1 a 10)
5. **Nombre**: `CE - Specific Page Views (1-10)`
6. **Guardar**

### 📊 Paso 3: Crear tags para Google Analytics 4

#### Tag: Conversión por engagement (3+ páginas)
1. Ve a **"Etiquetas"** → **"Nueva"**
2. **Tipo**: Google Analytics: Evento de GA4
3. **Configuración**:
   - **ID de medición**: Tu GA_MEASUREMENT_ID
   - **Nombre del evento**: `high_engagement_user`
   - **Parámetros del evento**:
     - `engagement_level`: `high`
     - `pages_viewed`: `{{DL - Page Number}}`
     - `storage_method`: `{{DL - Storage Method}}`
4. **Activación**: `CE - Engagement Milestone 3`
5. **Nombre**: `GA4 - High Engagement Conversion`
6. **Guardar**

#### Tag: Conversión por página específica (5 páginas)
1. **Nueva etiqueta** → **GA4 Evento**
2. **Configuración**:
   - **ID de medición**: Tu GA_MEASUREMENT_ID
   - **Nombre del evento**: `very_engaged_user`
   - **Parámetros**:
     - `conversion_type`: `page_engagement`
     - `trigger_page`: `5`
3. **Activación**: `CE - Page View 5`
4. **Nombre**: `GA4 - Very Engaged Conversion`
5. **Guardar**

#### Tag: Seguimiento de usuarios privacy-focused
1. **Nueva etiqueta** → **GA4 Evento**
2. **Configuración**:
   - **Nombre del evento**: `privacy_focused_user`
   - **Parámetros**:
     - `user_type`: `privacy_conscious`
     - `privacy_level`: `{{DL - Privacy Level}}`
     - `tracking_method`: `fallback_only`
3. **Activación**: `CE - Privacy Focused User`
4. **Nombre**: `GA4 - Privacy Focused Tracking`
5. **Guardar**

### 🎯 Paso 4: Tags para campañas de marketing

#### Tag: Facebook Pixel - Usuarios comprometidos
1. **Nueva etiqueta** → **HTML personalizado**
2. **HTML** (⚠️ **Este código YA incluye** `<script>` - copiar tal como está):
```html
<script>
fbq('trackCustom', 'HighEngagementUser', {
  pages_viewed: {{DL - Page Number}},
  engagement_level: 'high',
  storage_method: {{DL - Storage Method}}
});
</script>
```
3. **Activación**: `CE - Engagement Milestone 3`
4. **Nombre**: `FB - High Engagement Event`
5. **Guardar**

#### Tag: Google Ads - Conversión de engagement
1. **Nueva etiqueta** → **Conversión de Google Ads**
2. **Configuración**:
   - **ID de conversión**: Tu ID de Google Ads
   - **Etiqueta de conversión**: `page_engagement_3plus`
   - **Valor de conversión**: `1`
3. **Activación**: `CE - Engagement Milestone 3`
4. **Nombre**: `Google Ads - Page Engagement Conversion`
5. **Guardar**

### 🛡️ Paso 5: Tags para usuarios privacy-focused

#### Tag: Mostrar banner de transparencia
1. **Nueva etiqueta** → **HTML personalizado**
2. **HTML** (⚠️ **Este código YA incluye** `<script>` - copiar completo):
```html
<script>
// Mostrar banner especial para usuarios privacy-focused
if (typeof showPrivacyBanner === 'function') {
  showPrivacyBanner({
    message: "Respetamos tu privacidad al 100%",
    type: "transparency",
    show_discount: true
  });
}
</script>
```
3. **Activación**: `CE - Privacy Focused User`
4. **Nombre**: `Custom - Privacy Banner`
5. **Guardar**

#### Tag: Activar chat proactivo
1. **Nueva etiqueta** → **HTML personalizado**
2. **HTML** (⚠️ **Este código YA incluye** `<script>` - copiar completo):
```html
<script>
// Activar chat para usuarios privacy-focused
if (typeof window.intercomSettings !== 'undefined') {
  window.Intercom('update', {
    "custom_launcher_selector": ".privacy-chat-launcher",
    "hide_default_launcher": false
  });
  
  // Mensaje proactivo después de 30 segundos
  setTimeout(function() {
    window.Intercom('showNewMessage', 
      "¡Hola! Veo que valoras tu privacidad. ¿Tienes preguntas sobre nuestras políticas de datos?"
    );
  }, 30000);
}
</script>
```
3. **Activación**: `CE - Privacy Focused User`
4. **Nombre**: `Custom - Privacy Chat Activation`
5. **Guardar**

### 📱 Paso 6: Tags para remarketing avanzado

#### Tag: Audiencia de alta calidad (5+ páginas)
1. **Nueva etiqueta** → **Google Ads Remarketing**
2. **Configuración**:
   - **ID de conversión**: Tu ID
   - **Parámetros personalizados**:
     - `page_engagement_level`: `very_high`
     - `pages_viewed`: `{{DL - Page Number}}`
3. **Activación**: `CE - Page View 5`
4. **Nombre**: `Google Ads - High Value Audience`
5. **Guardar**

#### Tag: Exclusión de audiencia (usuarios bloqueados)
1. **Nueva etiqueta** → **Google Ads Remarketing**
2. **Configuración**:
   - **Parámetros**:
     - `user_privacy_level`: `high`
     - `exclude_from_targeting`: `true`
3. **Activación**: `CE - Privacy Focused User`
4. **Nombre**: `Google Ads - Privacy Exclusion`
5. **Guardar**

### 🎊 Paso 7: Tags de celebración y engagement

#### Tag: Popup de felicitación (3 páginas)
1. **Nueva etiqueta** → **HTML personalizado**
2. **HTML** (⚠️ **Este código YA incluye** `<script>` - copiar completo):
```html
<script>
// Mostrar popup de celebración
setTimeout(function() {
  if (typeof showCelebrationPopup === 'function') {
    showCelebrationPopup({
      title: "¡Eres un explorador increíble! 🎉",
      message: "Has visto 3 páginas. ¿Te gustaría un 10% de descuento?",
      cta_text: "¡Quiero mi descuento!",
      cta_link: "/descuento-explorador"
    });
  }
}, 2000);
</script>
```
3. **Activación**: `CE - Engagement Milestone 3`
4. **Nombre**: `Custom - Celebration Popup`
5. **Guardar**

### 📋 Paso 8: Testing y QA

#### Crear tag de debug y testing
1. **Nueva etiqueta** → **HTML personalizado**
2. **HTML** (⚠️ **Este código YA incluye** `<script>` - copiar completo):
```html
<script>
console.log('🎯 Page View Event Detected:', {
  event: '{{Event}}',
  page_number: '{{DL - Page Number}}',
  storage_method: '{{DL - Storage Method}}',
  privacy_level: '{{DL - Privacy Level}}'
});
</script>
```
3. **Activación**: `CE - Specific Page Views (1-10)`
4. **Nombre**: `Debug - Console Logger`
5. **Guardar**

### 🚀 Paso 9: Publicación y monitorización

#### Antes de publicar - Checklist final:
- ✅ **Probado en Preview** con al menos 5 páginas
- ✅ **Eventos en consola** aparecen correctamente
- ✅ **Triggers específicos** se activan cuando deben
- ✅ **Tags de GA4** envían datos a DebugView
- ✅ **Popup/banners** funcionan como esperado

#### Publicar cambios:
1. **Enviar** → **Publicar cambios**
2. **Comentario**: "Sistema de tracking por páginas vistas implementado"
3. **Monitorizar** en GA4 Tiempo Real durante las primeras horas

#### Configurar alertas:
1. **GA4** → **Admin** → **Alertas personalizadas**
2. **Nueva alerta**:
   - **Métrica**: `high_engagement_user` events
   - **Condición**: Disminución >50% día a día
   - **Notificación**: Email diario

---

## 🔍 ¿Cómo verificar que funciona?

### Método 1: 👀 GTM Debug (Fácil)

Cuando estés en modo **Vista previa**:

1. **Recarga tu página** → Deberías ver `page_view_1`
2. **Ve a otra página** → Deberías ver `page_view_2`
3. **Una más** → Deberías ver `page_view_3` + `engagement_milestone_3_pages` 🎉

### Método 2: 🛠️ Consola del navegador (Para valientes)

1. **Presiona F12** en tu navegador
2. Ve a la pestaña **"Console"**
3. Escribe: `dataLayer` y presiona Enter
4. **¡Busca tus eventos!** Deberías ver algo como:

```javascript
{
  event: "page_view_1",
  page_number: 1,
  storage_method: "sessionStorage"
}
```

### Método 3: 🎯 Verificación de triggers específicos

#### ✅ Checklist de triggers que deben activarse:

**Primera página:**
- ✅ `CE - Specific Page Views (1-10)` se activa
- ✅ Tag `Debug - Console Logger` ejecuta
- ✅ Ves en consola: `🎯 Page View Event Detected`

**Tercera página:**
- ✅ `CE - Page View 3` se activa
- ✅ `CE - Engagement Milestone 3` se activa  
- ✅ Tag `GA4 - High Engagement Conversion` ejecuta
- ✅ Si tienes: `Custom - Celebration Popup` muestra popup

**Quinta página:**
- ✅ `CE - Page View 5` se activa
- ✅ Tag `GA4 - Very Engaged Conversion` ejecuta
- ✅ `Google Ads - High Value Audience` añade a audiencia

**Usuario con storage bloqueado:**
- ✅ `CE - Privacy Focused User` se activa
- ✅ `GA4 - Privacy Focused Tracking` ejecuta
- ✅ `Custom - Privacy Banner` muestra banner

### Método 4: 📊 Verificación en GA4 (Más profesional)

#### En GA4 DebugView:
1. Ve a **GA4** → **Admin** → **DebugView**
2. **Navega por tu sitio** con Preview activo
3. **Deberías ver eventos**:
   - `high_engagement_user` (página 3)
   - `very_engaged_user` (página 5)  
   - `privacy_focused_user` (si storage bloqueado)

#### En GA4 Eventos en tiempo real:
1. **GA4** → **Informes** → **Tiempo real** → **Evento**
2. **Filtra por**:
   - `high_engagement_user`
   - `very_engaged_user`
   - `privacy_focused_user`

### Método 5: 🚨 Troubleshooting específico

#### ❌ "No veo el trigger CE - Page View 3"
**Soluciones:**
1. ✅ Verifica que el **nombre del evento** sea exactamente `page_view_3`
2. ✅ Confirma que has **navegado realmente** a 3 páginas diferentes
3. ✅ Revisa en **consola** si hay errores de JavaScript

#### ❌ "El popup de celebración no aparece"
**Posibles causas:**
1. 🔍 La función `showCelebrationPopup` no existe en tu sitio
2. 🔍 El trigger `CE - Engagement Milestone 3` no se activa
3. 🔍 Hay conflictos con otros popups/modales

#### ❌ "GA4 no recibe los eventos personalizados"
**Verificar:**
1. ✅ **ID de medición** correcto en tags GA4
2. ✅ **Nombres de eventos** no tienen caracteres especiales
3. ✅ Tags están **publicados**, no solo en preview

#### ❌ "Los usuarios privacy-focused no se detectan"
**Para testear:**
1. 🕵️ **Abre navegador en modo incógnito**
2. 🕵️ **Desactiva JavaScript** temporalmente
3. 🕵️ **Usa extensión para bloquear storage**
4. 🕵️ Debería aparecer evento `page_view_blocked`

---

## 🎊 ¿Qué eventos envía exactamente?

### 📊 Evento general (resumen)
```javascript
{
  event: "page_view_custom",
  page_views: 3,                    // Número total
  storage_method: "sessionStorage", // Cómo se guardó
  is_new_session: false            // ¿Es una sesión nueva?
}
```

### 🎯 Eventos específicos (¡la magia!)
```javascript
// Primera página
{ event: "page_view_1", page_number: 1 }

// Segunda página  
{ event: "page_view_2", page_number: 2 }

// Tercera página + BONUS
{ event: "page_view_3", page_number: 3 }
{ event: "engagement_milestone_3_pages" } // ¡Hito especial!
```

### 🏆 Hitos de engagement
- **Página 3**: `engagement_milestone_3_pages` 🥉
- **Página 5**: `engagement_milestone_5_pages` 🥈  
- **Página 10**: `engagement_milestone_10_pages` 🥇

### 🛡️ Eventos especiales (usuarios privacy-focused)
```javascript
// Cuando storage está completamente bloqueado
{ 
  event: "page_view_blocked", 
  privacy_level: "high",
  user_type: "privacy_focused"
}

// Análisis técnico de bloqueo
{
  event: "tracking_blocked_analysis",
  block_type: "complete_storage_block",
  business_impact: "session_tracking_impossible"
}
```

---

## 🎯 ¿Cómo usar estos eventos para tu negocio?

### 💰 Para ventas online
- **Conversión**: "Usuarios que vieron 3+ páginas compran 5x más"
- **Audiencia**: Retargeting a usuarios de `page_view_5`
- **Optimización**: ¿Por qué se van en `page_view_2`?

### 📈 Para blogs/contenido
- **Engagement**: Usuarios que leen 3+ artículos son súper fans
- **Newsletter**: Ofrecer suscripción en `page_view_3`
- **Contenido relacionado**: Mostrar en `page_view_2`

### 🛍️ Para ecommerce
- **Carrito abandonado**: Usuarios con `page_view_4` pero sin compra
- **Productos relacionados**: Activar en `page_view_3`
- **Descuentos**: Ofrecer en `page_view_5`

---

## 🔧 Personalización (Para usuarios avanzados)

### Cambiar los hitos de engagement

Encuentra esta línea en el código:

```javascript
milestones: [3, 5, 10],  // ← Cambia estos números
```

**Ejemplos:**
- Blog: `[2, 4, 7]` (lectores frecuentes)
- Ecommerce: `[3, 6, 10]` (compradores serios)  
- SaaS: `[5, 10, 15]` (usuarios comprometidos)

### Cambiar el tiempo de expiración

```javascript
cookieExpiry: 1800,  // ← 1800 = 30 minutos
```

**Ejemplos:**
- `3600` = 1 hora
- `7200` = 2 horas
- `900` = 15 minutos

---

## 🚨 Resolución de problemas

### ❌ "No veo eventos en GTM Preview"

**Soluciones:**
1. ✅ Verifica que el tag esté **publicado**
2. ✅ Confirma que el trigger sea **"All Pages"**
3. ✅ **Recarga la página** después de activar Preview
4. ✅ **Limpia la caché** del navegador

### ❌ "Los números se reinician en cada página"

**Posibles causas:**
- 🔍 Navegador en modo incógnito (¡está bien! Usa cookies)
- 🔍 Storage deshabilitado (fallback automático)
- 🔍 JavaScript bloqueado por ad-blocker

### ❌ "Solo veo page_view_1 siempre"

**¿Tu sitio es una Single Page App (SPA)?**
- React, Angular, Vue.js necesitan configuración especial
- [Aquí tienes la guía para SPAs](https://www.analyticsmania.com/post/single-page-web-app-with-google-tag-manager/)

### ❌ "Error: El código no funciona en GTM"

**Verifica las etiquetas `<script>`:**

**✅ CORRECTO** (script principal):
```html
<script>
/**
 * Contador de Páginas Vistas en GTM...
 */
(function() {
    // código completo aquí
})();
</script>
```

**❌ INCORRECTO** (sin etiquetas):
```javascript
/**
 * Contador de Páginas Vistas en GTM...
 */
(function() {
    // código aquí
})();
```

**Recuerda:** 
- 🟦 **Script principal** (.js): Necesitas añadir `<script>` manualmente
- 🟨 **Códigos de ejemplo**: Ya incluyen `<script>` completo

---

## 🎮 Casos de uso súper creativos

### 🏪 **"Descuento por explorador"**
```javascript
// En GTM, crear trigger:
// Event = page_view_5
// Disparar tag que muestre: "¡Has explorado mucho! 10% OFF"
```

### 📧 **"Newsletter inteligente"**
```javascript
// Trigger en engagement_milestone_3_pages
// Mostrar popup: "¿Te gusta lo que ves? ¡Suscríbete!"
```

### 🎯 **"Retargeting premium"**
```javascript
// Audiencia en Google Ads:
// Usuarios con page_view_7 = "Súper interesados"
```

---

## 🧪 Datos técnicos (Para desarrolladores)

### Compatibilidad
- ✅ **ES5** (Internet Explorer 9+)
- ✅ **Todos los navegadores modernos**
- ✅ **Modo incógnito/privado**
- ✅ **Storage deshabilitado**

### Fallback automático
1. **SessionStorage** (preferido)
2. **Cookies** (modo incógnito)
3. **Modo básico** (sin persistencia)

### Seguridad
- 🛡️ **IIFE** (sin contaminar scope global)
- 🛡️ **Try-catch** en todo
- 🛡️ **Validación** de datos
- 🛡️ **Cookies seguras** (Secure, SameSite)

---

## 📄 Licencia

**MIT License** - ¡Úsalo libremente! Solo menciona la autoría 😊

---

## 🤝 Contribuciones

¿Tienes ideas geniales? ¡Háznoslo saber!

1. 🍴 Fork este repositorio
2. 🌟 Crea tu feature (`git checkout -b feature/AmazingFeature`)
3. 💾 Commit tus cambios (`git commit -m 'Add AmazingFeature'`)
4. 📤 Push to the branch (`git push origin feature/AmazingFeature`)
5. 🎉 Abre un Pull Request

---

## 📞 ¿Necesitas ayuda?

### 🤖 **Ayuda técnica (GitHub):**
- 🐛 **¿Bug?** → [Abre un issue](../../issues)
- 💡 **¿Idea?** → [Cuéntanosla](../../discussions)  
- 🤔 **¿Duda técnica?** → [Pregúntanos](../../discussions)

### 👨‍💻 **Ayuda personalizada (Juan Carlos):**
**📧 Email directo:** jcarlos@convertiam.com  
**💬 Asunto:** "Ayuda PageView Counter - GitHub"

**¿Qué incluye la ayuda personalizada?**
- ✅ **Implementación paso a paso** vía videollamada
- ✅ **Configuración específica** para tu sitio web
- ✅ **Resolución de problemas** complejos
- ✅ **Optimización avanzada** de tu tracking
- ✅ **Scripts adicionales** según necesites

**🎁 Primera consulta GRATIS** (30 minutos)

---

## ⭐ ¿Te gustó? ¡Danos una estrella!

Si este script te ayudó, **¡dale una ⭐ al repositorio!** 

Esto nos ayuda a seguir creando herramientas geniales 🚀

---

**Hecho con ❤️ por [CONVERTIAM.COM](https://convertiam.com/?utm_source=github&utm_medium=readme&utm_campaign=pageview_counter)**

## 👨‍💻 ¿Necesitas ayuda personalizada?

**¡Hola! Soy Juan Carlos Díaz** 👋, creador de este script y especialista en Google Tag Manager.

### 📧 **Contacto directo:** jcarlos@convertiam.com

### 🚀 **¿En qué puedo ayudarte?**

- 🎯 **Implementación personalizada** de este script
- 📊 **Configuración avanzada** de GTM para tu negocio  
- 🔍 **Auditoría completa** de tu tracking actual
- 📈 **Estrategias de medición** para mejorar conversiones
- 🛠️ **Scripts personalizados** para casos específicos
- 🎓 **Formación en GTM** para tu equipo

### 💼 **Servicios especializados:**

- ✅ **GTM + GA4** setup completo
- ✅ **E-commerce tracking** avanzado  
- ✅ **Consent mode v2** implementación
- ✅ **Server-side tracking** con GTM
- ✅ **Scripts personalizados** como este

### 🎁 **¡Primera consulta GRATIS!**

**Escríbeme a:** jcarlos@convertiam.com  
**Asunto:** "Consulta PageView Counter - GitHub"

---

*¿Quieres más herramientas como esta? ¡Síguenos para más!* 🎯

**🔗 Más recursos:** [convertiam.com](https://convertiam.com/?utm_source=github&utm_medium=readme&utm_campaign=pageview_counter)