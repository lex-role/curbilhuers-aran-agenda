# Cómo gestionar la galería de fotos

Este archivo explica cómo agregar, editar o eliminar fotos de la galería que se muestra en la web.

## Estructura de archivos

La galería se gestiona mediante dos elementos:

1. **Carpeta de imágenes**: `/public/gallery/` - Aquí se suben todas las fotos
2. **Archivo de configuración**: `/public/gallery/images.md` - Aquí se listan las fotos que se mostrarán

## Cómo añadir fotos nuevas

### Paso 1: Subir las imágenes

1. Coloca las fotos en la carpeta `/public/gallery/`
2. Usa nombres descriptivos sin espacios (ejemplo: `fiesta-mayor-2025.jpg`)
3. Formatos recomendados: JPG, PNG, WEBP

### Paso 2: Actualizar el archivo images.md

Abre el archivo `/public/gallery/images.md` y añade una nueva entrada:

```markdown
---
src: /gallery/nombre-de-tu-foto.jpg
alt: Descripción de la foto
---
```

### Ejemplo completo

```markdown
---
src: /gallery/fiesta-mayor-2025.jpg
alt: Actuación en la Fiesta Mayor de Les 2025
---

---

src: /gallery/festival-folklore.jpg
alt: Participación en el Festival de Folclore del Pirineo

---
```

## Campos del archivo Markdown

- **src**: Ruta completa a la imagen (obligatorio). Debe empezar con `/gallery/`
- **alt**: Descripción de la imagen para accesibilidad (obligatorio)

## Recomendaciones

### Tamaño de las imágenes

- **Ancho recomendado**: 1920px para imágenes grandes
- **Peso recomendado**: Menos de 500KB por imagen (usa herramientas de compresión)

### Orden de las fotos

Las fotos se mostrarán en el orden en que aparecen en el archivo `images.md`. Las más recientes suelen ir primero.

### Optimización

Para optimizar el rendimiento:

1. Comprime las imágenes antes de subirlas (usa herramientas como TinyPNG o ImageOptim)
2. Considera usar formato WEBP para mejor compresión

## Cómo eliminar fotos

1. Elimina la entrada correspondiente del archivo `images.md` (el bloque entre `---`)
2. Opcionalmente, elimina el archivo de imagen de la carpeta `/public/gallery/`

## Cómo cambiar el orden

Simplemente reordena las entradas en el archivo `images.md`. La primera entrada será la primera foto que se muestre.

## Publicar los cambios

Después de editar el archivo `images.md` y subir las nuevas fotos:

1. Sube todos los archivos al servidor
2. La galería se actualizará automáticamente al recargar la página

## Características de la galería

- **Grid responsivo**: Se adapta a diferentes tamaños de pantalla
- **Modal de visualización**: Al hacer clic en una foto se abre en pantalla completa
- **Navegación con teclado**: Usa las flechas ← → para navegar entre fotos
- **Contador**: Muestra qué foto estás viendo (ej: "3 / 12")
- **Lazy loading**: Las imágenes se cargan solo cuando son necesarias

## Solución de problemas

### Las fotos no aparecen

- Verifica que las rutas en `images.md` sean correctas
- Asegúrate de que las imágenes estén en la carpeta `/public/gallery/`
- Comprueba que el formato markdown sea correcto (cada foto entre `---`)

### Las fotos tardan mucho en cargar

- Comprime las imágenes para reducir su tamaño
- Considera usar formato WEBP en lugar de JPG
