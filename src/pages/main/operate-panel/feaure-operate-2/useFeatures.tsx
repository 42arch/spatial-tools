import { useFeatureStore } from '@/store'

export const useFeatures = () => {
  const { selectedNodeIds, featureNodes, updateFeatureNodes } =
    useFeatureStore()
  const selectedFeatureNodes = featureNodes.filter((node) =>
    selectedNodeIds.includes(node.id)
  )
  const selectedFeatures = featureNodes.map((node) => node.data)

  const getFeatureById = (id: string | number) => {
    return selectedFeatures.find((feature) => feature.id === id)
  }

  return {
    selectedFeatureNodes,
    selectedFeatures,
    getFeatureById
  }
}
