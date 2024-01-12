import { StateCreator } from 'zustand'
import { LayerNode, Layers } from '@/types'
import { AnyLayer, Layer } from 'mapbox-gl'

const initialFeatureState = {
  layers: {},
  hiddenGroupIds: [],
  hiddenFeatureIds: [],
  selectedFeatureIds: []
}

export interface LayerSlice {
  layers: Layers
  addLayer: (id: string, name: string, layer: any) => void
  removeLayer: (id: string) => void
}

export const createLayerSlice: StateCreator<
  LayerSlice,
  [['zustand/immer', never]],
  [['zustand/immer', never]],
  LayerSlice
> = (set) => {
  return {
    ...initialFeatureState,
    addLayer: (id: string, name: string, layer: AnyLayer) =>
      set((state) => {
        // state.layers
        const layerNode: LayerNode = {
          id: id,
          name: name,
          layer: layer
        }
        // @ts-expect-error
        state.layers[id] = layerNode
      }),
    removeLayer: (id: string) => set((state) => {})
  }
}
