# Guía de Configuración del Endpoint GET en Google Apps Script

## 📝 Actualización Necesaria

El Google Apps Script ahora soporta **dos endpoints**:
1. **POST**: Para guardar nuevos leads (ya existente)
2. **GET**: Para consultar datos de novenas por slug (nuevo)

---

## 🚀 Pasos para Actualizar

### 1. Abrir tu Google Apps Script

Ve a tu proyecto en Google Apps Script:
- URL: [https://script.google.com](https://script.google.com)
- Busca tu proyecto "Novenapp Webhook"

### 2. Reemplazar el código completo

Copia todo el contenido de `/google-apps-script/Code-v2.gs` y reemplázalo en tu Script.

**Importante**: El nuevo código incluye:
- Función `doGet(e)` para consultar novenas
- Función `doPost(e)` actualizada con campo `slug`
- Funciones de test para ambos endpoints

### 3. Verificar Secret Token

Asegúrate de que tu **Secret Token** esté configurado:

1. En el editor, ve a: **Configuración del proyecto** (ícono de engranaje) → **Propiedades del script**
2. Verifica que exista la propiedad:
   - **Clave**: `SECRET_TOKEN`
   - **Valor**: `bm92ZW5hcHA=` (o tu token personalizado)

### 4. Actualizar la hoja de cálculo

La hoja "Leads" necesita una columna adicional:

| Timestamp | Email | Nombre | Dedicatoria | Teléfono | Ciudad | **Slug** | UTM Source |
|-----------|-------|--------|-------------|----------|--------|----------|------------|

**El script la creará automáticamente** en el próximo registro si no existe.

### 5. Probar el endpoint GET

#### Opción A: Desde Google Apps Script

1. En el editor, selecciona la función `testDoGet` en el menú desplegable
2. Haz clic en "Ejecutar"
3. Revisa los logs (Ver → Registros)

#### Opción B: Desde el navegador

```
https://script.google.com/macros/s/TU_SCRIPT_ID/exec?slug=juan-perez-1234567890&token=bm92ZW5hcHA=
```

Respuesta esperada:
```json
{
  "ok": true,
  "data": {
    "nombre": "Juan Pérez García",
    "dedicatoria": "Para mi familia con todo mi amor",
    "ciudad": "Bogotá"
  }
}
```

### 6. Re-desplegar (IMPORTANTE)

Después de actualizar el código:

1. Haz clic en **Implementar** → **Administrar implementaciones**
2. Haz clic en el ícono de **lápiz** (editar) de tu implementación activa
3. En "Nueva descripción", escribe algo como: `v2 - Agregado endpoint GET`
4. Haz clic en **Implementar**

⚠️ **Sin re-desplegar, el endpoint GET no funcionará** en producción.

---

## 🧪 Casos de Prueba

### Test 1: Slug válido
```bash
GET https://script.google.com/.../exec?slug=juan-perez-1234&token=bm92ZW5hcHA=
```
✅ Esperado: `{ "ok": true, "data": {...} }`

### Test 2: Slug no existe
```bash
GET https://script.google.com/.../exec?slug=no-existe-999&token=bm92ZW5hcHA=
```
❌ Esperado: `{ "ok": false, "error": "Novena no encontrada" }`

### Test 3: Token inválido
```bash
GET https://script.google.com/.../exec?slug=juan-perez-1234&token=wrong
```
🔒 Esperado: `{ "ok": false, "error": "Token inválido" }`

### Test 4: Sin slug
```bash
GET https://script.google.com/.../exec?token=bm92ZW5hcHA=
```
⚠️ Esperado: `{ "ok": false, "error": "Slug es requerido" }`

---

## 🔧 Troubleshooting

### Error: "Hoja no encontrada"
- **Causa**: La hoja "Leads" no existe
- **Solución**: Crea manualmente la hoja con nombre exacto "Leads"

### Error: "Columna slug no encontrada"
- **Causa**: Falta la columna Slug en los headers
- **Solución**: Agrega "Slug" como header en la columna G (después de Ciudad)

### El GET devuelve datos vacíos
- **Causa**: El POST no está guardando el slug
- **Solución**: Verifica que `/api/lead/route.ts` incluya `slug` en el payload

### Timeout en la petición
- **Causa**: Google Apps Script demora mucho
- **Solución**: Optimiza la búsqueda o aumenta el timeout en Next.js

---

## 📊 Monitoreo

Para ver logs en Google Apps Script:

1. Ve a **Ejecuciones** (menú lateral)
2. Filtra por "doGet" o "doPost"
3. Revisa los logs de cada ejecución

---

## ✅ Checklist Final

- [ ] Código actualizado con función `doGet`
- [ ] Secret Token configurado en Propiedades del script
- [ ] Columna "Slug" agregada a la hoja Leads
- [ ] Script re-desplegado (nueva versión)
- [ ] Test exitoso con `testDoGet()`
- [ ] Variables de entorno en Next.js configuradas
- [ ] Endpoint `/api/novena/[slug]` creado
- [ ] Página `/novenas/[slug]` actualizada

---

🎉 **¡Listo! Ahora las novenas mostrarán datos reales desde Google Sheets.**
