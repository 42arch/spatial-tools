import {
  FeatureGroup,
  FeatureGroupMap,
  FeatureNode,
  FeatureType
} from '@/types'

export const mergeFeatureNodes = (
  oldNodes: Array<FeatureNode>,
  newNodes: Array<FeatureNode>
) => {
  const updatedNodes = oldNodes.map((oldNode) => {
    const newNode = newNodes.find((node) => node.id === oldNode.id)
    if (newNode) {
      return { ...oldNode, ...newNode }
    }
    return oldNode
  })
  const addedNodes = newNodes.filter(
    (newNode) => !oldNodes.some((oldNode) => oldNode.id === newNode.id)
  )

  return [...updatedNodes, ...addedNodes]
}

export const updateFeatureGroup = (
  featureGroup: FeatureGroup | undefined,
  features: Array<FeatureType>
): FeatureGroup => {
  const group: FeatureGroup = featureGroup
    ? featureGroup
    : { label: 'default', data: [] }

  const newNodes: FeatureNode[] = features.map((feature) => ({
    id: String(feature.id),
    group: group.label,
    data: feature,
    visible: true,
    selected: false
  }))
  const mergedNodes = group.data.map((oldNode) => {
    const newNode = newNodes.find((newNode) => newNode.id === oldNode.id)
    return newNode ? { ...oldNode, ...newNode } : oldNode
  })
  newNodes.forEach((newNode) => {
    if (!group.data.find((oldNode) => oldNode.id === newNode.id)) {
      mergedNodes.push(newNode)
    }
  })

  return {
    ...group,
    data: mergedNodes
  }
}

export const flattenFeatureGroupsToNodes = (
  featureGroups: Array<FeatureGroup>
) => {
  const featureNodes: Array<FeatureNode> = []
  featureGroups.forEach((group) => {
    group.data.map((node) => {
      featureNodes.push(node)
    })
  })
  return featureNodes
}

export const featureGroupMapToList = (featureGroups: FeatureGroupMap) => {
  return Object.values(featureGroups)
}
