/**
 * Webhook para captar leads de Novenapp en Google Sheets
 * 
 * Campos capturados:
 * - timestamp: Fecha y hora de registro
 * - email: Email del usuario
 * - nombre: Nombre de la familia
 * - dedicatoria: Dedicatoria especial
 * - telefono: Teléfono (opcional)
 * - ciudad: Ciudad de residencia
 * - utm_source: Fuente de tráfico
 * 
 * Seguridad:
 * - Verifica SECRET_TOKEN
 * - Previene duplicados por email
 * - Lock para evitar race conditions
 */

const SHEET_NAME = 'Leads';
const SECRET_TOKEN = PropertiesService.getScriptProperties().getProperty('SECRET_TOKEN') || '';

function doPost(e) {
  try {
    // Validar que hay datos en el POST
    const contentType = e.postData && e.postData.type;
    if (!contentType || !e.postData.contents) {
      return json(400, { ok: false, error: 'No postData' });
    }

    // Parsear body (acepta JSON o form-encoded)
    const body = contentType.includes('json')
      ? JSON.parse(e.postData.contents)
      : parseFormEncoded(e.postData.contents);

    // Seguridad: Verificar token
    if (!body.token || body.token !== SECRET_TOKEN) {
      return json(401, { ok: false, error: 'Token inválido' });
    }

    // Extraer y validar campos
    const { email, nombre, dedicatoria, telefono, ciudad, utm_source } = body;
    
    if (!email || !validateEmail(email)) {
      return json(400, { ok: false, error: 'Email requerido o inválido' });
    }

    if (!nombre || String(nombre).trim() === '') {
      return json(400, { ok: false, error: 'Nombre de familia es requerido' });
    }

    if (!ciudad || String(ciudad).trim() === '') {
      return json(400, { ok: false, error: 'Ciudad es requerida' });
    }

    // Obtener/crear la hoja
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

    // Lock para evitar race conditions
    const lock = LockService.getDocumentLock();
    if (!lock.tryLock(5000)) {
      return json(503, { ok: false, error: 'Servicio ocupado, intenta de nuevo' });
    }

    try {
      // Asegurar que existan los encabezados
      ensureHeaders(sheet, [
        'timestamp',
        'email',
        'nombre',
        'dedicatoria',
        'telefono',
        'ciudad',
        'utm_source'
      ]);

      // Prevenir duplicados por email
      const emailCol = findColumnIndex(sheet, 'email');
      const lastRow = sheet.getLastRow();
      
      if (lastRow > 1) {
        const existing = sheet
          .getRange(2, emailCol, lastRow - 1, 1)
          .getValues()
          .flat()
          .map(v => String(v).trim().toLowerCase());

        if (existing.includes(String(email).trim().toLowerCase())) {
          return json(200, { ok: true, duplicated: true });
        }
      }

      // Preparar la fila con todos los datos
      const now = Utilities.formatDate(
        new Date(), 
        Session.getScriptTimeZone(), 
        'yyyy-MM-dd HH:mm:ss'
      );
      
      // Formatear teléfono para evitar que Google Sheets lo interprete como fórmula
      // Agregamos apóstrofe al inicio si comienza con + o -
      let telefonoFormateado = '';
      if (telefono) {
        const tel = String(telefono).trim();
        telefonoFormateado = (tel.startsWith('+') || tel.startsWith('-')) ? `'${tel}` : tel;
      }
      
      const row = [
        now,
        String(email).trim(),
        String(nombre).trim(),
        dedicatoria ? String(dedicatoria).trim() : '',
        telefonoFormateado,
        String(ciudad).trim(),
        utm_source ? String(utm_source).trim() : 'direct'
      ];

      // Insertar la fila
      sheet.appendRow(row);

      // Respuesta exitosa
      return json(200, { 
        ok: true, 
        message: 'Lead registrado exitosamente',
        row: sheet.getLastRow()
      });

    } finally {
      lock.releaseLock();
    }

  } catch (err) {
    Logger.log('Error en doPost: ' + err.toString());
    return json(500, { ok: false, error: String(err) });
  }
}

/**
 * Valida formato de email
 */
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());
}

/**
 * Asegura que la hoja tenga los encabezados correctos
 */
function ensureHeaders(sheet, headers) {
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
    
    // Autoajustar columnas
    for (let i = 1; i <= headers.length; i++) {
      sheet.autoResizeColumn(i);
    }
  }
}

/**
 * Encuentra el índice (1-based) de una columna por nombre
 */
function findColumnIndex(sheet, headerName) {
  const lastCol = sheet.getLastColumn();
  if (lastCol === 0) {
    throw new Error('La hoja no tiene columnas');
  }
  
  const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  const idx = headers.findIndex(h => 
    String(h).trim().toLowerCase() === headerName.toLowerCase()
  );
  
  if (idx === -1) {
    throw new Error(`No existe encabezado: ${headerName}`);
  }
  
  return idx + 1; // 1-based para Google Sheets
}

/**
 * Parsea form-encoded data
 */
function parseFormEncoded(s) {
  const obj = {};
  s.split('&').forEach(kv => {
    const [k, v] = kv.split('=');
    if (k) {
      obj[decodeURIComponent(k)] = decodeURIComponent((v || '').replace(/\+/g, ' '));
    }
  });
  return obj;
}

/**
 * Retorna una respuesta JSON con status code
 */
function json(status, obj) {
  const output = ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
  
  // Note: Google Apps Script no soporta setResponseCode en todas las versiones
  // pero lo incluimos por compatibilidad
  if (output.setResponseCode) {
    output.setResponseCode(status);
  }
  
  return output;
}

/**
 * Función de test (opcional)
 * Para probar desde el editor de Google Apps Script
 */
function testDoPost() {
  const mockEvent = {
    postData: {
      type: 'application/json',
      contents: JSON.stringify({
        token: SECRET_TOKEN,
        email: 'test@example.com',
        nombre: 'Familia Test',
        dedicatoria: 'Esta es una dedicatoria de prueba',
        telefono: '+57 300 123 4567',
        ciudad: 'Bogotá',
        utm_source: 'test'
      })
    }
  };
  
  const response = doPost(mockEvent);
  Logger.log(response.getContent());
}
