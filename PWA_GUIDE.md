# 📱 PWA (Progressive Web App) - Guía Completa

## ✅ ¿Qué se implementó?

Novenapp ahora es una **Progressive Web App** completa con todas las características modernas:

### 🎯 Características Implementadas

1. **✅ Instalable**
   - Los usuarios pueden instalar la app en su dispositivo
   - Funciona en Android, iOS, Windows, macOS

2. **✅ Funciona Offline**
   - Service Worker implementado con estrategia Network-First
   - Cacheo inteligente de recursos estáticos
   - Funcionalidad básica disponible sin internet

3. **✅ Iconos Adaptativos**
   - Icono SVG base incluido
   - Configuración para Android (maskable icons)
   - Icono específico para iOS (apple-touch-icon)

4. **✅ Manifest Completo**
   - Nombre, descripción, colores temáticos
   - Shortcuts para acceso rápido
   - Categorías y screenshots

5. **✅ Optimización SEO**
   - Meta tags para redes sociales
   - Open Graph completo
   - Twitter Cards

---

## 📁 Archivos Creados

```
public/
├── manifest.json          # Configuración PWA
├── sw.js                  # Service Worker
├── icon.svg               # Icono base SVG
├── icon-192.png          # (generar con script)
├── icon-512.png          # (generar con script)
└── apple-touch-icon.png  # (generar con script)

src/
├── components/
│   └── PWAInstaller.tsx  # Registra el Service Worker
└── app/
    ├── layout.tsx        # Meta tags PWA agregados
    └── ...

generate-icons.sh         # Script para generar iconos PNG
```

---

## 🚀 Cómo Usar

### 1. Generar los Iconos

#### Opción A: Con el script (requiere ImageMagick)

```bash
# Instalar ImageMagick si no lo tienes
# Ubuntu/Debian:
sudo apt install imagemagick

# macOS:
brew install imagemagick

# Luego ejecutar:
./generate-icons.sh
```

#### Opción B: Manualmente

1. Abre `public/icon.svg` en un editor de imágenes
2. Exporta en los siguientes tamaños:
   - 192x192px → `icon-192.png`
   - 512x512px → `icon-512.png`
   - 180x180px → `apple-touch-icon.png`
3. Guarda en la carpeta `public/`

#### Opción C: Online

