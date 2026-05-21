# Editor de escenas de accidente

Interfaz gráfica interactiva para representar escenas de accidentes de tráfico, desarrollada con React y Konva.

---

## Instrucciones de ejecución


```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar la aplicación
npm run dev
```

La aplicación se abre automáticamente en `http://localhost:5173`.

---

## Uso

| Acción | Cómo |
|--------|------|
| Añadir un elemento | Pulsar un botón de la barra lateral izquierda |
| Mover un elemento | Arrastrarlo sobre el lienzo |
| Seleccionar un elemento | Hacer clic sobre él |
| Identificar el frontal del vehículo | Los vehículos muestran un triángulo blanco en su parte delantera (derecha por defecto). Al rotar el elemento, el triángulo indica siempre hacia dónde apunta el frontal |
| Redimensionar / rotar | Con el elemento seleccionado, usar los tiradores |
| Editar propiedades | Panel de propiedades (derecha) |
| Eliminar un elemento | Botón "Eliminar elemento" en el panel derecho |
| Exportar la escena | Botón "Exportar JSON" en la barra lateral |
| Ver el JSON en tiempo real | Panel expandible en la parte inferior |

---

## Modelo de datos

La escena es un array de elementos. Cada elemento tiene esta estructura:

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "type": "car",
  "category": "vehicle",
  "label": "Coche",
  "x": 450,
  "y": 300,
  "rotation": 0,
  "width": 80,
  "height": 40,
  "color": "#3b82f6"
}
```

| Campo | Descripción |
|-------|-------------|
| `id` | Identificador único generado con `crypto.randomUUID()` |
| `type` | Subtipo concreto del elemento (`car`, `truck`, `cone`…) |
| `category` | Familia: `vehicle`, `obstacle`, `reference` o `util` |
| `label` | Nombre visible sobre el elemento en el canvas |
| `x`, `y` | Posición del centro del elemento en píxeles |
| `rotation` | Rotación en grados |
| `width`, `height` | Dimensiones en píxeles |
| `color` | Color en hexadecimal |

Al exportar, los elementos se envuelven en un objeto con metadatos del lienzo:

```json
{
  "version": 1,
  "stage": { "width": 900, "height": 600 },
  "elements": [ ... ]
}
```

### Decisiones de diseño

- **Estado plano.** La escena es un array simple de elementos independientes. No hay jerarquías ni grupos, lo que mantiene el modelo fácil de serializar y de razonar.
- **Hook personalizado `useScene`.** Toda la lógica que modifica los elementos (añadir, actualizar, eliminar) está encapsulada en un hook personalizado, manteniendo los componentes visuales simples y centrados únicamente en la presentación.
- **`type` y `category` separados.** `type` identifica el elemento concreto y `category` lo agrupa en familias lógicas. Así la barra lateral se organiza automáticamente sin lógica extra.
- **Posición centrada.** `x` e `y` representan el centro geométrico del elemento. Esto simplifica la rotación: girar un elemento no desplaza su posición.
- **Catálogo declarativo.** Todos los tipos de elementos y sus valores por defecto viven en `src/models/elementCatalog.js`. Añadir un nuevo tipo solo requiere añadir una entrada a ese objeto.

---
