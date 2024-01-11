import { FeatureGroup, FeatureGroups, FeatureType, GeometryType } from '@/types'
import { flatMapDeep, get, uniq } from 'lodash-es'
import {
  DEFAULT_COLOR,
  DEFAULT_FILL_OPACITY,
  DEFAULT_STROKE_OPACITY,
  DEFAULT_STROKE_WIDTH
} from './style'
import {
  COLOR_FIELD,
  FILL_FIELD,
  STROKE_FIELD,
  STYLE_FIELD,
  WIDTH_FIELD
} from './constants'
import { GeoJsonProperties } from 'geojson'

export const getAllFeatures = (featureGroups: FeatureGroups) => {
  const features: Array<FeatureType> = []
  for (const groupId in featureGroups) {
    const group = featureGroups[groupId]
    for (const id in group.data) {
      const feature = group.data[id]
      features.push(feature)
    }
  }
  return features
}

type FeatureListGroup = {
  [K in keyof FeatureGroup]: K extends 'data'
    ? Array<FeatureType>
    : FeatureGroup[K]
}

export const featureGroupsToList = (featureGroups: FeatureGroups) => {
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

export function getFeatureTypes(features: Array<FeatureType>) {
  const types = uniq(
    flatMapDeep(features, (obj) => get(obj, 'geometry.type', []))
  ) as Array<GeometryType>
  return types
}

export function setStyleProperties(feature: FeatureType) {
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
