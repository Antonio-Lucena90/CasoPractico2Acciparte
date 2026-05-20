import { ELEMENT_CATALOG } from '../../models/elementCatalog';
import './Toolbar.css';

const CATEGORY_LABELS = {
  vehicle: 'Vehículos',
  obstacle: 'Obstáculos',
  reference: 'Referencias',
  util: 'Útiles',
};

// agrupa elementos por categoría.
function groupByCategory(catalog) {
  return Object.entries(catalog).reduce((acc, [key, def]) => {
    const cat = def.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push({ key, ...def });
    return acc;
  }, {});
}

export default function Toolbar({ addElement, handleExport, elementCount }) {
  const grouped = groupByCategory(ELEMENT_CATALOG);

  return (
    <aside className="toolbar">
      // Primer map recorre categorías, el segundo elementos de cada categoría.
      {Object.entries(grouped).map(([cat, items]) => (
        <div key={cat} className="section">
          <h2 className="title">{CATEGORY_LABELS[cat] || cat}</h2>
          <div className="buttons">
            {items.map((item) => (
              <button
                key={item.key}
                className="addBtn"
                onClick={() => addElement(item.key)}
                title={`Añadir ${item.label.toLowerCase()}`}
              >
                <span className="swatch" style={{ background: item.color }} />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      ))}
      <div className="section">
        <h2 className="title">Escena ({elementCount})</h2>
        <button
          className="actionBtn"
          onClick={handleExport}
          disabled={elementCount === 0}
        >
          Exportar JSON
        </button>
      </div>
    </aside>
  );
}
