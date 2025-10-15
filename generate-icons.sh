#!/bin/bash

# Script para generar iconos PWA desde el SVG
# Requiere: ImageMagick o Inkscape

echo "🎨 Generando iconos PWA para Novenapp..."

# Verificar si existe el SVG
if [ ! -f "public/icon.svg" ]; then
  echo "❌ Error: No se encontró public/icon.svg"
  exit 1
fi

# Verificar herramientas disponibles
if command -v convert &> /dev/null; then
  echo "✅ Usando ImageMagick..."
  
  # Generar iconos con ImageMagick
  convert -background none -resize 192x192 public/icon.svg public/icon-192.png
  convert -background none -resize 512x512 public/icon.svg public/icon-512.png
  convert -background none -resize 180x180 public/icon.svg public/apple-touch-icon.png
  
  echo "✅ Iconos generados con ImageMagick"
  
elif command -v inkscape &> /dev/null; then
  echo "✅ Usando Inkscape..."
  
  # Generar iconos con Inkscape
  inkscape public/icon.svg --export-filename=public/icon-192.png --export-width=192 --export-height=192
  inkscape public/icon.svg --export-filename=public/icon-512.png --export-width=512 --export-height=512
  inkscape public/icon.svg --export-filename=public/apple-touch-icon.png --export-width=180 --export-height=180
  
  echo "✅ Iconos generados con Inkscape"
  
else
  echo "❌ Error: Necesitas ImageMagick o Inkscape instalado"
  echo ""
  echo "Instalación:"
  echo "  - Ubuntu/Debian: sudo apt install imagemagick"
  echo "  - macOS: brew install imagemagick"
  echo "  - Windows: choco install imagemagick"
  echo ""
  echo "Alternativa: Usa un convertidor online:"
  echo "  - https://cloudconvert.com/svg-to-png"
  echo "  - https://svgtopng.com/"
  exit 1
fi

# Verificar que se generaron los archivos
if [ -f "public/icon-192.png" ] && [ -f "public/icon-512.png" ] && [ -f "public/apple-touch-icon.png" ]; then
  echo "✅ Todos los iconos fueron generados exitosamente:"
  echo "   - icon-192.png"
  echo "   - icon-512.png"
  echo "   - apple-touch-icon.png"
else
  echo "⚠️  Algunos iconos no se generaron correctamente"
fi

echo ""
echo "🎉 ¡Listo! Tu PWA ya tiene iconos."
