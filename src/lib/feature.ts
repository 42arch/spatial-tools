import {
  FeatureGroup,
  FeatureGroupMap,
  FeatureNode,
  FeatureType,
  GeometryType
} from '@/types'
import { flatMapDeep, get, uniq } from 'lodash-es'
import {
  DEFAULT_COLOR,
  DEFAULT_FILL_OPACITY,
  DEFAULT_STROKE_OPACITY,
  DEFAULT_STROKE_WIDTH
} from './style'
import {
  APP_PREFIX,
  COLOR_FIELD,
  FILL_FIELD,
  STROKE_FIELD,
  STYLE_FIELD,
  WIDTH_FIELD
} from './constants'
import { GeoJsonProperties } from 'geojson'

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

export function getFeatureTypes(features: Array<FeatureType>) {
  const types = uniq(
    flatMapDeep(features, (obj) => get(obj, 'geometry.type', []))
  ) as Array<GeometryType>
  return types
}

export function addDefaultStylePropertiesToFeature(feature: FeatureType) {
  function getValue(properties: GeoJsonProperties, key: string) {
    if (properties) {
      return properties[key]
    }
  }

  const properties = feature.properties
  switch (feature.geometry.type) {
    case 'Point':
    case 'MultiPoint':
      feature.properties = {
        ...properties,
        [COLOR_FIELD]: getValue(properties, COLOR_FIELD) || DEFAULT_COLOR
      }
      break
    case 'LineString':
    case 'MultiLineString':
      feature.properties = {
        ...feature.properties,
        [COLOR_FIELD]: getValue(properties, COLOR_FIELD) || DEFAULT_COLOR,
        [WIDTH_FIELD]:
          getValue(properties, WIDTH_FIELD) || DEFAULT_STROKE_WIDTH,
        [STROKE_FIELD]:
          getValue(properties, STROKE_FIELD) || DEFAULT_STROKE_OPACITY,
        [STYLE_FIELD]: getValue(properties, STYLE_FIELD) || [1000]
      }
      break
    case 'Polygon':
    case 'MultiPolygon':
      feature.properties = {
        ...feature.properties,
        [COLOR_FIELD]: getValue(properties, COLOR_FIELD) || DEFAULT_COLOR,
        [WIDTH_FIELD]:
          getValue(properties, WIDTH_FIELD) || DEFAULT_STROKE_WIDTH,
        [STROKE_FIELD]:
          getValue(properties, STROKE_FIELD) || DEFAULT_STROKE_OPACITY,
        [FILL_FIELD]: getValue(properties, FILL_FIELD) || DEFAULT_FILL_OPACITY,
        [STYLE_FIELD]: getValue(properties, STYLE_FIELD) || [1000]
      }
      break
  }

  return feature
}
