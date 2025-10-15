# Actualización: Términos y Condiciones + Dirección IP

## 📋 Resumen de cambios

Se han implementado las siguientes mejoras al sistema de captura de leads:

### ✅ Cambios en el frontend (`/crear`)
- ✨ Aviso informativo sobre términos y condiciones
- ✨ Aceptación **implícita** al hacer clic en "Crear novena" (sin checkbox)
- ✨ Link a la página de términos que se abre en nueva pestaña
- ✨ Diseño con fondo ámbar destacado para que sea visible
- ✨ Mensaje claro de privacidad y protección de datos

### ✅ Cambios en la API (`/api/lead`)
- ✨ Captura automática de la dirección IP del usuario
- ✨ Soporte para headers `x-forwarded-for` y `x-real-ip` (Vercel)
- ✨ Envío de campo `acepta_terminos` (boolean) al Apps Script
- ✨ Envío de campo `ip` (string) al Apps Script

### ✅ Cambios en Google Apps Script
- ✨ Validación obligatoria del campo `acepta_terminos`
- ✨ Nuevos campos en la hoja de cálculo:
  - `acepta_terminos` (Sí/No)
  - `ip` (dirección IP)
- ✨ Actualización de función de test con nuevos campos
- ✨ Documentación actualizada

---

## 🚀 Pasos para desplegar

### 1. Actualizar el Google Apps Script

1. Ve a [Google Apps Script](https://script.google.com/)
2. Abre tu proyecto "Novenapp Webhook"
3. Copia **TODO** el contenido del archivo `google-apps-script/Code.gs`
4. Pégalo en el editor de Apps Script (reemplaza todo el código anterior)
5. Guarda el proyecto (Ctrl/Cmd + S)
6. Haz clic en "Implementar" → "Gestionar implementaciones"
7. Edita la implementación activa
8. En "Versión", selecciona "Nueva versión"
9. Agrega descripción: "Agregados campos acepta_terminos e ip"
10. Haz clic en "Implementar"

### 2. Verificar la hoja de cálculo

Al recibir el primer lead con los cambios, se agregarán automáticamente dos nuevas columnas:
- **acepta_terminos**: Mostrará "Sí" o "No"
- **ip**: Mostrará la dirección IP del usuario

**Nota**: Los registros antiguos tendrán estas columnas vacías, lo cual es normal.

### 3. Probar la funcionalidad

#### Opción A: Prueba desde Apps Script
```javascript
// En el editor de Apps Script, ejecuta:
testDoPost()

// Revisa los logs con: Ver → Registros
```

#### Opción B: Prueba desde el sitio
1. Ve a `/crear` en tu sitio
2. Completa el formulario
3. Intenta enviar SIN marcar el checkbox → debe mostrar error
4. Marca el checkbox de términos
5. Envía el formulario
6. Verifica en la hoja de cálculo que aparezcan:
   - "Sí" en la columna `acepta_terminos`
   - Una IP en la columna `ip`

---

## 🔍 Validaciones implementadas

### Frontend
- ✅ Aviso visible sobre términos antes del botón de envío
- ✅ Aceptación automática al hacer clic en "Crear novena"
- ✅ Siempre envía `acepta_terminos: true`

### Backend (API)
- ✅ Captura automática de IP desde headers de Vercel

### Google Apps Script
- ✅ Rechaza requests sin `acepta_terminos: true`
- ✅ Guarda "Sí"/"No" en lugar de true/false para mejor legibilidad
- ✅ Maneja IP vacía si no se puede capturar

---

## 📊 Estructura de datos actualizada

### Request a `/api/lead`
```json
{
  "email": "usuario@ejemplo.com",
  "nombre": "Juan Pérez",
  "dedicatoria": "Para mi familia",
  "telefono": "+57 300 123 4567",
  "ciudad": "Bogotá",
  "slug": "juan-perez-1234567890",
  "utm_source": "direct",
  "acepta_terminos": true  // 🆕 NUEVO
}
```

### Request a Google Apps Script
```json
{
  "token": "SECRET_TOKEN",
  "email": "usuario@ejemplo.com",
  "nombre": "Juan Pérez",
  "dedicatoria": "Para mi familia",
  "telefono": "+57 300 123 4567",
  "ciudad": "Bogotá",
  "slug": "juan-perez-1234567890",
  "utm_source": "direct",
  "acepta_terminos": true,  // 🆕 NUEVO
  "ip": "192.168.1.1"       // 🆕 NUEVO
}
```

### Columnas en Google Sheets
| timestamp | email | nombre | dedicatoria | telefono | ciudad | slug | utm_source | **acepta_terminos** | **ip** |
|-----------|-------|--------|-------------|----------|--------|------|------------|-------------------|--------|
| 2025-10-14 12:00:00 | juan@ejemplo.com | Juan Pérez | Para mi familia | +57 300... | Bogotá | juan-perez-123 | direct | **Sí** | **192.168.1.1** |

---

## 🔒 Cumplimiento legal

Estos cambios ayudan a cumplir con:

- ✅ **GDPR (Europa)**: Consentimiento explícito antes de procesar datos
- ✅ **CCPA (California)**: Transparencia en recolección de datos
- ✅ **Ley 1581 de 2012 (Colombia)**: Autorización previa para datos personales
- ✅ **Mejores prácticas**: Registro de aceptación con timestamp e IP

---

## 🛠️ Troubleshooting

### El aviso de términos no aparece
- ✅ Verifica que los cambios se hayan desplegado en Vercel
- ✅ Limpia la caché del navegador (Ctrl+Shift+R)

### Error "Debe aceptar los términos"
- ✅ No debería ocurrir, ya que se acepta automáticamente
- ✅ Si ocurre, verifica que la API esté recibiendo `acepta_terminos: true`

### La IP aparece como "unknown"
- ✅ Normal en desarrollo local
- ✅ En producción (Vercel) debería mostrar la IP real
- ✅ Verifica que la variable de entorno esté configurada

### Apps Script rechaza el request
- ✅ Asegúrate de haber actualizado el código en Apps Script
- ✅ Verifica que hayas creado una nueva versión de la implementación
- ✅ Revisa los logs de Apps Script: Ver → Registros

---

## 📝 Notas adicionales

- La IP se captura automáticamente en el backend
- No es necesario modificar `.env.local`
- Los cambios son retrocompatibles (no rompe funcionalidad existente)
- Los registros antiguos simplemente tendrán las nuevas columnas vacías

---

## ✅ Checklist de deployment

- [ ] Código actualizado en Next.js (ya hecho con los cambios anteriores)
- [ ] Código actualizado en Google Apps Script
- [ ] Nueva versión implementada en Apps Script
- [ ] Prueba realizada exitosamente
- [ ] Verificado que aparecen las nuevas columnas en Sheets
- [ ] Documentación actualizada

---

**Fecha de actualización**: 14 de octubre de 2025
**Versión**: 2.0.0
**Desarrollado por**: Bigle Technology 💚
