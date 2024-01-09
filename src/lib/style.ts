import { AppGeometryType, FeatureType, GeometryType } from '@/types'
import { getFeatureTypes } from './feature'
import { APP_PREFIX } from './constants'

export type StrokeStyle = 'Solid' | 'Dashed' | 'Dotted'

export const STROKE_STYLE_LABELS: Array<StrokeStyle> = [
  'Solid',
  'Dashed',
  'Dotted'
]

export const STROKE_STYLES: Array<{
  label: StrokeStyle
  value: Array<number>
}> = [
  {
    label: 'Solid',
    value: [1000]
  },
  {
    label: 'Dashed',
    value: [4, 2]
  },
  {
    label: 'Dotted',
    value: [0, 2]
  }
]

export type StyleValue = any

export type PointStyleId = 'point-color' | 'point-symbol'
export type LineStringStyleId =
  | 'linestring-color'
  | 'linestring-stroke-opacity'
  | 'linestring-stroke-style'
  | 'linestring-stroke-width'

export type PolygonStyleId =
  | 'polygon-color'
  | 'polygon-fill-opacity'
  | 'polygon-stroke-opacity'
  | 'polygon-stroke-style'
  | 'polygon-stroke-width'

export type StyleId = PointStyleId | LineStringStyleId | PolygonStyleId

export type StyleObject = Partial<Record<StyleId, StyleValue>>

// type StyleKeyGen<T extends string, U extends string> = `${T}${U}`

export type StyleKey =
  | 'color'
  | 'stroke'
  | 'width'
  | 'style'
  | 'fill'
  | 'symbol'

export type StyleGroupProps = { has: boolean } & Partial<
  Record<StyleKey, StyleValue>
>
export type StyleGroup = Record<AppGeometryType, StyleGroupProps>

export const DEFAULT_COLOR = '#af1790'
export const DEFAULT_SYMBOL = 'dot'
export const DEFAULT_STROKE_OPACITY = 1
export const DEFAULT_STROKE_STYLE: StrokeStyle = 'Solid'
export const DEFAULT_STROKE_WIDTH = 2
export const DEFAULT_FILL_OPACITY = 0.6

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
  'polygon-stroke-opacity': DEFAULT_STROKE_OPACITY,
  'polygon-stroke-style': DEFAULT_STROKE_STYLE,
  'polygon-stroke-width': DEFAULT_STROKE_WIDTH
}

function getStyleKey(styleId: StyleId): StyleKey {
  switch (styleId) {
    case 'linestring-color':
    case 'point-color':
    case 'polygon-color':
      return 'color'
    case 'linestring-stroke-opacity':
    case 'polygon-stroke-opacity':
      return 'stroke'
    case 'linestring-stroke-width':
    case 'polygon-stroke-width':
      return 'width'
    case 'linestring-stroke-style':
    case 'polygon-stroke-style':
      return 'style'
    case 'polygon-fill-opacity':
      return 'fill'
    case 'point-symbol':
      return 'symbol'
  }
}

export function getStylePropKey(styleId: StyleId) {
  switch (styleId) {
    case 'linestring-color':
    case 'point-color':
    case 'polygon-color':
      return `${APP_PREFIX}color`
    case 'point-symbol':
      return `${APP_PREFIX}symbol`
    case 'linestring-stroke-opacity':
    case 'polygon-stroke-opacity':
      return `${APP_PREFIX}stroke`
    case 'linestring-stroke-style':
    case 'polygon-stroke-style':
      return `${APP_PREFIX}style`
    case 'linestring-stroke-width':
    case 'polygon-stroke-width':
      return `${APP_PREFIX}width`
    case 'polygon-fill-opacity':
      return `${APP_PREFIX}fill`
  }
}

export function generateStyleSetting(features: Array<FeatureType>) {
  function getStyleValuesMap(features: Array<FeatureType>) {
    const styleValuesMap: Record<string, Array<StyleValue>> = {
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

    function setStyleValuesMap(
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
    features.forEach((feature) => {
      const properties = { ...feature.properties }
      switch (feature.geometry.type) {
        case 'Point':
        case 'MultiPoint':
          setStyleValuesMap(properties, 'point-color', `${APP_PREFIX}color`)
          setStyleValuesMap(properties, 'point-symbol', `${APP_PREFIX}symbol`)
          break
        case 'LineString':
        case 'MultiLineString':
          setStyleValuesMap(
            properties,
            'linestring-color',
            `${APP_PREFIX}color`
          )
          setStyleValuesMap(
            properties,
            'linestring-stroke-opacity',
            `${APP_PREFIX}stroke`
          )
          setStyleValuesMap(
            properties,
            'linestring-stroke-style',
            `${APP_PREFIX}style`
          )
          setStyleValuesMap(
            properties,
            'linestring-stroke-width',
            `${APP_PREFIX}width`
          )
          break
        case 'Polygon':
        case 'MultiPolygon':
          setStyleValuesMap(properties, 'polygon-color', `${APP_PREFIX}color`)
          setStyleValuesMap(
            properties,
            'polygon-fill-opacity',
            `${APP_PREFIX}fill`
          )
          setStyleValuesMap(
            properties,
            'polygon-stroke-opacity',
            `${APP_PREFIX}stroke`
          )
          setStyleValuesMap(
            properties,
            'polygon-stroke-style',
            `${APP_PREFIX}style`
          )
          setStyleValuesMap(
            properties,
            'polygon-stroke-width',
            `${APP_PREFIX}width`
          )
          break
        default:
          break
      }
    })
    return styleValuesMap
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

  function getStyleSetting(features: Array<FeatureType>) {
    const styleGroup: StyleGroup = {
      point: {
        has: false
      },
      line: {
        has: false
      },
      polygon: {
        has: false
      }
    }
    const styleValuesMap = getStyleValuesMap(features)
    const types = getFeatureTypes(features)

    if (types.includes('Point') || types.includes('MultiPoint')) {
      styleGroup['point'].has = true

      POINT_STYLE_IDS.forEach((id) => {
        const styleKey = getStyleKey(id)
        const styleValue: StyleValue = getValue(styleValuesMap[id], id)
        styleGroup['point'][styleKey] = styleValue
      })
    }
    if (types.includes('LineString') || types.includes('MultiLineString')) {
      styleGroup['line'].has = true
      LINESTRING_STYLE_IDS.forEach((id) => {
        const styleKey = getStyleKey(id)
        const styleValue: StyleValue = getValue(styleValuesMap[id], id)
        styleGroup['line'][styleKey] = styleValue
      })
    }
    if (types.includes('Polygon') || types.includes('MultiPolygon')) {
      styleGroup['polygon'].has = true
      POLYGON_STYLE_IDS.forEach((id) => {
        const styleKey = getStyleKey(id)
        const styleValue: StyleValue = getValue(styleValuesMap[id], id)
        styleGroup['polygon'][styleKey] = styleValue
      })
      return styleGroup
    }
    return styleGroup
  }

  return getStyleSetting(features)
}
