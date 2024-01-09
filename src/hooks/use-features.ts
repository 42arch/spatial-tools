import {
  convertFeatureGroupsToTree,
  flattenFeatureGroupsToNodes,
  getFeatureTypes
} from '@/lib/feature'
import { useFeatureStore } from '@/store'
import { FeatureType } from '@/types'
import { useMemo } from 'react'

export const useFeatures = () => {
  const { featureGroups, setFeatureGroups, selectedFeatureNodeIds } =
    useFeatureStore()

  const featureNodes = useMemo(() => {
    return flattenFeatureGroupsToNodes(featureGroups)
  }, [featureGroups])

  // const featureTree = convertFeatureGroupsToTree(featureGroups)

  const featureTree = useMemo(() => {
    return convertFeatureGroupsToTree(featureGroups)
  }, [featureGroups])

  const selectedFeatureNodes = useMemo(() => {
    return featureNodes.filter((node) =>
      selectedFeatureNodeIds.includes(node.id)
    )
  }, [featureNodes, selectedFeatureNodeIds])

  const selectedFeatures = useMemo(() => {
    return selectedFeatureNodes.map((node) => node.data)
  }, [selectedFeatureNodes])

  const topFeature = useMemo(() => {
    return selectedFeatures.length > 0 ? selectedFeatures[0] : null
  }, [selectedFeatures])

  const selectedFeatureTypes = getFeatureTypes(selectedFeatures)

  const updateSelectedFeature = (features: Array<FeatureType>) => {
    features.forEach((feature) => {
      const featureNode = selectedFeatureNodes.find(
        (node) => node.id === feature.id
      )
      if (featureNode) {
        setFeatureGroups([feature], featureNode.groupId)
      }
    })
  }

  return {
    selectedFeatureNodes,
    selectedFeatureNodeIds,
    selectedFeatureTypes,
    selectedFeatures,
    topFeature,
    featureTree,
    featureNodes,
    updateSelectedFeature
  }
}
