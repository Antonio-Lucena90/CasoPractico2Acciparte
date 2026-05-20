// este archivo define un catálogo de elementos con sus propiedades. 
export const ELEMENT_CATALOG = {
  car: {
    category: 'vehicle',
    label: 'Coche',
    width: 80,
    height: 40,
    color: '#3b82f6',
  },
  truck: {
    category: 'vehicle',
    label: 'Camión',
    width: 120,
    height: 45,
    color: '#ef4444',
  },
  motorcycle: {
    category: 'vehicle',
    label: 'Moto',
    width: 50,
    height: 25,
    color: '#22c55e',
  },
  cone: {
    category: 'obstacle',
    label: 'Cono',
    width: 22,
    height: 22,
    color: '#f97316',
  },
  barrier: {
    category: 'obstacle',
    label: 'Barrera',
    width: 100,
    height: 14,
    color: '#facc15',
  },
  sign: {
    category: 'reference',
    label: 'Señal',
    width: 32,
    height: 32,
    color: '#a855f7',
  },
  tree: {
    category: 'reference',
    label: 'Árbol',
    width: 36,
    height: 36,
    color: '#16a34a',
  },
  arrow: {
    category: 'util',
    label: 'Flecha',
    width: 100,
    height: 10,
    color: '#dc2626',
  },
}
