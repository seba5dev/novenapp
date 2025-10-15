# 🔧 Configuración de Google Apps Script

## Paso 1: Configurar el SECRET_TOKEN

1. En tu Google Apps Script, ve a **Configuración** (ícono de engranaje ⚙️)
2. En la sección **Script Properties**, agrega:
   - **Propiedad**: `SECRET_TOKEN`
   - **Valor**: `bm92ZW5hcHA=`

## Paso 2: Verificar el código

Asegúrate de que tu Google Apps Script tenga este código exacto:

```javascript
/**
 * Webhook para captar leads en Google Sheets.
 */
const SHEET_NAME = 'Leads';
const SECRET_TOKEN = PropertiesService.getScriptProperties().getProperty('SECRET_TOKEN') || '';

function doPost(e) {
  try {
    const contentType = e.postData && e.postData.type;
    if (!contentType || !e.postData.contents) {
      return json(400, { ok: false, error: 'No postData' });
    }

    // Acepta JSON
    const body = contentType.includes('json')
      ? JSON.parse(e.postData.contents)
      : parseFormEncoded(e.postData.contents);

    // Seguridad básica
    if (!body.token || body.token !== SECRET_TOKEN) {
      return json(401, { ok: false, error: 'Token inválido' });
    }

    const { email, nombre, telefono, ciudad, utm_source } = body;
    if (!email || !validateEmail(email)) {
      return json(400, { ok: false, error: 'Email requerido o inválido' });
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

    const lock = LockService.getDocumentLock();
    lock.tryLock(5000);

    // Busca encabezados y crea si faltan
    ensureHeaders(sheet, ['timestamp', 'email', 'nombre', 'telefono', 'ciudad', 'utm_source']);

    // Dedupe por email
    const emailCol = findColumnIndex(sheet, 'email');
    const existing = sheet
      .getRange(2, emailCol, Math.max(sheet.getLastRow() - 1, 1), 1)
      .getValues()
      .flat()
      .map(v => String(v).trim().toLowerCase());

    if (existing.includes(String(email).trim().toLowerCase())) {
      lock.releaseLock();
      return json(200, { ok: true, duplicated: true });
    }

    // Inserta
    const now = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss');
    const row = [
      now,
      email,
      nombre || '',
      telefono || '',
      ciudad || '',
      utm_source || ''
    ];
    sheet.appendRow(row);

    lock.releaseLock();
    return json(200, { ok: true });
  } catch (err) {
    return json(500, { ok: false, error: String(err) });
  }
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());
}

function ensureHeaders(sheet, headers) {
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.setFrozenRows(1);
  }
}

function findColumnIndex(sheet, headerName) {
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const idx = headers.findIndex(h => String(h).trim().toLowerCase() === headerName.toLowerCase());
  if (idx === -1) throw new Error(`No existe encabezado: ${headerName}`);
  return idx + 1; // 1-based
}

function parseFormEncoded(s) {
  const obj = {};
  s.split('&').forEach(kv => {
    const [k, v] = kv.split('=');
    obj[decodeURIComponent(k)] = decodeURIComponent((v || '').replace(/\+/g, ' '));
  });
  return obj;
}

function json(status, obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
```

## Paso 3: Desplegar como Web App

1. Haz clic en **Deploy** > **New deployment**
2. Selecciona tipo: **Web app**
3. Configuración:
   - **Execute as**: `Me (tu@email.com)`
   - **Who has access**: `Anyone` (importante para que funcione sin autenticación)
4. Haz clic en **Deploy**
5. Copia la URL del webhook (termina en `/exec`)

## Paso 4: Actualizar .env.local

Actualiza tu archivo `.env.local` con la URL que copiaste:

```env
GS_WEBHOOK_URL=https://script.google.com/macros/s/TU_SCRIPT_ID/exec
GS_SECRET_TOKEN=bm92ZW5hcHA=
```

## Paso 5: Probar la integración

### Opción A: Con el script de test

```bash
node test-api.js
```

### Opción B: Con curl

```bash
curl -X POST http://localhost:3000/api/lead \
  -H "Content-Type: application/json" \
  -d '{
    "nombreFamilia": "Familia Test",
    "dedicatoria": "Prueba",
    "email": "test@example.com",
    "telefono": "+57 300 123 4567",
    "ciudad": "Bogotá",
    "utm_source": "test"
  }'
```

### Opción C: Con el formulario

1. Inicia el servidor: `pnpm dev`
2. Ve a: `http://localhost:3000/crear`
3. Llena el formulario
4. Envía y verifica en Google Sheets

## ⚠️ Troubleshooting

### Error: "Token inválido"

**Causa**: El token en `.env.local` no coincide con el `SECRET_TOKEN` en Google Apps Script.

**Solución**:
1. Verifica que `SECRET_TOKEN` en Google Apps Script sea exactamente: `bm92ZW5hcHA=`
2. Verifica que `GS_SECRET_TOKEN` en `.env.local` sea exactamente: `bm92ZW5hcHA=`
3. Reinicia el servidor de Next.js

### Error: "No postData"

**Causa**: El request no está llegando correctamente.

**Solución**:
1. Verifica que la URL del webhook sea correcta
2. Asegúrate de que termina en `/exec` (no `/dev`)
3. Verifica que el script esté desplegado

### Error: "Email requerido o inválido"

**Causa**: El email no está siendo enviado o tiene formato incorrecto.

**Solución**:
1. Verifica que el campo `email` esté presente en el payload
2. Verifica que tenga formato válido (xxx@xxx.xxx)

### Error: "No existe encabezado: email"

**Causa**: La hoja de cálculo no tiene los encabezados correctos.

**Solución**:
1. Elimina todo el contenido de la hoja "Leads"
2. El script recreará los encabezados automáticamente en el próximo POST

### Error 500: "Error interno del servidor"

**Causa**: Puede ser un bug en el código del Google Apps Script.

**Solución**:
1. En Google Apps Script, ve a **Executions** (Ejecuciones)
2. Busca la ejecución fallida y revisa el error exacto
3. Verifica que todos los campos estén siendo enviados correctamente

## 🔍 Verificar que funciona

Después de enviar un lead, deberías ver:

1. **En Next.js console**:
   ```
   Google Apps Script response: { ok: true }
   ```

2. **En Google Sheets**:
   | timestamp | email | nombre | telefono | ciudad | utm_source |
   |-----------|-------|--------|----------|--------|------------|
   | 2025-10-14 15:30:00 | test@example.com | Familia Test | +57 300... | Bogotá | test |

3. **En el navegador**:
   - Redirección a `/gracias`
   - Mensaje de confirmación

## 📝 Notas importantes

- El `SECRET_TOKEN` debe ser **exactamente el mismo** en ambos lados
- La URL debe terminar en `/exec` (no `/dev`)
- El script debe estar desplegado con acceso "Anyone"
- Los cambios en `.env.local` requieren reiniciar el servidor
- El script de GAS previene duplicados por email automáticamente
