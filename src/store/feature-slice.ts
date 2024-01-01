import { nanoid } from 'nanoid'
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
      data: {}
    }
  },
  selectedFeatureNodeIds: []
  // invisibleNodeIds: []
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
  selectedFeatureNodeIds: Array<string>
  // invisibleNodeIds: Array<string>
  // selectedNodeIds: Array<string>
  // updateSelectedNodeIds: (ids: Array<string>, isAppend: boolean) => void
  // updateInvisibleNodeIds: (ids: Array<string>, isAppend: boolean) => void
  // updateFeatureNodes: (features: FeatureType[]) => void
  toggleFeatureNodesSelected: (groupId: string, nodeIds: Array<string>) => void
  resetFeatureNodesSelected: () => void
  toggleFeatureNodeVisible: (groupId: string, nodeId: string) => void
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

    toggleFeatureNodesSelected(groupId: string, ids: Array<string>) {
      set((state) => {
        ids.forEach((id) => {
          state.featureGroups[groupId].data[id].selected =
            !state.featureGroups[groupId].data[id].selected

          if (state.featureGroups[groupId].data[id].selected) {
            state.selectedFeatureNodeIds.push(id)
          }
        })
      })
    },

    resetFeatureNodesSelected() {
      set((state) => {
        const groupIds = Object.keys(state.featureGroups)
        state.selectedFeatureNodeIds.forEach((id) => {
          groupIds.forEach((groupId) => {
            state.featureGroups[groupId].data[id].selected = false
          })
        })

        state.selectedFeatureNodeIds = []
      })
    },

    toggleFeatureNodeVisible(groupId: string, id: string) {
      set((state) => {
        state.featureGroups[groupId].data[id].visible =
          !state.featureGroups[groupId].data[id].visible
      })
    },

    addNewFeatureGroup(label: string) {
      set((state) => {
        const newGroup: FeatureGroup = {
          id: nanoid(),
          label: label,
          data: {}
        }
        state.featureGroups[label] = newGroup
      })
    },

    updateFeatureGroups: (features: FeatureType[]) => {
      set((state) => {
        features.forEach((feature) => {
          if (feature.id) {
            const featureNode = {
              id: String(feature.id),
              groupId: state.currentGroupId,
              data: feature,
              visible: true,
              selected: false
            }
            state.featureGroups[state.currentGroupId].data[feature.id] =
              featureNode
          }
        })

        // const oldNodes = state.featureGroups[state.currentGroupId].data
        // const newNodes: FeatureNode[] = features.map((feature) => ({
        //   id: String(feature.id),
        //   groupId: state.currentGroupId,
        //   data: feature,
        //   visible: true,
        //   selected: false
        // }))
        // const mergedNodes = mergeFeatureNodes(oldNodes, newNodes)
        // state.featureGroups[state.currentGroupId].data = mergedNodes
      })
    }
  }
}
