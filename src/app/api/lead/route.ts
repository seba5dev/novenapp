import { NextResponse } from 'next/server';

/**
 * API Route para capturar leads y enviarlos a Google Apps Script
 * 
 * @endpoint POST /api/lead
 * @body { email, nombre, dedicatoria, telefono, ciudad, utm_source }
 * @returns { ok: boolean, message?: string, error?: string }
 */
export async function POST(req: Request) {
  try {
    // Extraer datos del formulario
    const {
      email,
      nombre,
      dedicatoria,
      telefono,
      ciudad,
      slug,
      utm_source
    } = await req.json();

    // Validaciones básicas
    if (!email) {
      return NextResponse.json(
        { ok: false, error: 'Email es requerido' },
        { status: 400 }
      );
    }

    if (!nombre) {
      return NextResponse.json(
        { ok: false, error: 'Nombre es requerido' },
        { status: 400 }
      );
    }

    if (!ciudad) {
      return NextResponse.json(
        { ok: false, error: 'Ciudad es requerida' },
        { status: 400 }
      );
    }

    // Verificar que las variables de entorno existan
    const GS_WEBHOOK_URL = process.env.GS_WEBHOOK_URL;
    const GS_SECRET_TOKEN = process.env.GS_SECRET_TOKEN;

    if (!GS_WEBHOOK_URL || !GS_SECRET_TOKEN) {
      console.error('Variables de entorno no configuradas');
      return NextResponse.json(
        { ok: false, error: 'Configuración del servidor incompleta' },
        { status: 500 }
      );
    }

    // Preparar datos para enviar a Google Apps Script
    // Incluye todos los campos: email, nombre, dedicatoria, telefono, ciudad, slug, utm_source
    const payload = {
      token: GS_SECRET_TOKEN,
      email: email.trim(),
      nombre: nombre.trim(),
      dedicatoria: dedicatoria ? dedicatoria.trim() : '',
      telefono: telefono ? telefono.trim() : '',
      ciudad: ciudad.trim(),
      slug: slug ? slug.trim() : '',
      utm_source: utm_source || 'direct',
    };

    // Enviar a Google Apps Script con timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    const resp = await fetch(GS_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // Parsear respuesta
    const responseText = await resp.text();
    console.log('Google Apps Script raw response:', responseText);

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Error parsing GAS response:', parseError);
      return NextResponse.json(
        { ok: false, error: 'Respuesta inválida del servidor de Google', details: responseText },
        { status: 500 }
      );
    }

    // Log para debugging
    console.log('Google Apps Script response:', data);

    if (!resp.ok) {
      console.error('GAS returned error:', data);
      return NextResponse.json(
        { ok: false, error: data.error || 'Error al procesar la solicitud' },
        { status: resp.status }
      );
    }

    if (!data.ok) {
      console.error('GAS returned ok:false:', data);
      return NextResponse.json(
        { ok: false, error: data.error || 'Error al guardar el lead' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { ok: true, message: 'Lead registrado exitosamente', duplicated: data.duplicated || false },
      { status: 200 }
    );

  } catch (err: any) {
    // Manejo de errores específicos
    if (err.name === 'AbortError') {
      console.error('Request timeout');
      return NextResponse.json(
        { ok: false, error: 'Tiempo de espera agotado' },
        { status: 504 }
      );
    }

    console.error('Error en /api/lead:', err);
    return NextResponse.json(
      { ok: false, error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
