# 🎄 Novenapp - Tu Novena Digital

[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org)
[![PWA](https://img.shields.io/badge/PWA-Ready-green)](https://web.dev/progressive-web-apps)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> Une a tu familia desde cualquier lugar. Crea, personaliza y comparte tu novena de aguinaldos digital del 16 al 24 de diciembre.

**Desarrollado por [Bigle Technology](https://bigle.com.co) 💚**

---

## ✨ Características

- 🎨 **Personalizable** - Crea tu novena con nombre y dedicatoria única
- 📱 **PWA** - Instalable como app nativa en cualquier dispositivo
- 🌐 **Offline First** - Funciona sin conexión a internet
- 📤 **Compartible** - Comparte por WhatsApp, email o redes sociales
- 🎯 **9 Días** - Contenido completo del 16 al 24 de diciembre
- 🙏 **Oraciones y Villancicos** - Contenido tradicional y emocional
- ♿ **Accesible** - WCAG AA compliant
- 📊 **Lead Capture** - Integración con Google Sheets

---

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 18+ 
- pnpm (recomendado) o npm
- Google Apps Script configurado (ver [GOOGLE_APPS_SCRIPT_SETUP.md](GOOGLE_APPS_SCRIPT_SETUP.md))

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/novenapp.git
cd novenapp

# Instalar dependencias
pnpm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus valores

# Generar iconos PWA
./generate-icons.sh

# Iniciar servidor de desarrollo
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 📁 Estructura del Proyecto

```
novenapp/
├── src/
│   ├── app/                    # App Router de Next.js
│   │   ├── page.tsx           # Landing page
│   │   ├── crear/             # Formulario de creación
│   │   ├── gracias/           # Página de confirmación
│   │   ├── novenas/[slug]/    # Novena personalizada
│   │   └── api/               # API routes
│   ├── components/            # Componentes React
│   │   ├── ui/               # Componentes de Shadcn UI
│   │   ├── Countdown.tsx     # Contador regresivo
│   │   ├── Snowfall.tsx      # Efecto de nieve
│   │   └── PWAInstaller.tsx  # Registro de Service Worker
│   └── lib/                  # Utilidades
├── public/                    # Assets estáticos
│   ├── manifest.json         # PWA manifest
│   ├── sw.js                 # Service Worker
│   └── icon-*.png           # Iconos PWA
├── google-apps-script/       # Scripts de Google
└── docs/                     # Documentación adicional
```

---

## 🛠️ Stack Tecnológico

- **Framework**: [Next.js 15](https://nextjs.org) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com) + [Radix UI](https://www.radix-ui.com)
- **Font**: [Raleway](https://fonts.google.com/specimen/Raleway)
- **Icons**: [Lucide React](https://lucide.dev)
- **Backend**: Google Apps Script + Google Sheets
- **Deployment**: [Vercel](https://vercel.com)

---

## 🔧 Configuración

### Variables de Entorno

Crea un archivo `.env.local` en la raíz:

```env
# Google Apps Script Webhook
GS_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
GS_SECRET_TOKEN=bm92ZW5hcHA=

# Opcional: Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Google Apps Script

Ver guía completa: [GOOGLE_APPS_SCRIPT_SETUP.md](GOOGLE_APPS_SCRIPT_SETUP.md)

1. Crear Google Spreadsheet
2. Copiar código de `google-apps-script/Code.gs`
3. Configurar SECRET_TOKEN
4. Desplegar como Web App

---

## 📱 PWA (Progressive Web App)

Novenapp es una PWA completa:

- ✅ Instalable en iOS, Android y Desktop
- ✅ Funciona offline con Service Worker
- ✅ Cacheo inteligente de recursos
- ✅ Iconos adaptativos

### Generar Iconos

```bash
# Con ImageMagick (recomendado)
./generate-icons.sh

# O manualmente crear:
# - icon-192.png (192x192px)
# - icon-512.png (512x512px)
# - apple-touch-icon.png (180x180px)
```

Ver guía completa: [PWA_GUIDE.md](PWA_GUIDE.md)

---

## 🚀 Despliegue

### Vercel (Recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Otro Hosting

```bash
# Build de producción
pnpm build

# La carpeta .next/ contiene los archivos estáticos
pnpm start
```

---

## 📖 Documentación

- [📱 PWA_GUIDE.md](PWA_GUIDE.md) - Guía completa de PWA
- [🎨 ICONOS_PWA.md](ICONOS_PWA.md) - Cómo crear iconos
- [📊 API_DOCS.md](API_DOCS.md) - Documentación de la API
- [🔧 DEBUGGING_CHECKLIST.md](DEBUGGING_CHECKLIST.md) - Troubleshooting
- [✅ CHECKLIST.md](CHECKLIST.md) - Checklist pre-producción
- [📝 RESUMEN_MEJORAS.md](RESUMEN_MEJORAS.md) - Changelog

---

## 🧪 Testing

```bash
# Lint
pnpm lint

# Type check
pnpm type-check

# Build check
pnpm build
```

### Lighthouse Audit

1. Build de producción: `pnpm build && pnpm start`
2. Abrir DevTools → Lighthouse
3. Ejecutar audit completo

**Objetivos:**
- Performance: > 90
- Accessibility: > 95
- PWA: 100

---

## 🤝 Contribuir

Las contribuciones son bienvenidas! 

1. Fork el proyecto
2. Crea tu branch (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver [LICENSE](LICENSE) para más detalles.

---

## 💚 Créditos

**Desarrollado con amor por:**

[Bigle Technology](https://bigle.com.co) - Soluciones digitales que conectan personas

---

## 📞 Soporte

¿Tienes preguntas o sugerencias?

- 📧 Email: contacto@bigle.com.co
- 🌐 Web: [bigle.com.co](https://bigle.com.co)
- 📱 WhatsApp: +57 XXX XXX XXXX

---

## 🙏 Agradecimientos

- Familia colombiana por inspirar este proyecto
- Comunidad de Next.js
- Todos los que celebran la novena de aguinaldos

---

🎄 **¡Feliz Navidad y que la novena digital una a tu familia!** ⭐

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
