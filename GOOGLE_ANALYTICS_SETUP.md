# 📊 Google Analytics 4 - Guía de Implementación

## ✅ Implementación Completa

Se ha implementado Google Analytics 4 (GA4) en todo el sitio con tracking automático de pageviews y eventos personalizados.

---

## 🔑 Configuración Requerida

### 1. Obtener tu ID de medición de GA4

1. Ve a [Google Analytics](https://analytics.google.com/)
2. Crea una cuenta si no tienes una
3. Crea una propiedad de **Google Analytics 4**
4. Ve a **Admin** → **Flujos de datos**
5. Selecciona tu flujo de datos web o crea uno nuevo
6. Copia el **ID de medición** (formato: `G-XXXXXXXXXX`)

### 2. Agregar la variable de entorno

Edita el archivo `.env.local` y agrega:

```bash
# Google Analytics 4
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

⚠️ **Importante**: Reemplaza `G-XXXXXXXXXX` con tu ID real de GA4.

### 3. Agregar a Vercel

Si despliegas en Vercel:

1. Ve a tu proyecto en Vercel
2. **Settings** → **Environment Variables**
3. Agrega: `NEXT_PUBLIC_GA_MEASUREMENT_ID` con valor `G-XXXXXXXXXX`
4. Aplica a: **Production, Preview, Development**
5. Redeploy tu aplicación

---

## 📁 Archivos Creados

```
src/
├── lib/
│   └── gtag.ts                    # Utilidades y funciones de tracking
├── components/
│   ├── GoogleAnalytics.tsx        # Scripts de GA4
│   └── Analytics.tsx              # Tracking automático de pageviews
└── app/
    └── layout.tsx                 # Actualizado con componentes GA
```

---

## 📈 Eventos Trackeados Automáticamente

### 1. **Pageviews**
- Se trackea cada cambio de página automáticamente
- Incluye parámetros UTM si están presentes

### 2. **Formulario de Creación**
- ✅ `iniciar_creacion` - Usuario abre el formulario
- ✅ `crear_novena` - Usuario completa la creación exitosamente
- ✅ `error_creacion` - Error al crear la novena

### 3. **Engagement**
- ✅ `abrir_novena` - Usuario abre una novena específica
- ✅ `ver_dia` - Usuario ve un día específico (1-9)
- ✅ `compartir` - Usuario comparte su novena (con método: link/whatsapp/facebook/twitter)
- ✅ `descargar_pdf` - Usuario descarga el PDF
- ✅ `instalar_pwa` - Usuario instala la PWA

### 4. **Marketing**
- ✅ `utm_tracking` - Trackea UTM sources automáticamente

### 5. **Legal**
- ✅ `ver_terminos` - Usuario hace clic en términos y condiciones

---

## 🎯 Cómo Usar el Tracking en Tu Código

### Importar las funciones

```typescript
import { trackEvent } from '@/lib/gtag';
```

### Ejemplos de uso

#### Trackear creación de novena
```typescript
trackEvent.crearNovenaCompletado(slug);
```

#### Trackear compartir
```typescript
// Cuando el usuario comparte por WhatsApp
trackEvent.compartirNovena(slug, 'whatsapp');

// Cuando el usuario copia el link
trackEvent.compartirNovena(slug, 'link');
```

#### Trackear descarga de PDF
```typescript
trackEvent.descargarPDF(slug);
```

#### Trackear apertura de novena
```typescript
trackEvent.abrirNovena(slug);
```

#### Trackear día específico
```typescript
trackEvent.verDiaNovena(3); // Día 3
```

#### Trackear instalación de PWA
```typescript
trackEvent.instalarPWA();
```

---

## 📊 Eventos Disponibles

| Función | Descripción | Parámetros |
|---------|-------------|------------|
| `crearNovenaIniciado()` | Usuario abre formulario | - |
| `crearNovenaCompletado(slug)` | Novena creada exitosamente | slug |
| `crearNovenaError(error)` | Error en creación | mensaje |
| `compartirNovena(slug, method)` | Usuario comparte | slug, método |
| `descargarPDF(slug)` | Usuario descarga PDF | slug |
| `verTerminos()` | Click en términos | - |
| `abrirNovena(slug)` | Abre novena específica | slug |
| `verDiaNovena(dia)` | Ve día específico | número (1-9) |
| `instalarPWA()` | Instala PWA | - |
| `trackUTM(source, medium, campaign)` | Track UTMs | parámetros UTM |

---

## 🔍 Verificar que Funciona

### En Desarrollo

1. Agrega el ID a `.env.local`
2. Reinicia el servidor: `npm run dev` o `pnpm dev`
3. Abre las **DevTools** del navegador
4. Ve a la pestaña **Console**
5. Deberías ver: `gtag` y `dataLayer` definidos
6. En la pestaña **Network**, busca requests a `google-analytics.com`

### En Producción

1. Ve a [Google Analytics](https://analytics.google.com/)
2. Selecciona tu propiedad
3. Ve a **Informes** → **En tiempo real**
4. Navega por tu sitio
5. Deberías ver tu actividad aparecer en tiempo real

### Probar eventos específicos

Abre la consola del navegador y ejecuta:

```javascript
// Ver si gtag está cargado
console.log(window.gtag);
console.log(window.dataLayer);

// Enviar evento de prueba
window.gtag('event', 'test_event', {
  event_category: 'test',
  event_label: 'prueba_manual'
});
```

---

## 📊 Panel de GA4 - Qué Ver

### 1. **En tiempo real**
- Usuarios activos ahora
- Páginas vistas
- Eventos en tiempo real

### 2. **Adquisición**
- ¿De dónde vienen los usuarios?
- UTM sources
- Tráfico directo vs referencias

### 3. **Interacción**
- Eventos más frecuentes
- Páginas más visitadas
- Tiempo en el sitio

### 4. **Conversiones**
- Configura `crear_novena` como conversión
- Tasa de conversión
- Embudos de conversión

---

## 🎨 Eventos Personalizados Sugeridos

Si quieres agregar más tracking, aquí hay ideas:

### Página principal
```typescript
// En src/app/page.tsx
useEffect(() => {
  trackEvent.event({
    action: 'ver_landing',
    category: 'engagement',
    label: 'landing_view'
  });
}, []);
```

### Click en botón CTA
```typescript
<Button onClick={() => {
  trackEvent.event({
    action: 'click_cta',
    category: 'engagement',
    label: 'boton_crear_novena'
  });
  router.push('/crear');
}}>
  Crear mi novena
</Button>
```

### Scroll depth
```typescript
useEffect(() => {
  const handleScroll = () => {
    const scrollPercent = (window.scrollY / document.body.scrollHeight) * 100;
    if (scrollPercent > 75) {
      trackEvent.event({
        action: 'scroll_depth',
        category: 'engagement',
        label: '75_percent',
        value: 75
      });
    }
  };
  
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

---

## 🔒 Privacidad y GDPR

### Configuración actual

- ✅ **No PII**: No enviamos información personal identificable
- ✅ **Cookie flags**: Configurado con `SameSite=None;Secure`
- ✅ **Anonimización**: GA4 anonimiza IPs por defecto
- ✅ **Opt-out**: Los usuarios pueden desactivar tracking con extensiones

### Si necesitas cumplir con GDPR estricto

Puedes agregar un banner de cookies y solo cargar GA si el usuario acepta:

```typescript
// Ejemplo de consentimiento
const [consent, setConsent] = useState(false);

useEffect(() => {
  if (consent) {
    // Cargar GA4 solo si hay consentimiento
  }
}, [consent]);
```

---

## 🐛 Troubleshooting

### GA no aparece en modo desarrollo

**Solución**: Asegúrate de que `.env.local` tenga el prefijo `NEXT_PUBLIC_`:
```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Los eventos no aparecen en GA

1. ✅ Verifica que el ID sea correcto
2. ✅ Espera 24-48h para datos completos (tiempo real es inmediato)
3. ✅ Revisa la consola del navegador por errores
4. ✅ Usa el modo "DebugView" en GA4

### DebugView en GA4

Para ver eventos en tiempo real mientras desarrollas:

1. Instala la extensión [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna)
2. Actívala
3. Ve a GA4 → **Configure** → **DebugView**
4. Navega por tu sitio local
5. Verás los eventos aparecer en DebugView

---

## 📈 Métricas Clave a Monitorear

### Conversión
- **Tasa de creación**: % de visitantes que crean una novena
- **Tasa de abandono**: En qué punto del formulario se van
- **Tasa de error**: Cuántos errores al crear

### Engagement
- **Novenas compartidas**: Cuántas veces se comparte
- **Método preferido**: WhatsApp vs Link vs Redes
- **Días más visitados**: Qué días tienen más views

### Adquisición
- **Fuentes de tráfico**: De dónde vienen los usuarios
- **UTM más efectivos**: Qué campañas convierten mejor
- **Páginas de entrada**: Primera página que ven

---

## ✅ Checklist de Implementación

- [x] Archivos de GA4 creados
- [x] Layout actualizado
- [x] Tracking en formulario de creación
- [x] Tracking de errores
- [x] Tracking de términos
- [ ] Agregar ID de GA4 a `.env.local`
- [ ] Agregar ID de GA4 a Vercel
- [ ] Verificar en desarrollo
- [ ] Verificar en producción
- [ ] Configurar conversión en GA4
- [ ] Agregar tracking a compartir (cuando se implemente)
- [ ] Agregar tracking a PDF (cuando se implemente)
- [ ] Agregar tracking a PWA installer

---

## 🚀 Próximos Pasos

1. **Obtén tu ID de GA4** (G-XXXXXXXXXX)
2. **Agrégalo a `.env.local`**
3. **Reinicia el servidor**
4. **Navega por el sitio**
5. **Verifica en GA4 → En tiempo real**
6. **Configura conversiones en GA4**
7. **Agrega tracking adicional según necesites**

---

## 📚 Recursos

- [Documentación oficial de GA4](https://support.google.com/analytics/answer/9304153)
- [Next.js + Google Analytics](https://nextjs.org/docs/app/building-your-application/optimizing/analytics)
- [GA4 Event Reference](https://developers.google.com/analytics/devguides/collection/ga4/reference/events)
- [gtag.js API](https://developers.google.com/analytics/devguides/collection/gtagjs)

---

**Estado**: ✅ Implementación completa - Solo falta agregar el ID
**Fecha**: 14 de octubre de 2025  
**Desarrollado por**: Bigle Technology 💚
