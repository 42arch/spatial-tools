import { FeatureType, GeometryType } from '@/types'
import { getFeatureTypes } from './feature'

export const STYLE_PREFIX = 'st:'

type StyleValueType = 'color' | 'number' | 'list' | 'symbol'

export type StyleProp = {
  id: string
  name: string
  // checked: boolean
  type: GeometryType
  valueType: StyleValueType
  value: StyleValue
}

export const STROKE_STYLES: Array<string> = ['Solid', 'Dashed', 'Dotted']

// export const POINT_STYLE_PROPERTIES: Array<StyleProp> = [
//   {
//     id: 'point-color',
//     name: `${STYLE_PREFIX}color`,
//     checked: false,
//     type: 'color',
//     value: '#af1790'
//   },
//   {
//     id: 'point-color',
//     name: `${STYLE_PREFIX}symbol`,
//     checked: false,
//     type: 'color',
//     value: '#af1790'
//   }
// ]

// export const LINESTRING_STYLE_PROPERTIES: Array<StyleProp> = [
//   {
//     id: 'linestring-color',
//     name: `${STYLE_PREFIX}:color`,
//     checked: false,
//     type: 'color',
//     value: '#af1790'
//   },
//   {
//     id: 'linestring-stroke-opacity',
//     name: `${STYLE_PREFIX}:strokeOpacity`,
//     checked: false,
//     type: 'number',
//     value: 1
//   },
//   {
//     id: 'linestring-stroke-style',
//     name: `${STYLE_PREFIX}:strokeStyle`,
//     checked: false,
//     type: 'number',
//     value: 'Solid'
//   },
//   {
//     id: 'linestring-stroke-width',
//     name: `${STYLE_PREFIX}:strokeWidth`,
//     checked: false,
//     type: 'number',
//     value: 2
//   }
// ]

// export const POLYGON_STYLE_PROPERTIES: Array<StyleProp> = [
//   {
//     id: 'polygon-color',
//     name: `${STYLE_PREFIX}:color`,
//     checked: false,
//     type: 'color',
//     value: '#af1790'
//   },
//   {
//     id: 'polygon-fill-opacity',
//     name: `${STYLE_PREFIX}:fillOpacity`,
//     checked: false,
//     type: 'number',
//     value: 1
//   },
//   {
//     id: 'polygon-stroke-opacity',
//     name: `${STYLE_PREFIX}:strokeOpacity`,
//     checked: false,
//     type: 'number',
//     value: 1
//   },
//   {
//     id: 'polygon-stroke-style',
//     name: `${STYLE_PREFIX}:strokeStyle`,
//     checked: false,
//     type: 'number',
//     value: 'Solid'
//   },
//   {
//     id: 'polygon-stroke-width',
//     name: `${STYLE_PREFIX}:strokeWidth`,
//     checked: false,
//     type: 'number',
//     value: 2
//   }
// ]

type StrokeStyle = 'Solid' | 'Dashed' | 'Dotted'

export type StyleValue = string | number

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

export type StyleName =
  | 'Color'
  | 'Stroke'
  | 'Width'
  | 'Style'
  | 'Fill'
  | 'Symbol'

// export type StyleGroup = {
//   type: 'Point' | 'LineString' | 'Polygon'
//   style: Partial<Record<StyleName, StyleProp>>
// }
export type StyleGroupProps = Partial<Record<StyleName, StyleProp>>

export type StyleGroup = Record<
  'Point' | 'LineString' | 'Polygon',
  {
    has: boolean
    style: StyleGroupProps
  }
>

export const DEFAULT_COLOR = '#af1790'
export const DEFAULT_SYMBOL = 'dot'
export const DEFAULT_STROKE_OPACITY = 1
export const DEFAULT_STROKE_STYLE: StrokeStyle = 'Solid'
export const DEFAULT_STROKE_WIDTH = 1
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

