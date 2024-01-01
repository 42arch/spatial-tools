import { nanoid } from 'nanoid'
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
  currentGroupId: DEFAULT_GROUP_LABEL,
  featureGroups: {
    default: {
      id: 'default',
      label: 'default',
      data: []
    }
  },
  selectedNodeIds: []
  // selectedFeatureNodes: []
}

export interface FeatureSlice {
  currentGroupId: string
  setCurrentGroupId: (id: string) => void
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
    setCurrentGroupId: (id: string) =>
      set(() => ({
        currentGroupId: id
      })),
    updateSelectedNodeIds: (ids: string[]) =>
      set((state) => ({
        selectedNodeIds: ids
      })),
    addNewFeatureGroup(label: string) {
      set((state) => {
        const newGroup: FeatureGroup = {
          id: nanoid(),
          label: label,
          data: []
        }
        state.featureGroups[label] = newGroup
      })
    },

    updateFeatureGroups: (features: FeatureType[]) => {
      set((state) => {
        const oldNodes = state.featureGroups[state.currentGroupId].data

        const newNodes: FeatureNode[] = features.map((feature) => ({
          id: String(feature.id),
          groupId: state.currentGroupId,
          data: feature,
          visible: true,
          selected: false
        }))
        const mergedNodes = mergeFeatureNodes(oldNodes, newNodes)
        state.featureGroups[state.currentGroupId].data = mergedNodes
      })
    }
  }
}
