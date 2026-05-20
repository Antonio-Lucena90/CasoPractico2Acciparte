// Creación de un Hook personalizado para manejar estado y las funciones de agregar, actualizar, eliminar elementos. 

import { useState, useCallback } from 'react'
import { ELEMENT_CATALOG } from '../models/elementCatalog'

export function useScene() {
  const [elements, setElements] = useState([])
  const [selectedId, setSelectedId] = useState(null)

  const addElement = useCallback((type) => {
    const preset = ELEMENT_CATALOG[type]
    if (!preset) return
    const newEl = {
      id: crypto.randomUUID(),
      type,
      category: preset.category,
      label: preset.label,
      x: 450,
      y: 300,
      rotation: 0,
      width: preset.width,
      height: preset.height,
      color: preset.color,
    }
    setElements((prev) => [...prev, newEl])
    setSelectedId(newEl.id)
  }, [])

  const updateElement = useCallback((id, patch) => {
    if (!id) return
    setElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, ...patch } : el))
    )
  }, [])

  const deleteElement = useCallback((id) => {
    if (!id) return
    setElements((prev) => prev.filter((el) => el.id !== id))
    setSelectedId((curr) => (curr === id ? null : curr))
  }, [])

  return { elements, selectedId, setSelectedId, addElement, updateElement, deleteElement }
}
