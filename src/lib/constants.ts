export const APP_PREFIX = 'st:'

export const COLOR_FIELD = `${APP_PREFIX}color`
export const STROKE_FIELD = `${APP_PREFIX}stroke`
export const WIDTH_FIELD = `${APP_PREFIX}width`
export const STYLE_FIELD = `${APP_PREFIX}style`
export const FILL_FIELD = `${APP_PREFIX}fill`

type StyleType = 'color' | 'number'

export type StyleProperty = {
  id: string
  name: string
  checked: boolean
  type: StyleType
  value: string | number | 'mixed'
}

export const STROKE_STYLES: Array<string> = ['Solid', 'Dashed', 'Dotted']

// export const POINT_STYLE_PROPERTIES: Array<StyleProperty> = [
//   {
//     id: 'point-color',
//     name: `${STYLE_PREFIX}:color`,
//     checked: false,
//     type: 'color',
//     value: '#af1790'
//   },
//   {
//     id: 'point-color',
//     name: `${STYLE_PREFIX}:symbol`,
//     checked: false,
//     type: 'color',
//     value: '#af1790'
//   }
// ]

// export const LINESTRING_STYLE_PROPERTIES: Array<StyleProperty> = [
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

// export const POLYGON_STYLE_PROPERTIES: Array<StyleProperty> = [
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
