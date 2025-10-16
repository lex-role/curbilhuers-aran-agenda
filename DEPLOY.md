# Despliegue en GitHub Pages

Este documento explica cómo publicar la web en GitHub Pages.

## Configuración inicial (solo una vez)

1. Ve al repositorio en GitHub: https://github.com/lex-role/curbilhuers-aran-agenda

2. Ve a **Settings** > **Pages**

3. En **Source**, selecciona: **GitHub Actions**

¡Eso es todo! El sitio se desplegará automáticamente.

## Despliegue automático

Cada vez que hagas `push` a la rama `main`, GitHub Actions:

1. Construirá el proyecto automáticamente
2. Lo desplegará en GitHub Pages
3. Estará disponible en: **https://lex-role.github.io/curbilhuers-aran-agenda/**

## Despliegue manual (alternativo)

Si prefieres desplegar manualmente desde tu ordenador:

```bash
npm run deploy
```

Este comando:
1. Construye el proyecto
2. Publica los archivos en la rama `gh-pages`

## Ver el progreso del despliegue

1. Ve a la pestaña **Actions** en GitHub
2. Verás el workflow "Deploy to GitHub Pages"
3. Haz clic para ver el progreso en tiempo real

## URL de la web

Una vez desplegado, tu web estará disponible en:

**https://lex-role.github.io/curbilhuers-aran-agenda/**

## Actualizar la web

Para actualizar el contenido:

### Eventos (public/Events.md)
1. Edita el archivo `public/Events.md`
2. Haz commit y push
3. GitHub Actions desplegará automáticamente

### Galería (public/gallery/images.md)
1. Sube las nuevas fotos a `public/gallery/`
2. Actualiza `public/gallery/images.md`
3. Haz commit y push
4. GitHub Actions desplegará automáticamente

## Solución de problemas

### El sitio no se actualiza
- Verifica que el workflow se ejecutó correctamente en la pestaña Actions
- Espera unos minutos, GitHub Pages puede tardar en actualizar

### Error 404
- Asegúrate de que configuraste GitHub Pages para usar GitHub Actions
- Verifica que el workflow se completó exitosamente

### Las imágenes no cargan
- Verifica que las rutas en los archivos `.md` sean correctas
- Las rutas deben empezar con `/gallery/` o `/`
