import { toggleNodeVisible } from '@/lib/feature'
import { FeatureType, FeatureNode } from '@/types'
import { StateCreator } from 'zustand'

const initialFeatureState = {
  features: [],
  selectedFeatures: []
}

export interface FeatureSlice {
  features: FeatureNode[]
  selectedFeatures: any[]
  updateFeatures: (features: FeatureType[]) => void
  updateSelectedFeatures: (features: any) => void
  toggleFeatureVisible: (id: string) => void
}

export const createFeatureSlice: StateCreator<
  FeatureSlice,
  [],
  [],
  FeatureSlice
> = (set) => {
  return {
    ...initialFeatureState,
    updateFeatures: (features: FeatureType[]) => {
      const featureNodes: FeatureNode[] = features.map((feature) => ({
        ...feature,
        visible: true,
        selected: false
      }))
      set((state) => ({
        features: [...state.features, ...featureNodes]
      }))
    },
    updateSelectedFeatures: () =>
      set((state) => ({
        features: state.selectedFeatures
      })),
    toggleFeatureVisible: (id: string) =>
      set((state) => ({
        features: toggleNodeVisible(state.features, [id])
      }))
  }
}
