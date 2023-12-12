import { useFeatureStore } from '@/store'
import { FeatureType } from '@/types'
import { useMemo } from 'react'

export const useSelectedFeatures = () => {
  const { selectedNodeIds, featureNodes, updateFeatureNodes } =
    useFeatureStore()

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
      updateFeatureNodes([newFeature])
    }
  }

  const updateSelectedFeature = (feature: FeatureType) => {
    if (topFeature) {
      const newFeature: FeatureType = {
        ...feature
      }
      updateFeatureNodes([newFeature])
    }
  }

  return {
    selectedFeatureNodes,
    selectedFeatures,
    topFeature,
    topFeaturePropertyList,
    updateTopFeature,
    updateSelectedFeature,
    getFeatureById
  }
}
