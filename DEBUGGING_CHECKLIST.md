# 🐛 Checklist de Debugging - Integración Google Apps Script

## ✅ Antes de probar

### 1. Variables de Entorno
- [ ] `.env.local` existe en la raíz del proyecto
- [ ] `GS_WEBHOOK_URL` está configurado y termina en `/exec`
- [ ] `GS_SECRET_TOKEN` es exactamente `bm92ZW5hcHA=`
- [ ] Reinicié el servidor después de modificar `.env.local`

### 2. Google Apps Script
- [ ] El script está guardado (Ctrl+S)
- [ ] Está desplegado como Web App
- [ ] "Who has access" está en "Anyone"
- [ ] "Execute as" está en "Me"
- [ ] Script Properties tiene `SECRET_TOKEN=bm92ZW5hcHA=`
- [ ] Copié la URL correcta (la del deployment, no la del editor)

### 3. Google Sheets
- [ ] El spreadsheet está abierto
- [ ] Tengo permisos de edición
- [ ] La hoja "Leads" existe o el script puede crearla

---

## 🧪 Tests de Diagnóstico

### Test 1: Verificar Variables de Entorno

```bash
# En la terminal de Next.js, ejecuta:
pnpm dev
```

Deberías ver el servidor corriendo. Si hay error de variables, las verías aquí.

### Test 2: Probar la API directamente

```bash
curl -X POST http://localhost:3000/api/lead \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan Test Debug",
    "email": "debug@test.com",
    "ciudad": "Bogotá",
    "telefono": "+57 300 111 2222",
    "utm_source": "debug"
  }'
```

**Respuestas esperadas:**

✅ **Éxito:**
```json
{
  "ok": true,
  "message": "Lead registrado exitosamente",
  "duplicated": false
}
```

❌ **Token inválido:**
```json
{
  "ok": false,
  "error": "Token inválido"
}
```

❌ **Email duplicado:**
```json
{
  "ok": true,
  "duplicated": true
}
```

### Test 3: Revisar Logs del Servidor

Busca en la consola de Next.js:

```
Google Apps Script raw response: {"ok":true}
Google Apps Script response: { ok: true }
```

Si ves un HTML o error, el script no está desplegado correctamente.

### Test 4: Revisar Google Apps Script Executions

1. En Google Apps Script, ve a **Executions** (icono de reloj ⏱️)
2. Busca la última ejecución
3. Si falló, haz clic para ver el error exacto

---

## 🔍 Errores Comunes y Soluciones

### Error: "Token inválido"

**Síntomas:**
```json
{ "ok": false, "error": "Token inválido" }
```

**Causa:** El token no coincide entre Next.js y Google Apps Script.

**Solución:**
```bash
# 1. Verifica el token en .env.local
cat .env.local | grep SECRET_TOKEN

# 2. En Google Apps Script > Settings > Script Properties
#    SECRET_TOKEN debe ser: bm92ZW5hcHA=

# 3. Reinicia el servidor
pnpm dev
```

---

### Error: "Respuesta inválida del servidor de Google"

**Síntomas:**
```json
{
  "ok": false,
  "error": "Respuesta inválida del servidor de Google",
  "details": "<html>...</html>"
}
```

**Causa:** La URL apunta al editor, no al deployment.

**Solución:**
1. Ve a Google Apps Script
2. Click en **Deploy** > **Manage deployments**
3. Copia la URL del **Web app** (debe terminar en `/exec`)
4. Actualiza `GS_WEBHOOK_URL` en `.env.local`
5. Reinicia el servidor

---

### Error: "No existe encabezado: email"

**Síntomas:**
En Google Apps Script Executions ves:
```
Error: No existe encabezado: email
```

**Causa:** La hoja tiene datos pero sin encabezados correctos.

**Solución:**
1. Abre la hoja "Leads" en Google Sheets
2. Borra TODO el contenido
3. El script recreará los encabezados automáticamente

---

### Error: "Authorization required"

**Síntomas:**
```html
<html>
  <body>
    Authorization required
  </body>
</html>
```

**Causa:** El script no tiene permisos o no está desplegado como "Anyone".

**Solución:**
1. Ve a **Deploy** > **Manage deployments**
2. Click en el lápiz (✏️) para editar
3. Cambia "Who has access" a **Anyone**
4. Click en **Update**
5. Autoriza los permisos si te lo pide

---

### Error: Timeout (504)

**Síntomas:**
```json
{ "ok": false, "error": "Tiempo de espera agotado" }
```

**Causa:** La petición a Google Apps Script está tardando más de 10 segundos.

**Posibles causas:**
- La hoja de cálculo tiene demasiados datos
- Lock está bloqueado por otra ejecución
- Problema de red

**Solución:**
1. Reduce el contenido de la hoja (guarda backup)
2. Espera unos segundos y vuelve a intentar
3. Verifica tu conexión a internet

---

### Error: "Email requerido o inválido"

**Síntomas:**
```json
{ "ok": false, "error": "Email requerido o inválido" }
```

**Causa:** El email está vacío o tiene formato incorrecto.

**Solución:**
Verifica que el payload incluya un email válido:
```json
{
  "email": "test@example.com",  // ✅ Válido
  "email": "test",               // ❌ Inválido
  "email": "",                   // ❌ Vacío
}
```

---

## 📊 Payload que envía Next.js

```json
{
  "token": "bm92ZW5hcHA=",
  "email": "usuario@email.com",
  "nombre": "Juan García Pérez",
  "dedicatoria": "Con amor para toda nuestra familia...",
  "telefono": "+57 300 123 4567",
  "ciudad": "Bogotá",
  "utm_source": "direct"
}
```

**Nota:** Todos los campos se envían, incluyendo `dedicatoria`.

---

## 🎯 Flujo Completo de Debugging

1. **Verificar .env.local**
   ```bash
   cat .env.local
   ```

2. **Reiniciar servidor**
   ```bash
   pnpm dev
   ```

3. **Probar con curl**
```bash
curl -X POST http://localhost:3000/api/lead \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Juan Test","email":"test@test.com","ciudad":"Bogotá"}'
```4. **Revisar console de Next.js**
   - Buscar: `Google Apps Script raw response:`
   - Debe ser JSON, no HTML

5. **Revisar Google Sheets**
   - Abrir hoja "Leads"
   - Verificar que se agregó la fila

6. **Si falla, revisar Executions en GAS**
   - Ver el error específico
   - Verificar qué línea falló

---

## ✅ Todo funciona si ves:

### En la consola de Next.js:
```
Google Apps Script raw response: {"ok":true}
Google Apps Script response: { ok: true }
```

### En Google Sheets:
Nueva fila con los datos del lead

### En el navegador:
- Redirección a `/gracias`
- Mensaje de éxito

---

## 🆘 Si nada funciona

1. **Copia el error exacto** de la consola
2. **Copia el response** completo de Google Apps Script
3. **Verifica la URL** del webhook (debe terminar en `/exec`)
4. **Verifica el token** (debe ser exactamente `bm92ZW5hcHA=`)
5. **Prueba con Postman** o similar para descartar problemas del frontend

---

## 📞 Info de contacto para soporte

Si después de seguir todos estos pasos aún tienes problemas, documenta:
- Error exacto de la consola
- Response de Google Apps Script
- Screenshot de las Script Properties
- Screenshot del deployment config
