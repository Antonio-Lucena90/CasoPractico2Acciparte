// Panel principal del editor con lienzo de dibujo, barrra de herramientas y panel de propiedades.

import { Stage, Layer } from 'react-konva';
import './SceneEditor.css';
import Toolbar from '../../components/Toolbar/Toolbar';
import PropertiesPanel from '../../components/PropertiesPanel/PropertiesPanel';
import SceneElement from '../../components/SceneElement';
import { useScene } from '../../hooks/useScene';

const STAGE_WIDTH = 900;
const STAGE_HEIGHT = 600;

export default function SceneEditor() {
  const {
    elements,
    selectedId,
    setSelectedId,
    addElement,
    updateElement,
    deleteElement,
  } = useScene();

  //elemento seleccionado.
  const selectedElement = elements.find((el) => el.id === selectedId) ?? null;

  // quitar seleccion al hacer clic
  const handleStageClick = (e) => {
    if (e.target === e.target.getStage()) setSelectedId(null);
  };

  //exportar a JSON, se crea Blob con contenido y genera URL para descarga.
  const handleExport = () => {
    const scene = {
      version: 1,
      stage: { width: STAGE_WIDTH, height: STAGE_HEIGHT },
      elements,
    };
    const blob = new Blob([JSON.stringify(scene, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'escena-accidente.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Editor de escenas de accidente</h1>
        <p className="hint">
          Añade elementos desde la barra lateral y arrástralos para
          posicionarlos. Haz clic en un elemento para seleccionarlo y editar sus
          propiedades.
        </p>
      </header>

      <div className="layout">
        <Toolbar
          addElement={addElement}
          handleExport={handleExport}
          elementCount={elements.length}
        />

        <main className="canvas-wrapper">
          <Stage
            width={STAGE_WIDTH}
            height={STAGE_HEIGHT}
            onMouseDown={handleStageClick}
            onTouchStart={handleStageClick}
            className="stage"
          >
            <Layer>
              {elements.map((el) => (
                <SceneElement
                  key={el.id}
                  element={el}
                  isSelected={el.id === selectedId}
                  onSelect={() => setSelectedId(el.id)}
                  onChange={(patch) => updateElement(el.id, patch)}
                />
              ))}
            </Layer>
          </Stage>
        </main>

        <PropertiesPanel
          element={selectedElement}
          updateElement={(patch) => updateElement(selectedId, patch)}
          deleteElement={() => deleteElement(selectedId)}
        />
      </div>

      <details className="json-preview">
        <summary>Ver JSON de la escena ({elements.length} elementos)</summary>
        <pre>{JSON.stringify({ version: 1, elements }, null, 2)}</pre>
      </details>
    </div>
  );
}
