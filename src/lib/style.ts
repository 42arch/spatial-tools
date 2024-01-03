import { uniq, map, uniqBy, flatMapDeep, get } from 'lodash-es'
import { FeatureType, GeometryType } from '@/types'

export const STYLE_PREFIX = 'st'

type StyleValueType = 'color' | 'number' | 'list' | 'symbol'

export type StyleProperty = {
  id: string
  // name: string
  // checked: boolean
  type: GeometryType
  valueType: StyleValueType
  value: StyleValue
}

export const STROKE_STYLES: Array<string> = ['Solid', 'Dashed', 'Dotted']

export const POINT_STYLE_PROPERTIES: Array<StyleProperty> = [
  {
    id: 'point-color',
    name: `${STYLE_PREFIX}:color`,
    checked: false,
    type: 'color',
    value: '#af1790'
  },
  {
    id: 'point-color',
    name: `${STYLE_PREFIX}:symbol`,
    checked: false,
    type: 'color',
    value: '#af1790'
  }
]

export const LINESTRING_STYLE_PROPERTIES: Array<StyleProperty> = [
  {
    id: 'linestring-color',
    name: `${STYLE_PREFIX}:color`,
    checked: false,
    type: 'color',
    value: '#af1790'
  },
  {
    id: 'linestring-stroke-opacity',
    name: `${STYLE_PREFIX}:strokeOpacity`,
    checked: false,
    type: 'number',
    value: 1
  },
  {
    id: 'linestring-stroke-style',
    name: `${STYLE_PREFIX}:strokeStyle`,
    checked: false,
    type: 'number',
    value: 'Solid'
  },
  {
    id: 'linestring-stroke-width',
    name: `${STYLE_PREFIX}:strokeWidth`,
    checked: false,
    type: 'number',
    value: 2
  }
]

export const POLYGON_STYLE_PROPERTIES: Array<StyleProperty> = [
  {
    id: 'polygon-color',
    name: `${STYLE_PREFIX}:color`,
    checked: false,
    type: 'color',
    value: '#af1790'
  },
  {
    id: 'polygon-fill-opacity',
    name: `${STYLE_PREFIX}:fillOpacity`,
    checked: false,
    type: 'number',
    value: 1
  },
  {
    id: 'polygon-stroke-opacity',
    name: `${STYLE_PREFIX}:strokeOpacity`,
    checked: false,
    type: 'number',
    value: 1
  },
  {
    id: 'polygon-stroke-style',
    name: `${STYLE_PREFIX}:strokeStyle`,
    checked: false,
    type: 'number',
    value: 'Solid'
  },
  {
    id: 'polygon-stroke-width',
    name: `${STYLE_PREFIX}:strokeWidth`,
    checked: false,
    type: 'number',
    value: 2
  }
]

type StrokeStyle = 'Solid' | 'Dashed' | 'Dotted'

type StyleValue = string | number

type PointStyleId = 'point-color' | 'point-symbol'
type LineStringStyleId =
  | 'linestring-color'
  | 'linestring-stroke-opacity'
  | 'linestring-stroke-style'
  | 'linestring-stroke-width'

type PolygonStyleId =
  | 'polygon-color'
  | 'polygon-fill-opacity'
  | 'polygon-stroke-opacity'
  | 'polygon-stroke-style'
  | 'polygon-stroke-width'

type StyleId = PointStyleId | LineStringStyleId | PolygonStyleId

const DEFAULT_COLOR = '#af1790'
const DEFAULT_SYMBOL = 'dot'
const DEFAULT_STROKE_OPACITY = 1
const DEFAULT_STROKE_STYLE: StrokeStyle = 'Solid'
const DEFAULT_STROKE_WIDTH = 1
const DEFAULT_FILL_OPACITY = 0.6

const POINT_STYLE_IDS: Array<PointStyleId> = ['point-color', 'point-symbol']
const LINESTRING_STYLE_IDS: Array<LineStringStyleId> = [
  'linestring-color',
  'linestring-stroke-opacity',
  'linestring-stroke-style',
  'linestring-stroke-width'
]
const POLYGON_STYLE_IDS: Array<PolygonStyleId> = [
  'polygon-color',
  'polygon-fill-opacity',
  'polygon-stroke-opacity',
  'polygon-stroke-style',
  'polygon-stroke-width'
]

const DEFAULT_STYLE_MAP: Record<StyleId, string | number> = {
  'point-color': DEFAULT_COLOR,
  'point-symbol': DEFAULT_SYMBOL,
  'linestring-color': DEFAULT_COLOR,
  'linestring-stroke-opacity': DEFAULT_STROKE_OPACITY,
  'linestring-stroke-style': DEFAULT_STROKE_STYLE,
  'linestring-stroke-width': DEFAULT_STROKE_WIDTH,
  'polygon-color': DEFAULT_COLOR,
  'polygon-fill-opacity': DEFAULT_FILL_OPACITY,
  'polygon-stroke-opacity': DEFAULT_FILL_OPACITY,
  'polygon-stroke-style': DEFAULT_STROKE_STYLE,
  'polygon-stroke-width': DEFAULT_STROKE_WIDTH
}

