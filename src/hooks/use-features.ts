import {
  convertFeatureGroupsToTree,
  flattenFeatureGroupsToNodes,
  getSelectedNodesFromFeatureTree
} from '@/lib/feature'
import { useFeatureStore } from '@/store'
import { FeatureType } from '@/types'
import { useMemo } from 'react'

export const useFeatures = () => {
  const { featureGroups, setFeatureGroups, selectedFeatureNodeIds } =
    useFeatureStore()

  const featureNodes = flattenFeatureGroupsToNodes(featureGroups)

  const featureTree = convertFeatureGroupsToTree(featureGroups)

  const selectedFeatureNodes = getSelectedNodesFromFeatureTree(featureTree)

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
      setFeatureGroups([newFeature])
    }
  }

  const updateSelectedFeature = (feature: FeatureType) => {
    if (topFeature) {
      const newFeature: FeatureType = {
        ...feature
      }
      setFeatureGroups([newFeature])
    }
  }

  return {
    selectedFeatureNodes,
    selectedFeatureNodeIds,
    selectedFeatures,
    topFeature,
    featureTree,
    featureNodes,
    topFeaturePropertyList,
    updateTopFeature,
    updateSelectedFeature,
    getFeatureById
  }
}