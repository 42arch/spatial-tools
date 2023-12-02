import { toggleNodeVisible } from '@/lib/feature'
import { FeatureType, FeatureNode } from '@/types'
import { StateCreator } from 'zustand'

const initialFeatureState = {
  featureNodes: [],
  selectedFeatureNodes: []
}

export interface FeatureSlice {
  featureNodes: FeatureNode[]
  selectedFeatureNodes: any[]
  updateFeatureNodes: (featureNodes: FeatureType[]) => void
  updateSelectedFeatureNodes: (featureNodes: any) => void
  toggleFeatureNodeVisible: (id: string) => void
}

export const createFeatureSlice: StateCreator<
  FeatureSlice,
  [],
  [],
  FeatureSlice
> = (set) => {
  return {
    ...initialFeatureState,
    updateFeatureNodes: (features: FeatureType[]) => {
      const featureNodes: FeatureNode[] = features.map((feature) => ({
        id: String(feature.id),
        data: feature,
        visible: true,
        selected: false
      }))
      set((state) => ({
        featureNodes: [...state.featureNodes, ...featureNodes]
      }))
    },
    updateSelectedFeatureNodes: () =>
      set((state) => ({
        featureNodes: state.selectedFeatureNodes
      })),
    toggleFeatureNodeVisible: (id: string) =>
      set((state) => ({
        featureNodes: toggleNodeVisible(state.featureNodes, [id])
      }))
  }
}
