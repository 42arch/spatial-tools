import { create } from 'zustand'
// import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { FeatureSlice, createFeatureSlice } from './feature-slice'
import { DrawSlice, createDrawSlice } from './draw-slice'
import { MapSlice, createMapSlice } from './map-slice'
import { ViewSlice, createViewSlice } from './view-slice'
import { LayerSlice, createLayerSlice } from './layer-slice'

export const useFeatureStore = create<FeatureSlice>()(
  immer((...a) => ({
    ...createFeatureSlice(...a)
  }))
)

export const useLayerStore = create<LayerSlice>()(
  immer((...a) => ({
    ...createLayerSlice(...a)
  }))
)

export const useDrawStore = create<DrawSlice>()((...a) => ({
  ...createDrawSlice(...a)
}))

export const useMapStore = create<MapSlice>()((...a) => ({
  ...createMapSlice(...a)
}))

export const useViewStore = create<ViewSlice>()(
  immer((...a) => ({
    ...createViewSlice(...a)
  }))
)
