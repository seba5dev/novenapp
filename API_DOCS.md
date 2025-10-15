# 📡 API de Novenapp

## Endpoint: POST /api/lead

### Descripción
Captura los datos del formulario de creación de novena y los envía a Google Apps Script para almacenarlos en una hoja de cálculo.

---

## Request

### URL
```
POST /api/lead
```

### Headers
```
Content-Type: application/json
```

### Body (JSON)
```json
{
  "nombre": "Juan García Pérez",
  "dedicatoria": "Con amor para toda nuestra familia...",
  "email": "ejemplo@email.com",
  "telefono": "+57 300 123 4567",
  "ciudad": "Bogotá",
  "utm_source": "direct"
}
```

### Campos

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `nombre` | string | ✅ | Nombre completo de la persona que crea la novena |
| `dedicatoria` | string | ❌ | Dedicatoria especial para la novena |
| `email` | string | ✅ | Email de contacto (para enviar el link) |
| `telefono` | string | ❌ | Teléfono de contacto |
| `ciudad` | string | ✅ | Ciudad de residencia |
| `utm_source` | string | ❌ | Fuente de tráfico (para analytics) |

---

## Response

### Success (200)
```json
{
  "ok": true,
  "message": "Lead registrado exitosamente",
  "data": {
    "status": "success",
    "row": 5
  }
}
```

### Error (400) - Validación
```json
{
  "ok": false,
  "error": "Email es requerido"
}
```

### Error (500) - Servidor
```json
{
  "ok": false,
  "error": "Error interno del servidor"
}
```

### Error (504) - Timeout
```json
{
  "ok": false,
  "error": "Tiempo de espera agotado"
}
```

---

## Variables de Entorno

### `.env.local`
```env
GS_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
GS_SECRET_TOKEN=bm92ZW5hcHA=
```

### Descripción

- **GS_WEBHOOK_URL**: URL del webhook de Google Apps Script
- **GS_SECRET_TOKEN**: Token secreto (base64) para autenticar las peticiones

---

## Google Apps Script

### Payload enviado a GAS
```json
{
  "token": "bm92ZW5hcHA=",
  "email": "ejemplo@email.com",
  "nombre": "Juan García Pérez",
  "dedicatoria": "Con amor para toda nuestra familia...",
  "telefono": "+57 300 123 4567",
  "ciudad": "Bogotá",
  "utm_source": "direct"
}
```

**Nota**: El campo `timestamp` NO se envía, el Google Apps Script lo genera automáticamente.

### Respuesta esperada de GAS
```json
{
  "status": "success",
  "row": 5,
  "message": "Data saved successfully"
}
```

---

## Ejemplo de uso (JavaScript)

```javascript
const response = await fetch('/api/lead', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    nombre: 'Juan García Pérez',
    dedicatoria: 'Con amor para todos',
    email: 'ejemplo@email.com',
    telefono: '+57 300 123 4567',
    ciudad: 'Bogotá',
    utm_source: 'facebook',
  }),
});

const data = await response.json();

if (data.ok) {
  console.log('Lead registrado exitosamente');
} else {
  console.error('Error:', data.error);
}
```

---

## Ejemplo de uso (curl)

```bash
curl -X POST http://localhost:3000/api/lead \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan García Pérez",
    "dedicatoria": "Con amor para todos",
    "email": "ejemplo@email.com",
    "telefono": "+57 300 123 4567",
    "ciudad": "Bogotá",
    "utm_source": "direct"
  }'
```

---

## Seguridad

- ✅ Validación de campos requeridos
- ✅ Token secreto para autenticar con Google Apps Script
- ✅ Timeout de 10 segundos para evitar requests colgados
- ✅ Manejo de errores robusto
- ✅ Variables de entorno protegidas (no se suben a Git)
- ✅ CORS configurado por Next.js automáticamente

---

## Troubleshooting

### Error: "Variables de entorno no configuradas"
**Solución**: Verifica que `.env.local` existe y contiene `GS_WEBHOOK_URL` y `GS_SECRET_TOKEN`.

### Error: "Tiempo de espera agotado"
**Solución**: 
- Verifica que la URL de Google Apps Script sea correcta
- Asegúrate de que el script esté publicado como "Web app"
- Verifica que los permisos del script permitan acceso anónimo

### Error: "Email es requerido"
**Solución**: Asegúrate de enviar todos los campos requeridos en el body.

---

## Estado del Proyecto

- ✅ API implementada
- ✅ Validaciones añadidas
- ✅ Manejo de errores completo
- ✅ Timeout configurado
- ✅ Variables de entorno configuradas
- ✅ Integración con formulario `/crear`
- ✅ Página de agradecimiento `/gracias`

---

## Próximos pasos

- [ ] Implementar rate limiting
- [ ] Añadir captcha (reCAPTCHA v3)
- [ ] Crear logs estructurados
- [ ] Implementar retry logic
- [ ] Añadir métricas y monitoring