1. Sube `public/icon.svg` a [CloudConvert](https://cloudconvert.com/svg-to-png)
2. Descarga y renombra según los tamaños necesarios

Ver **ICONOS_PWA.md** para más detalles.

---

### 2. Desplegar la App

```bash
# Build de producción
pnpm build

# El Service Worker solo funciona en producción
pnpm start

# O desplegar en Vercel
vercel --prod
```

⚠️ **Importante**: El Service Worker solo se registra en modo producción (`NODE_ENV=production`)

---

### 3. Probar la PWA

#### En Chrome (Desktop)

1. Abre DevTools (F12)
2. Ve a **Application** tab
3. Sección **Manifest**: Verifica que todo esté correcto
4. Sección **Service Workers**: Debe aparecer como "activated"
5. Verifica los **iconos** en la sección Manifest

#### En Chrome (Android)

1. Abre el sitio en Chrome
2. Menú (⋮) → **Instalar aplicación**
3. La app se instalará en el home screen
4. Abre la app instalada (debe abrir sin barra de navegador)

#### En Safari (iOS)

1. Abre el sitio en Safari
2. Toca el botón **Compartir** (cuadrado con flecha)
3. Selecciona **Añadir a pantalla de inicio**
4. La app aparecerá como un icono en tu home screen

---

## 🔧 Personalización

### Cambiar Colores

Edita `public/manifest.json`:

```json
{
  "background_color": "#f7f3ef",  // Color de fondo al abrir
  "theme_color": "#16a34a"        // Color de la barra superior
}
```

Y en `src/app/layout.tsx`:

```typescript
themeColor: "#16a34a"  // Debe coincidir con manifest.json
```

### Cambiar Nombre

En `public/manifest.json`:

```json
{
  "name": "Novenapp - Tu Novena Digital",
  "short_name": "Novenapp"
}
```

### Agregar Shortcuts

En `public/manifest.json`, sección `shortcuts`:

```json
{
  "name": "Nueva Funcionalidad",
  "url": "/nueva-ruta",
  "icons": [...]
}
```

---

## 📊 Verificar con Lighthouse

1. Abre DevTools en Chrome
2. Ve al tab **Lighthouse**
3. Selecciona **Progressive Web App**
4. Click en **Generate report**

**Objetivo**: Obtener un score de 100/100 ✅

### Checklist de Lighthouse

- [x] Registra un service worker
- [x] Responde con 200 cuando offline
- [x] Manifest con nombre y iconos
- [x] Splash screen configurado
- [x] Tema de color establecido
- [x] Viewport configurado
- [x] HTTPS (en producción)

---

## 🐛 Troubleshooting

### El Service Worker no se registra

**Problema**: Consola dice "Service Worker not supported"

**Solución**:
1. Verifica que estés en HTTPS (o localhost)
2. Verifica que `NODE_ENV=production`
3. Hard refresh: Ctrl+Shift+R (Windows) o Cmd+Shift+R (Mac)

---

### Los iconos no aparecen

**Problema**: La app instalada no muestra el icono correcto

**Solución**:
1. Verifica que los archivos PNG existan en `public/`
2. Ejecuta `./generate-icons.sh` o crea los iconos manualmente
3. Borra la app instalada y vuelve a instalar
4. Borra caché del navegador

---

### La app no es instalable

**Problema**: No aparece el botón "Instalar app"

**Solución**:
1. Verifica que manifest.json esté accesible: `https://tu-dominio.com/manifest.json`
2. Verifica que los iconos existan
3. Debe estar en HTTPS (excepto localhost)
4. El service worker debe estar registrado correctamente

---

### Cambios no se reflejan

**Problema**: Modificaste algo pero no se ve en la app instalada

**Solución**:
1. El service worker cachea contenido para offline
2. Opciones:
   - Espera 1 hora (se actualiza automáticamente)
   - DevTools → Application → Service Workers → **Unregister**
   - DevTools → Application → Storage → **Clear site data**
   - Incrementa la versión en `sw.js`: `const CACHE_NAME = 'novenapp-v2';`

---

## 📈 Métricas y Analytics

### Instalar Google Analytics

```typescript
// src/app/layout.tsx
<Script
  src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
  strategy="afterInteractive"
/>
```

### Eventos PWA a trackear

- **appinstalled**: Cuando se instala la PWA
- **beforeinstallprompt**: Cuando se muestra el prompt
- Service Worker activado
- Uso offline

---

## 🔐 Seguridad

### Headers Recomendados

Ya configurados en `next.config.ts`:

```typescript
{
  key: "Service-Worker-Allowed",
  value: "/"
}
```

### HTTPS Obligatorio

⚠️ Las PWAs **requieren HTTPS** en producción (excepto localhost para desarrollo)

Vercel y otros providers modernos incluyen HTTPS automáticamente.

---

## 📱 Soporte de Plataformas

| Plataforma | Instalable | Offline | Notificaciones |
|------------|-----------|---------|----------------|
| Chrome Android | ✅ | ✅ | ✅ |
| Chrome Desktop | ✅ | ✅ | ✅ |
| Safari iOS | ✅ | ✅ | ❌ |
| Safari macOS | ✅ | ✅ | ❌ |
| Edge | ✅ | ✅ | ✅ |
| Firefox | ✅ | ✅ | ✅ |

---

## 🎁 Próximos Pasos

### Funcionalidades Avanzadas (Opcional)

1. **Push Notifications**
   - Ya incluidas en el service worker
   - Requiere configurar servidor de push

2. **Background Sync**
   - Sincronizar leads cuando vuelve la conexión
   - Ya implementado básicamente en `sw.js`

3. **Share Target API**
   - Permitir compartir contenido hacia la app
   - Requiere configuración adicional en manifest

4. **Install Banner Personalizado**
   - Componente React para mostrar botón de instalación
   - Usar el evento `beforeinstallprompt`

---

## ✅ Checklist Final

Antes de lanzar en producción:

- [ ] Iconos PNG generados (192, 512, 180)
- [ ] Manifest.json configurado con info correcta
- [ ] Service Worker funcionando
- [ ] Lighthouse PWA score > 90
- [ ] Probado en Android
- [ ] Probado en iOS
- [ ] HTTPS activado
- [ ] Meta tags Open Graph correctos

---

## 📚 Referencias

- [PWA Documentation - MDN](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest)
- [Workbox (alternativa a SW manual)](https://developers.google.com/web/tools/workbox)

---

🎉 **¡Felicidades! Novenapp ahora es una PWA completa y profesional.**
