import { featureGroupsToList, getAllFeatures } from '@/lib/feature'
import { useFeatureStore } from '@/store'
import { useMemo } from 'react'

export const useFeatures = () => {
  const {
    featureGroups,
    addFeatures,
    deleteFeatures,
    updateFeatures,
    addNewFeatureGroup,
    activatedGroupId,
    setActivatedGroupId,
    selectedGroupIds,
    setSelectedGroupIds,
    hiddenGroupIds,
    toggleGroupVisibility,
    selectedFeatureIds,
    setSelectedFeatureIds,
    hiddenFeatureIds,
    toggleFeatureVisibility
  } = useFeatureStore()

  const features = useMemo(() => {
    return getAllFeatures(featureGroups)
  }, [featureGroups])

  const featureList = useMemo(() => {
    return featureGroupsToList(featureGroups)
  }, [featureGroups])

  const selectedFeatures = useMemo(() => {
    return features.filter(
      (feature) => feature.id && selectedFeatureIds.includes(feature.id)
    )
  }, [features, selectedFeatureIds])

  return {
    features,
    featureList,
    selectedFeatures,
    addFeatures,
    deleteFeatures,
    updateFeatures,
    addNewFeatureGroup,
    activatedGroupId,
    setActivatedGroupId,
    selectedGroupIds,
    setSelectedGroupIds,
    hiddenGroupIds,
    toggleGroupVisibility,
    selectedFeatureIds,
    setSelectedFeatureIds,
    hiddenFeatureIds,
    toggleFeatureVisibility
  }
}
