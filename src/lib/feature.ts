import { FeatureGroup, FeatureGroupMap, FeatureNode } from '@/types'

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

export const flattenFeatureGroupsToNodes = (featureGroups: FeatureGroupMap) => {
  const featureGroupList = Object.values(featureGroups)
  const featureNodes: Array<FeatureNode> = []
  featureGroupList.forEach((group) => {
    const nodeList = Object.values(group.data)
    nodeList.map((node) => {
      featureNodes.push(node)
    })
  })
  return featureNodes
}

type FeatureListGroup = {
  [K in keyof FeatureGroup]: K extends 'data'
    ? Array<FeatureNode>
    : FeatureGroup[K]
}

export const convertFeatureGroupsToTree = (featureGroups: FeatureGroupMap) => {
  const newGroupList: Array<FeatureListGroup> = []
  const featureGroupList = Object.values(featureGroups)
  featureGroupList.forEach((group) => {
    const newGroup: FeatureListGroup = {
      ...group,
      data: []
    }
    const nodeList = Object.values(group.data)
    nodeList.map((node) => {
      newGroup.data.push(node)
    })
    newGroupList.push(newGroup)
  })
  return newGroupList
}

export const getSelectedNodesFromFeatureTree = (
  featureTree: Array<FeatureListGroup>
) => {
  const selectedNodes: Array<FeatureNode> = []
  featureTree.forEach((group) => {
    group.data.forEach((node) => {
      if (node.selected) {
        selectedNodes.push(node)
      }
    })
  })
  return selectedNodes
}

export const getSelectedNodeIdsFromFeatureTree = (
  featureTree: Array<FeatureListGroup>
) => {
  const selectedNodes = getSelectedNodesFromFeatureTree(featureTree)
  return selectedNodes.map((node) => node.id)
}
