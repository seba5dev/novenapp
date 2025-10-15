# 📝 Google Apps Script para Novenapp

Este directorio contiene el código del Google Apps Script que captura los leads del formulario de Novenapp.

## 📋 Archivo

- **`Code.gs`** - Script principal con la función `doPost()`

## 🚀 Instalación

### Paso 1: Crear un Google Spreadsheet

1. Ve a [Google Sheets](https://sheets.google.com)
2. Crea una nueva hoja de cálculo
3. Nómbrala "Novenapp - Leads" (o el nombre que prefieras)

### Paso 2: Abrir el Editor de Apps Script

1. En la hoja de cálculo, ve a **Extensiones** > **Apps Script**
2. Se abrirá el editor de código
3. Borra el código por defecto

### Paso 3: Copiar el Código

1. Copia todo el contenido de `Code.gs`
2. Pégalo en el editor de Apps Script
3. Guarda el proyecto (Ctrl+S o Cmd+S)
4. Dale un nombre al proyecto (ej: "Novenapp Webhook")

### Paso 4: Configurar el SECRET_TOKEN

1. En el editor de Apps Script, haz clic en el ícono de **Configuración** ⚙️ (en el menú lateral)
2. En la sección **Script Properties**, haz clic en **Add script property**
3. Agrega:
   - **Property**: `SECRET_TOKEN`
   - **Value**: `bm92ZW5hcHA=`
4. Haz clic en **Save script properties**

### Paso 5: Desplegar como Web App

1. Haz clic en **Deploy** > **New deployment**
2. Haz clic en el ícono de engranaje ⚙️ junto a "Select type"
3. Selecciona **Web app**
4. Configura:
   - **Description**: "Novenapp Leads Webhook v1"
   - **Execute as**: `Me (tu@email.com)`
   - **Who has access**: `Anyone`
5. Haz clic en **Deploy**
6. Autoriza los permisos cuando te lo pida
7. **Copia la Web app URL** (termina en `/exec`)

### Paso 6: Configurar en Next.js

1. Abre el archivo `.env.local` en tu proyecto de Next.js
2. Actualiza la variable con la URL que copiaste:

```env
GS_WEBHOOK_URL=https://script.google.com/macros/s/TU_SCRIPT_ID_AQUI/exec
GS_SECRET_TOKEN=bm92ZW5hcHA=
```

3. Guarda el archivo
4. Reinicia el servidor de Next.js

## 🧪 Probar el Script

### Desde el Editor de Apps Script

1. En el editor, selecciona la función `testDoPost` en el dropdown superior
2. Haz clic en **Run** (▶️)
3. Revisa los logs en **Execution log** (abajo)
4. Verifica que aparezca una nueva fila en tu Google Sheet

### Desde Next.js

```bash
# Asegúrate de que el servidor esté corriendo
pnpm dev

# En otra terminal, ejecuta:
node test-api.js
```

## 📊 Estructura de la Hoja de Cálculo

El script creará automáticamente la hoja "Leads" con estas columnas:

| timestamp | email | nombre | dedicatoria | telefono | ciudad | utm_source |
|-----------|-------|--------|-------------|----------|--------|------------|
| 2025-10-14 15:30:00 | juan@email.com | Juan García Pérez | Con amor para... | +57 300... | Bogotá | facebook |

## 🔒 Seguridad

- ✅ Verificación de token secreto
- ✅ Validación de email
- ✅ Prevención de duplicados
- ✅ Lock para evitar race conditions
- ✅ Sanitización de datos de entrada

## 🐛 Debugging

### Ver logs de ejecuciones

1. En el editor de Apps Script, haz clic en el ícono de **Executions** ⏱️
2. Verás todas las ejecuciones recientes
3. Haz clic en una para ver detalles y logs

### Errores comunes

#### "Token inválido"
- Verifica que `SECRET_TOKEN` en Script Properties sea `bm92ZW5hcHA=`
- Verifica que `GS_SECRET_TOKEN` en `.env.local` sea `bm92ZW5hcHA=`

#### "Email requerido o inválido"
- Verifica que el payload incluya un email válido
- Formato: `usuario@dominio.com`

#### "Authorization required"
- Asegúrate de que "Who has access" esté en "Anyone"
- Re-despliega el script si es necesario

#### "La hoja no tiene columnas"
- Borra todo el contenido de la hoja "Leads"
- El script recreará los encabezados automáticamente

## 🔄 Actualizaciones

Si necesitas actualizar el código:

1. Modifica el código en el editor
2. Guarda los cambios (Ctrl+S)
3. Ve a **Deploy** > **Manage deployments**
4. Haz clic en el lápiz ✏️ para editar
5. Cambia la versión a "New version"
6. Haz clic en **Deploy**

**Nota**: La URL del webhook se mantiene igual.

## 📈 Campos capturados

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| timestamp | datetime | ✅ Auto | Fecha y hora de registro |
| email | string | ✅ | Email del usuario |
| nombre | string | ✅ | Nombre de la familia |
| dedicatoria | string | ❌ | Dedicatoria especial |
| telefono | string | ❌ | Teléfono de contacto |
| ciudad | string | ✅ | Ciudad de residencia |
| utm_source | string | ❌ | Fuente de tráfico (default: "direct") |

## 🎯 Payload de ejemplo

```json
{
  "token": "bm92ZW5hcHA=",
  "email": "juan@email.com",
  "nombre": "Juan García Pérez",
  "dedicatoria": "Con amor para toda nuestra familia en esta Navidad",
  "telefono": "+57 300 123 4567",
  "ciudad": "Bogotá",
  "utm_source": "facebook"
}
```

## 💡 Tips

- Los datos se guardan en tiempo real
- Puedes agregar más validaciones según necesites
- Los encabezados se crean automáticamente si la hoja está vacía
- Los duplicados se detectan por email (case-insensitive)
- El lock previene problemas con múltiples requests simultáneos

## 📞 Soporte

Si tienes problemas:
1. Revisa los logs en **Executions**
2. Verifica la configuración de Script Properties
3. Asegúrate de que la hoja existe y tienes permisos de edición
4. Revisa el archivo `DEBUGGING_CHECKLIST.md` en el proyecto
