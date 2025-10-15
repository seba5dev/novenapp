import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/novena/[slug]
 * 
 * Obtiene los datos de una novena personalizada desde Google Sheets
 * 
 * @param slug - El identificador único de la novena
 * @returns JSON con nombre, dedicatoria y ciudad
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    if (!slug) {
      return NextResponse.json(
        { ok: false, error: "Slug es requerido" },
        { status: 400 }
      );
    }

    // Verificar que existan las variables de entorno
    const webhookUrl = process.env.GS_WEBHOOK_URL;
    const secretToken = process.env.GS_SECRET_TOKEN;

    if (!webhookUrl || !secretToken) {
      console.error("❌ Faltan variables de entorno: GS_WEBHOOK_URL o GS_SECRET_TOKEN");
      return NextResponse.json(
        { ok: false, error: "Configuración del servidor incompleta" },
        { status: 500 }
      );
    }

    // Construir URL con parámetros para GET
    const url = new URL(webhookUrl);
    url.searchParams.append("slug", slug);
    url.searchParams.append("token", secretToken);

    console.log("🔍 Consultando novena:", slug);

    // Hacer petición GET al Google Apps Script
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error("❌ Error en Google Apps Script:", response.status, response.statusText);

      // Si es 404, la novena no existe
      if (response.status === 404) {
        return NextResponse.json(
          { ok: false, error: "Novena no encontrada" },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { ok: false, error: "Error al obtener datos de la novena" },
        { status: response.status }
      );
    }

    const data = await response.json();

    if (!data.ok) {
      console.error("❌ Google Apps Script devolvió error:", data.error);
      return NextResponse.json(
        { ok: false, error: data.error || "Error desconocido" },
        { status: 500 }
      );
    }

    console.log("✅ Novena encontrada:", data.data?.nombre);

    return NextResponse.json(data, { status: 200 });

  } catch (error) {
    console.error("❌ Error al obtener novena:", error);
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Error interno del servidor"
      },
      { status: 500 }
    );
  }
}
