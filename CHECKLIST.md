# 🚀 Checklist Pre-Producción

## ✅ Completado

- [x] Todos los botones tienen cursor pointer
- [x] Todos los botones tienen aria-label
- [x] Links de Bigle cambiados a bigle.com.co
- [x] Responsive verificado (mobile, tablet, desktop)
- [x] PWA manifest.json creado
- [x] Service Worker implementado
- [x] PWAInstaller component agregado
- [x] Meta tags PWA en layout.tsx
- [x] Headers PWA en next.config.ts
- [x] Icono SVG base creado
- [x] Script para generar iconos PNG
- [x] Documentación completa (PWA_GUIDE.md, ICONOS_PWA.md)

---

## ⚠️ Pendientes (Antes de Producción)

### 1. Generar Iconos PNG

```bash
# Opción A: Con script (requiere ImageMagick)
./generate-icons.sh

# Opción B: Manual
# Crear estos 3 archivos en public/:
# - icon-192.png (192x192px)
# - icon-512.png (512x512px)  
# - apple-touch-icon.png (180x180px)
```

### 2. Actualizar Variables de Entorno

Verifica que `.env.local` esté correcto:

```bash
GS_WEBHOOK_URL=https://script.google.com/macros/s/...
GS_SECRET_TOKEN=bm92ZW5hcHA=
```

### 3. Build de Producción

```bash
pnpm build
pnpm start  # Probar localmente

# Verificar que no haya errores
```

### 4. Lighthouse Audit

1. Abrir DevTools (F12)
2. Tab "Lighthouse"
3. Seleccionar todas las categorías
4. "Generate report"

**Objetivos mínimos:**
- Performance: > 90
- Accessibility: > 95
- Best Practices: > 95
- SEO: > 95
- PWA: 100

### 5. Probar PWA en Dispositivos

- [ ] **Android Chrome**: Instalar app, probar offline
- [ ] **iOS Safari**: Añadir a pantalla de inicio
- [ ] **Desktop Chrome**: Instalar como app de escritorio

### 6. Verificar Funcionalidad

- [ ] Formulario `/crear` guarda leads en Google Sheets
- [ ] Email de confirmación funciona
- [ ] Página de gracias muestra link correcto
- [ ] Página de novena `/novenas/[slug]` carga datos
- [ ] Selector de días funciona
- [ ] Botón compartir funciona
- [ ] Links a Bigle van a bigle.com.co

---

## 🚀 Deploy

### Vercel (Recomendado)

```bash
# Primera vez
vercel

# Producción
vercel --prod
```

### Otra Plataforma

```bash
pnpm build
# Subir carpeta .next/ y archivos necesarios
```

---

## 🔍 Post-Deploy

### 1. Verificar URLs

- [ ] `https://tudominio.com` carga correctamente
- [ ] `https://tudominio.com/manifest.json` es accesible
- [ ] `https://tudominio.com/sw.js` es accesible
- [ ] Iconos PNG están disponibles

### 2. Probar Instalación

1. Abrir en móvil
2. Banner "Instalar app" debe aparecer
3. Instalar y abrir
4. Verificar que funciona como app nativa

### 3. Analytics (Opcional)

Si usas Google Analytics:

```typescript
// src/app/layout.tsx
import Script from 'next/script'

<Script
  src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
  strategy="afterInteractive"
/>
```

---

## 📊 Monitoreo

### Métricas a Vigilar

- Instalaciones de PWA
- Uso offline
- Leads capturados
- Tasa de compartidos
- Tiempo en sitio

### Herramientas Recomendadas

- Google Analytics 4
- Vercel Analytics
- Google Search Console

---

## 🐛 Si Algo Falla

### Service Worker no funciona

```bash
# Limpiar cache
DevTools → Application → Storage → Clear site data

# Verificar que NODE_ENV=production
echo $NODE_ENV

# Revisar logs
DevTools → Console
```

### PWA no es instalable

1. Verificar manifest.json accesible
2. Verificar iconos existen
3. Verificar HTTPS activo
4. Hard refresh (Ctrl+Shift+R)

### Datos no cargan

1. Verificar Google Apps Script está desplegado
2. Verificar variables de entorno
3. Ver Network tab en DevTools
4. Revisar logs del servidor

---

## ✨ ¡Listo para Lanzar!

Cuando todos los checkboxes estén marcados:

- [x] Iconos PNG generados
- [x] Build sin errores
- [x] Lighthouse > 90 en todas las categorías
- [x] Probado en dispositivos reales
- [x] Funcionalidad verificada
- [x] Desplegado en producción
- [x] URLs accesibles
- [x] PWA instalable

🎉 **¡A celebrar!**
