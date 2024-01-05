import { StateCreator } from 'zustand'
import { nanoid } from 'nanoid'
import { FeatureType, FeatureGroupMap, FeatureGroup } from '@/types'

const DEFAULT_GROUP_LABEL = 'Untitled'
const initialFeatureState = {
  currentGroupId: DEFAULT_GROUP_LABEL,
  featureGroups: {
    [DEFAULT_GROUP_LABEL]: {
      id: DEFAULT_GROUP_LABEL,
      label: DEFAULT_GROUP_LABEL,
      data: {}
    }
  },
  selectedFeatureNodeIds: []
}

export interface FeatureSlice {
  currentGroupId: string
  setCurrentGroupId: (id: string) => void
  featureGroups: FeatureGroupMap
  setFeatureGroups: (features: Array<FeatureType>, groupLabel?: string) => void
  addNewFeatureGroup: (label: string) => void
  selectedFeatureNodeIds: Array<string>
  setSelectedFeatureNodeIds: (ids: Array<string>) => void
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

    setSelectedFeatureNodeIds: (ids: Array<string>) =>
      set((state) => {
        state.selectedFeatureNodeIds = ids
      }),

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
        state.featureGroups[newGroup.id] = newGroup
      })
    },

    setFeatureGroups: (features: FeatureType[], groupId?: string) => {
      set((state) => {
        const currentGroupId = groupId || state.currentGroupId
        // if (groupLabel) {
        //   const newGroup: FeatureGroup = {
        //     id: nanoid(),
        //     label: groupLabel,
        //     data: {}
        //   }
        //   state.featureGroups[newGroup.id] = newGroup
        //   groupId = newGroup.id
        // }
        features.forEach((feature) => {
          const featureId = feature.id ? String(feature.id) : nanoid()
          feature.id = featureId
          const featureNode = {
            id: featureId,
            groupId: currentGroupId,
            data: feature,
            visible: true,
            selected: false
          }
          state.featureGroups[currentGroupId].data[featureId] = featureNode
        })
      })
    }
  }
}
