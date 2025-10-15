# 🚀 Setup Rápido: Google Analytics 4

## ✅ Ya Implementado

- ✅ Scripts de GA4 en el layout
- ✅ Tracking automático de pageviews
- ✅ Tracking de UTM parameters
- ✅ Tracking de eventos en formulario de creación
- ✅ Tracking de errores
- ✅ Tracking de términos y condiciones
- ✅ Funciones helper para tracking personalizado

---

## 🔑 Lo Único que Necesitas Hacer

### 1. Obtener el ID de GA4 (2 minutos)

1. Ve a: https://analytics.google.com/
2. Crea una cuenta (si no tienes)
3. Crea una propiedad **GA4**
4. Ve a **Admin** → **Flujos de datos**
5. Copia el **ID de medición** (ejemplo: `G-ABC123XYZ`)

### 2. Agregar a tu archivo `.env.local`

Edita `/home/seba5dev/Development/novenapp/.env.local` y agrega:

```bash
# Google Analytics 4
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-ABC123XYZ
```

⚠️ **Reemplaza `G-ABC123XYZ` con tu ID real**

### 3. Reiniciar el servidor

```bash
# Detener el servidor (Ctrl+C)
# Volver a iniciar
pnpm dev
```

### 4. Probar que funciona

1. Abre tu sitio en el navegador
2. Abre DevTools (F12) → Console
3. Escribe: `console.log(window.gtag)`
4. Debería mostrar: `function gtag(){...}`
5. Ve a GA4 → **Informes** → **En tiempo real**
6. Navega por tu sitio y verás tu actividad

---

## 🌐 Para Producción (Vercel)

1. Ve a tu proyecto en Vercel
2. **Settings** → **Environment Variables**
3. Agrega:
   - **Key**: `NEXT_PUBLIC_GA_MEASUREMENT_ID`
   - **Value**: `G-ABC123XYZ` (tu ID real)
   - **Environments**: Production, Preview, Development
4. Haz **Redeploy**

---

## 📊 Eventos que ya están trackeados

| Evento | Cuándo se dispara |
|--------|------------------|
| **Pageview** | Cada cambio de página (automático) |
| **iniciar_creacion** | Usuario abre `/crear` |
| **crear_novena** | Usuario completa la creación exitosamente |
| **error_creacion** | Error al crear novena |
| **ver_terminos** | Click en "términos y condiciones" |
| **utm_tracking** | Detecta UTM params automáticamente |

---

## 📈 Próximos eventos a agregar (cuando implementes las funciones)

Para agregar tracking a otras acciones, usa estas funciones:

```typescript
import { trackEvent } from '@/lib/gtag';

// Compartir novena
trackEvent.compartirNovena(slug, 'whatsapp');

// Descargar PDF
trackEvent.descargarPDF(slug);

// Abrir novena específica
trackEvent.abrirNovena(slug);

// Ver día específico
trackEvent.verDiaNovena(3);

// Instalar PWA
trackEvent.instalarPWA();
```

---

## 🎯 ¿Funciona?

### En 24 horas verás en GA4:

- 📊 Número de visitantes
- 📄 Páginas más vistas
- 🌍 De dónde vienen (países, ciudades)
- 📱 Dispositivos (móvil, desktop)
- ⏱️ Tiempo en el sitio
- 🎯 Conversiones (novenas creadas)

---

## ✅ Checklist

- [ ] Obtener ID de GA4
- [ ] Agregar a `.env.local`
- [ ] Reiniciar servidor
- [ ] Probar en desarrollo
- [ ] Agregar a Vercel
- [ ] Verificar en producción

---

**Tiempo estimado**: 5 minutos ⏱️  
**Documentación completa**: Ver `GOOGLE_ANALYTICS_SETUP.md`
