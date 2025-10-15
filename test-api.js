/**
 * Script de debugging para probar la API de leads
 * Ejecutar con: node test-api.js
 */

const testPayload = {
  nombre: "Juan García Pérez",
  dedicatoria: "Con amor para toda nuestra familia en esta Navidad 2025. Que esta novena nos una más que nunca.",
  email: "test-debug@example.com",
  telefono: "+57 300 123 4567",
  ciudad: "Bogotá",
  utm_source: "test-script"
};

async function testAPI() {
  try {
    console.log('🧪 Probando API de leads...\n');
    console.log('📤 Enviando payload:', JSON.stringify(testPayload, null, 2));

    const response = await fetch('http://localhost:3000/api/lead', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testPayload),
    });

    console.log('\n📊 Status:', response.status, response.statusText);

    const data = await response.json();
    console.log('📥 Response:', JSON.stringify(data, null, 2));

    if (data.ok) {
      console.log('\n✅ ¡Test exitoso!');
    } else {
      console.log('\n❌ Test falló:', data.error);
    }
  } catch (error) {
    console.error('\n💥 Error:', error.message);
  }
}

testAPI();
