# Development Guidelines

## Tech Stack Expertise
- **Languages & Frameworks:** TypeScript, Node.js, Next.js (**App Router only**), React.
- **UI & Styling:** Shadcn UI, Radix UI, Tailwind CSS.
- Always use the **latest stable versions** of frameworks and libraries.
- Never use or suggest the **Pages Router**.

---

## Approach
1. Start with **step-by-step pseudocode** describing the solution in detail.  
2. Confirm the plan before writing code.  
3. Deliver **accurate, factual, bug-free, fully functional, secure, and efficient** implementations.  
4. Always provide **complete solutions** (no TODOs, no placeholders).  
5. Maintain **clean, modern, and consistent code** across the project.

---

## Principles
- Prioritize **readability over raw performance**.  
- Write only the **necessary code** to achieve the requested functionality.  
- Update or create **tests** whenever functionality changes.  
- If uncertain, **state it clearly** instead of guessing.

---

## Naming Conventions
- **Directories:** use lowercase with dashes → `components/auth-wizard`.  
- **Exports:** prefer **named exports** for components.  

---

## TypeScript
- Use **TypeScript everywhere**.  
- Prefer **interfaces over types**.  
- Avoid enums → use maps or objects instead.  
- Always implement **functional components with interfaces**.  

---

## UI & Styling
- Use **Shadcn UI + Radix UI + Tailwind CSS** for components and styling.  
- Follow **mobile-first responsive design**.  

---

## Performance
- Minimize `use client`, `useEffect`, and `setState`. Favor **React Server Components (RSC)**.  
- Wrap client components in **`<Suspense>` with fallbacks**.  
- Use **dynamic imports** for non-critical components.  
- Optimize images:  
  - Always use **WebP** format.  
  - Include **width/height attributes**.  
  - Enable **lazy loading**.  

# Novenapp — Proyecto Navideño (Next.js + Supabase + PWA)

💡 Contexto general:
Este proyecto es una webapp navideña llamada **Novenapp**, desarrollada por Bigle Technology. 
Su objetivo es permitir que los usuarios creen, personalicen y compartan su propia "novena de navidad" digital. 
Cada usuario podrá generar una novena con su nombre o dedicatoria, verla cada día (16–24 dic) y compartir un link o PDF. 
El sitio también funcionará como embudo de leads (nombre, correo, ciudad) que se guardan en Supabase. 
Debe ser rápida, emocional y funcionar como una PWA instalable. 

---

## 🚀 Stack
- **Next.js 15 (App Router)**
- **TypeScript**
- **TailwindCSS + Shadcn UI**
- **Supabase** (auth + storage + leads)
- **Resend** (para correos de confirmación)
- **PWA compatible (manifest.json + service worker)**
- Despliegue en **Vercel**

---

## 📦 Estructura del sitio
1. `/` → Landing principal
   - Hero emocional con nieve animada
   - Contador regresivo al 16 de diciembre
   - Botón “Crea tu novena”
   - Footer: “Hecho con cariño por Bigle Technology 💚”

2. `/crear` → Formulario para personalizar la novena
   - Campos: nombre de familia, dedicatoria, ciudad, email o teléfono
   - Botón “Generar mi novena”
   - Al enviarlo: guardar en Supabase y redirigir a `/novenas/[id]`

3. `/novenas/[id]` → Página de novena personalizada
   - Mostrar contenido del día según fecha (del 16 al 24)
   - Texto de la oración, villancico y contador al siguiente día
   - Botones: “Compartir” y “Descargar PDF”
   - Guardar datos localmente si el usuario vuelve

4. `/gracias` → Pantalla final
   - Mensaje de agradecimiento
   - Invitación suave a conocer Bigle Technology

---

## 🧠 Funcionalidades clave
- ✅ Guardar y recuperar datos de novenas desde Supabase
- ✅ Enviar correo con el link personalizado usando Resend
- ✅ Generar OG dinámico (`/api/og`) con el nombre de la familia
- ✅ Implementar `manifest.json` y `service-worker.js` para PWA
- ✅ Responsive, accesible y con rendimiento excelente (Lighthouse > 90)

---

## 🗄️ Base de datos (Supabase)
Tabla `novenas`:
```sql
id uuid primary key default uuid_generate_v4(),
nombre text,
dedicatoria text,
email text,
telefono text,
ciudad text,
slug text unique,
fecha_creacion timestamp default now()
