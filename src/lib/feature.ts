import { FeatureNode } from '@/types'

export const toggleNodeVisible = (
  nodes: FeatureNode[],
  ids: string[]
): FeatureNode[] => {
  return nodes.map((node) => {
    if (ids.includes(String(node.id))) {
      return { ...node, visible: !node.visible }
    } else if (node.children && node.children.length > 0) {
      return {
        ...node,
        children: toggleNodeVisible(node.children, ids)
      }
    } else {
      return node
    }
  })
}

export const updateFeatureNodes = (
  nodes: FeatureNode[],
  targetId: string,
  newData: Partial<FeatureNode>
): FeatureNode[] => {
  return nodes.map((node) => {
    if (node.id === targetId) {
      return { ...node, ...newData }
    } else if (node.children && node.children.length > 0) {
      return {
        ...node,
        children: updateFeatureNodes(node.children, targetId, newData)
      }
    } else {
      return node
    }
  })
}
