import { mergeFeatureNodes } from '@/lib/feature'
import {
  FeatureType,
  FeatureNode,
  FeatureGroupMap,
  FeatureGroup
} from '@/types'
import { StateCreator } from 'zustand'

const DEFAULT_GROUP_LABEL = 'default'

const initialFeatureState = {
  currentGroupLabel: DEFAULT_GROUP_LABEL,
  featureGroups: {
    default: {
      label: 'default',
      data: []
    }
  },
  selectedNodeIds: []
  // selectedFeatureNodes: []
}

export interface FeatureSlice {
  currentGroupLabel: string
  setCurrentGroupLabel: (label: string) => void
  featureGroups: FeatureGroupMap
  updateFeatureGroups: (features: Array<FeatureType>) => void
  addNewFeatureGroup: (label: string) => void
  // featureGroupList: Array<FeatureGroup>
  // featureNodes: FeatureNode[]
  selectedNodeIds: string[]
  updateSelectedNodeIds: (ids: string[]) => void
  // updateFeatureNodes: (features: FeatureType[]) => void
  // toggleFeatureNodeVisible: (id: string) => void
}

export const createFeatureSlice: StateCreator<
  FeatureSlice,
  [['zustand/immer', never]],
  [['zustand/immer', never]],
  FeatureSlice
> = (set) => {
  return {
    ...initialFeatureState,
    setCurrentGroupLabel: (label: string) =>
      set(() => ({
        currentGroupLabel: label
      })),
    updateSelectedNodeIds: (ids: string[]) =>
      set((state) => ({
        selectedNodeIds: ids
      })),
    addNewFeatureGroup(label: string) {
      set((state) => {
        const newGroup: FeatureGroup = {
          label: label,
          data: []
        }
        state.featureGroups[label] = newGroup
      })
    },

    updateFeatureGroups: (features: FeatureType[]) => {
      set((state) => {
        const oldNodes = state.featureGroups[state.currentGroupLabel].data

        const newNodes: FeatureNode[] = features.map((feature) => ({
          id: String(feature.id),
          group: state.currentGroupLabel,
          data: feature,
          visible: true,
          selected: false
        }))
        const mergedNodes = mergeFeatureNodes(oldNodes, newNodes)
        state.featureGroups[state.currentGroupLabel].data = mergedNodes
      })
    }
  }
}
