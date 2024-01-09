import { create } from 'zustand'
// import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { FeatureSlice, createFeatureSlice } from './feature-slice'
import { DrawSlice, createDrawSlice } from './draw-slice'
import { MapSlice, createMapSlice } from './map-slice'

export const useFeatureStore = create<FeatureSlice>()(
  immer((...a) => ({
    ...createFeatureSlice(...a)
  }))
)

export const useDrawStore = create<DrawSlice>()((...a) => ({
  ...createDrawSlice(...a)
}))

export const useMapStore = create<MapSlice>()((...a) => ({
  ...createMapSlice(...a)
}))
