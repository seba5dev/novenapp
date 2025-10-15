# 🎄 Resumen de Cambios - Integración Completa con Google Apps Script

## ✅ Cambios Realizados

### 1. **Nuevo Script de Google Apps Script** 📝

**Archivo**: `google-apps-script/Code.gs`

✨ **Características**:
- ✅ Incluye el campo `dedicatoria`
- ✅ Validaciones robustas para todos los campos
- ✅ Prevención de duplicados por email
- ✅ Lock para evitar race conditions
- ✅ Creación automática de encabezados
- ✅ Logs detallados para debugging
- ✅ Función de test incluida

📊 **Campos capturados**:
```
timestamp | email | nombre | dedicatoria | telefono | ciudad | utm_source
```

---

### 2. **API de Next.js Actualizada** 🚀

**Archivo**: `src/app/api/lead/route.ts`

✨ **Cambios**:
- ✅ Ahora envía el campo `dedicatoria`
- ✅ Mejor manejo de errores
- ✅ Logs más detallados
- ✅ Parseo robusto de respuestas

📤 **Payload enviado**:
```json
{
  "token": "bm92ZW5hcHA=",
  "email": "familia@email.com",
  "nombre": "Familia García",
  "dedicatoria": "Con amor...",
  "telefono": "+57 300 123 4567",
  "ciudad": "Bogotá",
  "utm_source": "direct"
}
```

---

### 3. **Documentación Completa** 📚

**Archivos creados**:
- ✅ `google-apps-script/README.md` - Guía de instalación del script
- ✅ `google-apps-script/Code.gs` - Script completo y actualizado
- ✅ `API_DOCS.md` - Documentación actualizada
- ✅ `DEBUGGING_CHECKLIST.md` - Checklist de debugging actualizado
- ✅ `test-api.js` - Script de prueba actualizado

---

## 🚀 Pasos para Implementar

### Paso 1: Actualizar Google Apps Script

1. **Abre tu Google Spreadsheet**
2. **Ve a Extensiones > Apps Script**
3. **Copia el contenido de** `google-apps-script/Code.gs`
4. **Pega y reemplaza** todo el código existente
5. **Guarda** (Ctrl+S)

### Paso 2: Verificar Script Properties

1. En Apps Script, ve a **Configuración** ⚙️
2. Verifica que `SECRET_TOKEN` sea `bm92ZW5hcHA=`
3. Si no existe, créalo

### Paso 3: Re-desplegar (si es necesario)

Si es la primera vez o cambiaste la URL:

1. **Deploy** > **Manage deployments**
2. Click en ✏️ para editar
3. Cambia a "New version"
4. **Deploy**
5. Copia la nueva URL

### Paso 4: Actualizar .env.local

```env
GS_WEBHOOK_URL=https://script.google.com/macros/s/TU_SCRIPT_ID/exec
GS_SECRET_TOKEN=bm92ZW5hcHA=
```

### Paso 5: Reiniciar Next.js

```bash
# Detén el servidor (Ctrl+C)
pnpm dev
```

---

## 🧪 Probar la Integración

### Opción 1: Script de Test

```bash
node test-api.js
```

**Resultado esperado**:
```
✅ ¡Test exitoso!
📥 Response: {
  "ok": true,
  "message": "Lead registrado exitosamente",
  "duplicated": false
}
```

### Opción 2: Con el Formulario

1. Ve a `http://localhost:3000/crear`
2. Llena todos los campos (incluyendo dedicatoria)
3. Envía el formulario
4. Verifica en Google Sheets

### Opción 3: Con curl

```bash
curl -X POST http://localhost:3000/api/lead \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan Prueba García",
    "dedicatoria": "Con amor para toda nuestra familia en esta Navidad",
    "email": "prueba@test.com",
    "telefono": "+57 300 123 4567",
    "ciudad": "Bogotá",
    "utm_source": "manual-test"
  }'
```

---

## 📊 Resultado en Google Sheets

Después de enviar un lead, deberías ver:

| timestamp | email | nombre | dedicatoria | telefono | ciudad | utm_source |
|-----------|-------|--------|-------------|----------|--------|------------|
| 2025-10-14 15:30:00 | prueba@test.com | Juan Prueba García | Con amor para... | +57 300... | Bogotá | manual-test |

---

## 🔍 Verificaciones

### En la Consola de Next.js:

```
Google Apps Script raw response: {"ok":true,"message":"Lead registrado exitosamente","row":2}
Google Apps Script response: { ok: true, message: 'Lead registrado exitosamente', row: 2 }
```

### En Google Sheets:

- ✅ Nueva fila con todos los datos
- ✅ Dedicatoria completa guardada
- ✅ Timestamp generado automáticamente

### En el Navegador:

- ✅ Formulario se envía sin errores
- ✅ Redirección a `/gracias`
- ✅ Mensaje de confirmación

---

## 🎯 Flujo Completo

```
Usuario llena formulario en /crear
         ↓
Datos enviados a /api/lead
         ↓
Validaciones en Next.js ✅
         ↓
POST a Google Apps Script
         ↓
Validaciones en GAS (token, email, campos) ✅
         ↓
Verificación de duplicados ✅
         ↓
Guardado en Google Sheets ✅
         ↓
Respuesta exitosa
         ↓
Redirección a /gracias
         ↓
Usuario ve confirmación 🎉
```

---

## 🆕 Diferencias vs. Versión Anterior

| Característica | Antes | Ahora |
|----------------|-------|-------|
| Campo dedicatoria | ❌ No se guardaba | ✅ Se guarda completo |
| Validaciones | Básicas | ✅ Completas y robustas |
| Manejo de errores | Básico | ✅ Detallado con logs |
| Documentación | Mínima | ✅ Completa y paso a paso |
| Función de test | ❌ No incluida | ✅ Incluida en el script |
| Prevención duplicados | ✅ Básica | ✅ Mejorada (case-insensitive) |
| Lock de seguridad | ✅ Básico | ✅ Con timeout de 5s |

---

## 💡 Ventajas del Nuevo Script

1. **Más campos**: Ahora guarda la dedicatoria completa
2. **Mejor debugging**: Logs detallados en cada paso
3. **Más robusto**: Manejo de errores mejorado
4. **Más seguro**: Validaciones adicionales
5. **Mejor UX**: Mensajes de error más claros
6. **Documentado**: README completo incluido

---

## ⚠️ Notas Importantes

- El script **reemplaza completamente** el anterior
- **No es compatible** con la versión anterior (falta columna dedicatoria)
- Si tienes datos antiguos, crea una nueva hoja o agrega la columna manualmente
- El `SECRET_TOKEN` debe ser exactamente: `bm92ZW5hcHA=`
- La URL debe terminar en `/exec` (no `/dev`)

---

## 🎉 ¡Listo!

Ahora la integración está completa y captura **todos los campos** del formulario, incluyendo la dedicatoria. 

Para cualquier problema, consulta:
- `google-apps-script/README.md` - Guía de instalación
- `DEBUGGING_CHECKLIST.md` - Checklist de debugging
- `API_DOCS.md` - Documentación de la API

---

**Creado con 💚 para Novenapp by Bigle Technology**
