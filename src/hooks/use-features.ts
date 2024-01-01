import {
  featureGroupMapToList,
  flattenFeatureGroupsToNodes
} from '@/lib/feature'
import { useFeatureStore } from '@/store'
import { FeatureType } from '@/types'
import { useMemo } from 'react'

export const useFeatures = () => {
  const { selectedNodeIds, featureGroups, updateFeatureGroups } =
    useFeatureStore()

  const featureGroupList = featureGroupMapToList(featureGroups)

  const featureNodes = flattenFeatureGroupsToNodes(featureGroupList)

  const selectedFeatureNodes = useMemo(() => {
    return featureNodes.filter((node) => selectedNodeIds.includes(node.id))
  }, [featureNodes, selectedNodeIds])

  const selectedFeatures = useMemo(() => {
    return selectedFeatureNodes.map((node) => node.data)
  }, [selectedFeatureNodes])

  const getFeatureById = (id: string | number) => {
    return selectedFeatures.find((feature) => feature.id === id)
  }

  const topFeature = useMemo(() => {
    return selectedFeatures.length > 0 ? selectedFeatures[0] : null
  }, [selectedFeatures])

  const topFeaturePropertyList = useMemo(() => {
    return topFeature?.properties
      ? Object.entries(topFeature.properties).map(([keyName, value], idx) => ({
          id: String(idx + 1),
          keyName,
          value
        }))
      : []
  }, [topFeature])

  const updateTopFeature = (properties: { [key: string]: any }) => {
    if (topFeature) {
      const newFeature: FeatureType = {
        ...topFeature,
        properties
      }
      updateFeatureGroups([newFeature])
    }
  }

  const updateSelectedFeature = (feature: FeatureType) => {
    if (topFeature) {
      const newFeature: FeatureType = {
        ...feature
      }
      updateFeatureGroups([newFeature])
    }
  }

  return {
    selectedFeatureNodes,
    selectedFeatures,
    topFeature,
    featureGroupList,
    featureNodes,
    topFeaturePropertyList,
    updateTopFeature,
    updateSelectedFeature,
    getFeatureById
  }
}
