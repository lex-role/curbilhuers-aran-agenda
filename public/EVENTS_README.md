# Cómo editar los eventos

Este archivo explica cómo editar el archivo `Events.md` para actualizar los eventos que se muestran en la web.

## Formato del archivo

El archivo `Events.md` contiene todos los eventos que se muestran en la sección "Próximos Actos" de la web. Cada evento está entre separadores `---`.

## Estructura de un evento

Cada evento tiene un formato simple con campos clave-valor:

```markdown
---
title: Nombre del evento
date: Fecha del evento
time: HH:MM
location: Lugar del evento
description: Descripción completa del evento con todos los detalles relevantes.
---
```

### Ejemplo

```markdown
---
title: Fiesta Mayor de Les
date: 15 de Julio, 2025
time: 19:00
location: Plaza del Pueblo, Les
description: Actuación especial durante las fiestas patronales con un repertorio completo de danzas tradicionales aranesas.
---
```

## Campos obligatorios

- `title`: El nombre del evento
- `date`: La fecha del evento (formato libre)
- `time`: La hora del evento (formato HH:MM)
- `location`: El lugar donde se celebra el evento
- `description`: Descripción completa del evento

## Cómo añadir un nuevo evento

1. Abre el archivo `public/Events.md`
2. Al final del archivo, añade una nueva sección con el formato:

```markdown
---
title: Nombre del nuevo evento
date: Fecha del evento
time: HH:MM
location: Lugar del evento
description: Descripción completa del evento con todos los detalles relevantes.
---
```

## Cómo eliminar un evento

Simplemente elimina toda la sección del evento (desde `---` hasta `---`).

## Cómo editar un evento

Modifica cualquiera de los campos del evento que quieras cambiar, manteniendo siempre el formato `campo: valor`.

## Publicar los cambios

Después de editar el archivo `Events.md`:

1. Guarda los cambios
2. Sube el archivo actualizado al servidor (en la carpeta `public/`)
3. La web se actualizará automáticamente al cargar la página

## Notas importantes

- Mantén siempre el formato con `---` entre eventos
- Los campos deben estar exactamente como se muestra (respetando mayúsculas/minúsculas)
- La descripción puede contener múltiples líneas y párrafos
- El orden de los eventos en el archivo es el orden en que se mostrarán en la web
