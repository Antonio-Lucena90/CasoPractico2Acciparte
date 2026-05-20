import './PropertiesPanel.css'

export default function PropertiesPanel({ element, updateElement, deleteElement }) {
  if (!element) {
    return (
      <aside className="panel">
        <h2 className="title">Propiedades</h2>
        <p className="muted">
          Selecciona un elemento del lienzo para ver sus propiedades.
        </p>
      </aside>
    )
  }

  // Fx que actuliza campo numérico del elemento. 
  const setNumber = (field) => (e) =>
    updateElement({ [field]: Number(e.target.value) })

  return (
    <aside className="panel">
      <h2 className="title">Propiedades</h2>

      <div className="field">
        <label>Etiqueta</label>
        <input
          type="text"
          value={element.label}
          onChange={(e) => updateElement({ label: e.target.value })}
        />
      </div>

      <div className="field">
        <label>Tipo</label>
        <input type="text" value={element.type} readOnly />
      </div>

      <div className="field">
        <label>Categoría</label>
        <input type="text" value={element.category} readOnly />
      </div>

      <div className="field-row">
        <div className="field">
          <label>X</label>
          <input type="number" value={Math.round(element.x)} onChange={setNumber('x')} />
        </div>
        <div className="field">
          <label>Y</label>
          <input type="number" value={Math.round(element.y)} onChange={setNumber('y')} />
        </div>
      </div>

      <div className="field-row">
        <div className="field">
          <label>Ancho</label>
          <input type="number" min="10" value={Math.round(element.width)} onChange={setNumber('width')} />
        </div>
        <div className="field">
          <label>Alto</label>
          <input type="number" min="10" value={Math.round(element.height)} onChange={setNumber('height')} />
        </div>
      </div>

      <div className="field">
        <label>Rotación (º)</label>
        <input type="number" value={Math.round(element.rotation)} onChange={setNumber('rotation')} />
      </div>

      <div className="field">
        <label>Color</label>
        <input
          type="color"
          value={element.color}
          onChange={(e) => updateElement({ color: e.target.value })}
        />
      </div>

      <button className="deleteBtn" onClick={deleteElement}>
        Eliminar elemento
      </button>
    </aside>
  )
}