export function getStylePropKey(styleId: StyleId) {
  switch (styleId) {
    case 'linestring-color':
    case 'point-color':
    case 'polygon-color':
      return `${STYLE_PREFIX}color`
    case 'point-symbol':
      return `${STYLE_PREFIX}symbol`
    case 'linestring-stroke-opacity':
    case 'polygon-stroke-opacity':
      return `${STYLE_PREFIX}stroke`
    case 'linestring-stroke-style':
    case 'polygon-stroke-style':
      return `${STYLE_PREFIX}style`
    case 'linestring-stroke-width':
    case 'polygon-stroke-width':
      return `${STYLE_PREFIX}width`
    case 'polygon-fill-opacity':
      return `${STYLE_PREFIX}fill`
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
          setStyleValuesMap(properties, 'point-color', `${STYLE_PREFIX}color`)
          setStyleValuesMap(properties, 'point-symbol', `${STYLE_PREFIX}symbol`)
          break
        case 'LineString':
        case 'MultiLineString':
          setStyleValuesMap(
            properties,
            'linestring-color',
            `${STYLE_PREFIX}color`
          )
          setStyleValuesMap(
            properties,
            'linestring-stroke-opacity',
            `${STYLE_PREFIX}stroke`
          )
          setStyleValuesMap(
            properties,
            'linestring-stroke-style',
            `${STYLE_PREFIX}style`
          )
          setStyleValuesMap(
            properties,
            'linestring-stroke-width',
            `${STYLE_PREFIX}width`
          )
          break
        case 'Polygon':
        case 'MultiPolygon':
          setStyleValuesMap(properties, 'polygon-color', `${STYLE_PREFIX}color`)
          setStyleValuesMap(
            properties,
            'polygon-fill-opacity',
            `${STYLE_PREFIX}fill`
          )
          setStyleValuesMap(
            properties,
            'polygon-stroke-opacity',
            `${STYLE_PREFIX}stroke`
          )
          setStyleValuesMap(
            properties,
            'polygon-stroke-style',
            `${STYLE_PREFIX}style`
          )
          setStyleValuesMap(
            properties,
            'polygon-stroke-width',
            `${STYLE_PREFIX}width`
          )
          break
        default:
          break
      }
    })
    return styleValuesMap
  }

  function getType(styleId: StyleId): GeometryType {
    switch (styleId) {
      case 'point-color':
      case 'point-symbol':
        return 'Point'
      case 'linestring-color':
      case 'linestring-stroke-opacity':
      case 'linestring-stroke-style':
      case 'linestring-stroke-width':
        return 'LineString'
      case 'polygon-color':
      case 'polygon-fill-opacity':
      case 'polygon-stroke-opacity':
      case 'polygon-stroke-style':
      case 'polygon-stroke-width':
        return 'Polygon'
    }
  }

  function getStyleName(styleId: StyleId): StyleName {
    switch (styleId) {
      case 'linestring-color':
      case 'point-color':
      case 'polygon-color':
        return 'Color'
      case 'linestring-stroke-opacity':
      case 'polygon-stroke-opacity':
        return 'Stroke'
      case 'linestring-stroke-width':
      case 'polygon-stroke-width':
        return 'Width'
      case 'linestring-stroke-style':
      case 'polygon-stroke-style':
        return 'Style'
      case 'polygon-fill-opacity':
        return 'Fill'
      case 'point-symbol':
        return 'Symbol'
    }
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

  function getStyleSetting(features: Array<FeatureType>) {
    const styleGroup: StyleGroup = {
      Point: {
        has: false,
        style: {}
      },
      LineString: {
        has: false,
        style: {}
      },
      Polygon: {
        has: false,
        style: {}
      }
    }
    const styleValuesMap = getStyleValuesMap(features)
    const types = getFeatureTypes(features)

    if (types.includes('Point') || types.includes('MultiPoint')) {
      styleGroup['Point'].has = true

      POINT_STYLE_IDS.forEach((id) => {
        const styleName = getStyleName(id)
        const styleProps: StyleProp = {
          id: id,
          type: 'Point',
          name: styleName,
          valueType: getValueType(id),
          value: getValue(styleValuesMap[id], id)
        }
        styleGroup['Point'].style[styleName] = styleProps
      })
    }
    if (types.includes('LineString') || types.includes('MultiLineString')) {
      styleGroup['LineString'].has = true
      LINESTRING_STYLE_IDS.forEach((id) => {
        const styleName = getStyleName(id)
        const styleProps: StyleProp = {
          id: id,
          type: 'LineString',
          name: styleName,
          valueType: getValueType(id),
          value: getValue(styleValuesMap[id], id)
        }
        styleGroup['LineString'].style[styleName] = styleProps
      })
    }
    if (types.includes('Polygon') || types.includes('MultiPolygon')) {
      styleGroup['Polygon'].has = true
      POLYGON_STYLE_IDS.forEach((id) => {
        const styleName = getStyleName(id)

        const styleProps: StyleProp = {
          id: id,
          type: 'Polygon',
          name: styleName,
          valueType: getValueType(id),
          value: getValue(styleValuesMap[id], id)
        }
        styleGroup['Polygon'].style[styleName] = styleProps
      })
      return styleGroup
    }
    return styleGroup
  }

  return getStyleSetting(features)
}