export function generateStyleProperties(features: Array<FeatureType>) {
  function setStyleValuesMap(
    styleValuesMap: Record<string, Array<StyelValue>>,
    properties: { [x: string]: any },
    styleId: string,
    styleName: string
  ) {
    if (
      properties[styleName] &&
      !styleValuesMap[styleId].includes(properties[styleName])
    ) {
      styleValuesMap[styleId].push(properties[styleName])
    }
  }

  function getStyleValues(features: Array<FeatureType>) {
    const styleValuesMap: Record<string, Array<StyelValue>> = {
      'point-color': [],
      'point-symbol': [],
      'linestring-color': [],
      'linestring-stroke-opacity': [],
      'linestring-stroke-style': [],
      'linestring-stroke-width': [],
      'polygon-color': [],
      'polygon-fill-opacity': [],
      'polygon-stroke-opacity': [],
      'polygon-stroke-style': [],
      'polygon-stroke-width': []
    }

    features.forEach((feature) => {
      const properties = { ...feature.properties }
      switch (feature.geometry.type) {
        case 'Point':
        case 'MultiPoint':
          setStyleValuesMap(
            styleValuesMap,
            properties,
            'point-color',
            `${STYLE_PREFIX}:color`
          )
          setStyleValuesMap(
            styleValuesMap,
            properties,
            'point-symbol',
            `${STYLE_PREFIX}:symbol`
          )
          break
        case 'LineString':
        case 'MultiLineString':
          setStyleValuesMap(
            styleValuesMap,
            properties,
            'linestring-color',
            `${STYLE_PREFIX}:color`
          )
          setStyleValuesMap(
            styleValuesMap,
            properties,
            'linestring-stroke-opacity',
            `${STYLE_PREFIX}:strokeOpacity`
          )
          setStyleValuesMap(
            styleValuesMap,
            properties,
            'linestring-stroke-style',
            `${STYLE_PREFIX}:strokeStyle`
          )
          setStyleValuesMap(
            styleValuesMap,
            properties,
            'linestring-stroke-width',
            `${STYLE_PREFIX}:strokeWidth`
          )

          break

        case 'Polygon':
        case 'MultiPolygon':
          setStyleValuesMap(
            styleValuesMap,
            properties,
            'polygon-color',
            `${STYLE_PREFIX}:color`
          )
          setStyleValuesMap(
            styleValuesMap,
            properties,
            'polygon-fill-opacity',
            `${STYLE_PREFIX}:fillOpacity`
          )
          setStyleValuesMap(
            styleValuesMap,
            properties,
            'polygon-stroke-opacity',
            `${STYLE_PREFIX}:strokeOpacity`
          )
          setStyleValuesMap(
            styleValuesMap,
            properties,
            'polygon-stroke-style',
            `${STYLE_PREFIX}:strokeStyle`
          )
          setStyleValuesMap(
            styleValuesMap,
            properties,
            'polygon-stroke-width',
            `${STYLE_PREFIX}:strokeWidth`
          )
          break
        default:
          break
      }
    })

    console.log(66666, styleValuesMap)
  }

  function getValueType(styleId: StyleId): StyleValueType {
    switch (styleId) {
      case 'linestring-color':
      case 'point-color':
      case 'polygon-color':
        return 'color'
      case 'linestring-stroke-opacity':
      case 'polygon-stroke-opacity':
      case 'polygon-fill-opacity':
      case 'linestring-stroke-width':
      case 'polygon-stroke-width':
        return 'number'
      case 'linestring-stroke-style':
      case 'polygon-stroke-style':
        return 'list'
      default:
        return 'symbol'
    }
  }

  function getValue(valueList: Array<StyleValue>, styleId: StyleId) {
    if (valueList.length > 1) {
      return 'mixed'
    } else if (valueList.length < 1) {
      return DEFAULT_STYLE_MAP[styleId]
    } else {
      return valueList[0]
    }
  }

  function getStyleList(
    features: Array<FeatureType>,
    styleValuesMap: Record<string, Array<StyleValue>>
  ) {
    const styleList: Array<StyleProperty> = []
    const types = uniq(
      flatMapDeep(features, (obj) => get(obj, 'geometry.type', []))
    ) as Array<GeometryType>

    if (types.includes('Point') || types.includes('MultiPoint')) {
      POINT_STYLE_IDS.forEach((key) => {
        if (styleValuesMap[key].length > 0) {
          styleList.push({
            id: key,
            type: 'Point',
            valueType: getValueType(key),
            value: getValue(styleValuesMap[key], key)
          })
        }
      })
    }
  }

  getStyleValues(features)
}
