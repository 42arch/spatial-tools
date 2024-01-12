import { StateCreator } from 'zustand'
import { nanoid } from 'nanoid'
import { FeatureType, FeatureGroup, FeatureGroups, FeatureId } from '@/types'
import { setStyleProperties } from '@/lib/feature'

const DEFAULT_GROUP: FeatureGroup = {
  id: 'default',
  name: 'Default',
  selected: false,
  hidden: false,
  data: {}
}
const initialFeatureState = {
  activatedGroupId: DEFAULT_GROUP.id,
  featureGroups: { [DEFAULT_GROUP.id]: DEFAULT_GROUP },
  selectedGroupIds: [],
  hiddenGroupIds: [],
  hiddenFeatureIds: [],
  selectedFeatureIds: []
}

export interface FeatureSlice {
  activatedGroupId: string
  setActivatedGroupId: (id: string) => void
  featureGroups: FeatureGroups
  addNewFeatureGroup: (name: string) => void
  addFeatures: (features: Array<FeatureType>, groupId?: string) => void
  deleteFeatures: (featureIds: Array<FeatureId>) => void
  updateFeatures: (features: Array<FeatureType>) => void
  selectedGroupIds: Array<string>
  setSelectedGroupIds: (ids: Array<string>) => void
  hiddenGroupIds: Array<string>
  toggleGroupVisibility: (id: string) => void
  selectedFeatureIds: Array<FeatureId>
  setSelectedFeatureIds: (ids: Array<FeatureId>) => void
  hiddenFeatureIds: Array<FeatureId>
  toggleFeatureVisibility: (id: FeatureId) => void
}

export const createFeatureSlice: StateCreator<
  FeatureSlice,
  [['zustand/immer', never]],
  [['zustand/immer', never]],
  FeatureSlice
> = (set) => {
  return {
    ...initialFeatureState,
    setActivatedGroupId: (id: string) =>
      set((state) => {
        state.activatedGroupId = id
      }),
    addNewFeatureGroup: (name: string) =>
      set((state) => {
        const newGroup: FeatureGroup = {
          id: nanoid(),
          name: name,
          selected: false,
          hidden: false,
          data: {}
        }
        state.featureGroups[newGroup.id] = newGroup
        state.activatedGroupId = newGroup.id
      }),
    addFeatures: (features: Array<FeatureType>, groupId?: string) =>
      set((state) => {
        const currentGroupId = groupId || state.activatedGroupId
        const group = state.featureGroups[currentGroupId]
        if (group) {
          for (const feature of features) {
            feature.id = feature.id || nanoid()
            if (feature.id) {
              group.data[feature.id] = setStyleProperties(feature)
            }
          }
        }
      }),
    deleteFeatures: (featureIds: Array<FeatureId>) =>
      set((state) => {
        for (const groupId in state.featureGroups) {
          const group = state.featureGroups[groupId]
          if (group) {
            for (const featureId in group.data) {
              if (featureIds.includes(featureId)) {
                delete group.data[featureId]
              }
            }
          }
        }
      }),
    updateFeatures: (features: Array<FeatureType>) =>
      set((state) => {
        for (const groupId in state.featureGroups) {
          const group = state.featureGroups[groupId]
          if (group) {
            for (const feature of features) {
              if (feature.id) {
                const existedFeature = group.data[feature.id]
                if (existedFeature) {
                  group.data[feature.id] = feature
                }
              }
            }
          }
        }
      }),
    setSelectedGroupIds: (groupIds: Array<string>) =>
      set((state) => {
        state.selectedGroupIds = groupIds
      }),
    setSelectedFeatureIds: (featureIds: Array<FeatureId>) =>
      set((state) => {
        state.selectedFeatureIds = featureIds
      }),
    toggleGroupVisibility: (groupId: string) =>
      set((state) => {
        const group = state.featureGroups[groupId]
        if (group) {
          group.hidden = !group.hidden
          if (state.hiddenGroupIds.indexOf(group.id) === -1) {
            state.hiddenGroupIds.push(groupId)
          } else {
            state.hiddenGroupIds = state.hiddenGroupIds.filter(
              (id) => id !== groupId
            )
          }
        }
      }),
    toggleFeatureVisibility: (featureId: FeatureId) =>
      set((state) => {
        if (state.hiddenFeatureIds.indexOf(featureId) === -1) {
          state.hiddenFeatureIds.push(featureId)
        } else {
          state.hiddenFeatureIds = state.hiddenFeatureIds.filter(
            (id) => id !== featureId
          )
        }
      })
  }
}
