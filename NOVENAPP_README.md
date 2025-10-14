# 🎄 Novenapp — Tu Novena Digital 2025

[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)](https://tailwindcss.com/)

Webapp navideña para crear, personalizar y compartir novenas de aguinaldos digitales. Desarrollada por **Bigle Technology** 💚

---

## ✨ Características

- 🎨 **Diseño emocional navideño** con animación de nieve
- ⏰ **Contador regresivo** al 1 de diciembre
- 📱 **Responsive** y **mobile-first**
- 🎯 **PWA compatible** (próximamente)
- 🚀 **Optimizado para performance** (Lighthouse > 90)
- 💾 **Integración con Supabase** (próximamente)
- 📧 **Envío de emails** con Resend (próximamente)

---

## 🚀 Stack Tecnológico

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS 4**
- **Shadcn UI** + Radix UI
- **Lucide Icons**
- **Supabase** (base de datos + storage)
- **Resend** (envío de correos)

---

## 📦 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/seba5dev/novenapp.git

# Entrar al directorio
cd novenapp

# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm dev
```

El sitio estará disponible en [http://localhost:3000](http://localhost:3000)

---

## 📂 Estructura del Proyecto

```
novenapp/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Landing principal
│   │   ├── crear/
│   │   │   └── page.tsx          # Formulario de creación
│   │   ├── novenas/
│   │   │   └── [id]/
│   │   │       └── page.tsx      # Página de novena personalizada
│   │   ├── layout.tsx            # Layout global con metadata
│   │   └── globals.css           # Estilos globales
│   ├── components/
│   │   ├── Countdown.tsx         # Contador regresivo
│   │   ├── Snowfall.tsx          # Animación de nieve
│   │   └── ui/                   # Componentes Shadcn UI
│   └── lib/
│       └── utils.ts              # Utilidades
├── public/                       # Archivos estáticos
└── package.json
```

---

## 🎯 Roadmap

### ✅ Fase 1: Landing y UI (Completado)
- [x] Hero section emocional
- [x] Contador regresivo al 1 de diciembre
- [x] Animación de nieve
- [x] Sección de características
- [x] Formulario de creación
- [x] Responsive design

### 🚧 Fase 2: Backend y Funcionalidad (En progreso)
- [ ] Integración con Supabase
- [ ] Sistema de autenticación
- [ ] Guardar novenas en base de datos
- [ ] Generación de slugs únicos
- [ ] API para crear/leer novenas

### 📋 Fase 3: Compartir y Notificaciones
- [ ] Integración con Resend
- [ ] Envío de emails con link personalizado
- [ ] Generación de Open Graph dinámico
- [ ] Compartir en redes sociales
- [ ] Generación de PDF

### 🎨 Fase 4: PWA y Optimización
- [ ] Configurar manifest.json
- [ ] Service Worker
- [ ] Instalación como app
- [ ] Modo offline
- [ ] Optimización de imágenes

---

## 🗄️ Base de Datos (Supabase)

### Tabla `novenas`

```sql
CREATE TABLE novenas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre_familia TEXT NOT NULL,
  dedicatoria TEXT NOT NULL,
  email TEXT NOT NULL,
  telefono TEXT,
  ciudad TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Índice para búsqueda rápida por slug
CREATE INDEX idx_novenas_slug ON novenas(slug);

-- Trigger para actualizar updated_at
CREATE TRIGGER update_novenas_updated_at
  BEFORE UPDATE ON novenas
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

---

## 🎨 Paleta de Colores

```css
/* Colores principales */
--warm-bg: #f7f3ef;      /* Fondo cálido */
--white: #fdfbf7;        /* Blanco suave */
--green-primary: #16a34a; /* Verde navideño */
--green-accent: #10b981;  /* Verde esmeralda */
--gold: #fbbf24;          /* Dorado */
--text-dark: #1f2937;     /* Texto principal */
--text-muted: #6b7280;    /* Texto secundario */
```

---

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Haz un fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: nueva característica'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📝 Licencia

Este proyecto es privado y pertenece a **Bigle Technology**.

---

## 💚 Creado por

**Bigle Technology**  
[https://bigle.co](https://bigle.co)

Con amor para todas las familias que celebran la Navidad 🎄

---

## 📧 Contacto

¿Preguntas o sugerencias? Contáctanos en: contacto@bigle.co
