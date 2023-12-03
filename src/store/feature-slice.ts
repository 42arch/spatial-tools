import { toggleNodeVisible } from '@/lib/feature'
import { FeatureType, FeatureNode } from '@/types'
import { StateCreator } from 'zustand'

const initialFeatureState = {
  featureNodes: [],
  selectedNodeIds: []
  // selectedFeatureNodes: []
}

export interface FeatureSlice {
  featureNodes: FeatureNode[]
  selectedNodeIds: string[]
  updateSelectedNodeIds: (ids: string[]) => void
  updateFeatureNodes: (features: FeatureType[]) => void
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
    updateSelectedNodeIds: (ids: string[]) =>
      set((state) => ({
        selectedNodeIds: ids
      })),
    updateFeatureNodes: (features: FeatureType[]) => {
      set((state) => {
        const oldNodes = state.featureNodes
        const newNodes: FeatureNode[] = features.map((feature) => ({
          id: String(feature.id),
          data: feature,
          visible: true,
          selected: false
        }))
        const mergedNodes = oldNodes.map((oldNode) => {
          const newNode = newNodes.find((newNode) => newNode.id === oldNode.id)
          return newNode ? { ...oldNode, ...newNode } : oldNode
        })
        newNodes.forEach((newNode) => {
          if (!oldNodes.find((oldNode) => oldNode.id === newNode.id)) {
            mergedNodes.push(newNode)
          }
        })

        return {
          featureNodes: mergedNodes
        }
      })
    },
    toggleFeatureNodeVisible: (id: string) =>
      set((state) => ({
        featureNodes: toggleNodeVisible(state.featureNodes, [id])
      }))
  }
}
