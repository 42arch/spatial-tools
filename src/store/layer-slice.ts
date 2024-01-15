import { StateCreator } from 'zustand'
import { LayerNode, Layers } from '@/types'
import { FeatureCollection } from 'geojson'
import { nanoid } from 'nanoid'

const initialLayerState = {
  layers: {},
  currentRemoveId: null,
  hiddenLayerIds: [],
  selectedLayerIds: []
}

export interface LayerSlice {
  layers: Layers
  currentRemoveId: string | null
  hiddenLayerIds: string[]
  selectedLayerIds: string[]
  addLayer: (name: string, data: FeatureCollection) => void
  removeLayer: (id: string) => void
  clearRemoveId: () => void
  toggleLayer: (id: string) => void
}

export const createLayerSlice: StateCreator<
  LayerSlice,
  [['zustand/immer', never]],
  [['zustand/immer', never]],
  LayerSlice
> = (set) => {
  return {
    ...initialLayerState,
    addLayer: (name: string, data: FeatureCollection) =>
      set((state) => {
        const layerNode: LayerNode = {
          id: nanoid(),
          name: name,
          data: data
          // layer: layer
        }
        state.layers[layerNode.id] = layerNode
      }),
    removeLayer: (id: string) =>
      set((state) => {
        state.currentRemoveId = id
        delete state.layers[id]
      }),
    toggleLayer: (id: string) =>
      set((state) => {
        if (state.hiddenLayerIds.indexOf(id) === -1) {
          state.hiddenLayerIds.push(id)
        } else {
          state.hiddenLayerIds = state.hiddenLayerIds.filter((i) => i !== id)
        }
      }),
    clearRemoveId: () =>
      set((state) => {
        state.currentRemoveId = null
      })
  }
}
