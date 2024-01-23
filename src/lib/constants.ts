import { BackgroundLayer } from '@/types'
import { DrawMode } from '@mapbox/mapbox-gl-draw'
import env from './env'

export const APP_PREFIX = 'st:'

export const COLOR_FIELD = `${APP_PREFIX}color`
export const STROKE_FIELD = `${APP_PREFIX}stroke`
export const WIDTH_FIELD = `${APP_PREFIX}width`
export const STYLE_FIELD = `${APP_PREFIX}style`
export const FILL_FIELD = `${APP_PREFIX}fill`

export const MODES: Array<DrawMode> = [
  'direct_select',
  'simple_select',
  'draw_line_string',
  'draw_point',
  'draw_polygon',
  'static'
]

export const DRAW_MODES: Array<string> = [
  'draw_line_string',
  'draw_point',
  'draw_polygon',
  'draw_rectangle',
  'drag_circle'
]

type StyleType = 'color' | 'number'

export type StyleProperty = {
  id: string
  name: string
  checked: boolean
  type: StyleType
  value: string | number | 'mixed'
}

export const STROKE_STYLES: Array<string> = ['Solid', 'Dashed', 'Dotted']

export const CURRENT_BG_LAYER: BackgroundLayer = {
  id: 'streets',
  name: 'Streets',
  type: 'mapbox',
  token: env.NEXT_PUBLIC_MAPBOX_TOKEN,
  url: 'mapbox://styles/mapbox/streets-v12'
}

export const DEFAULT_BG_LAYERS: Array<BackgroundLayer> = [
  {
    id: 'streets',
    name: 'Streets',
    type: 'mapbox',
    token: env.NEXT_PUBLIC_MAPBOX_TOKEN,
    url: 'mapbox://styles/mapbox/streets-v12'
  },
  {
    id: 'light',
    name: 'Light',
    type: 'mapbox',
    token: env.NEXT_PUBLIC_MAPBOX_TOKEN,
    url: 'mapbox://styles/mapbox/light-v11'
  },
  {
    id: 'dark',
    name: 'Dark',
    type: 'mapbox',
    token: env.NEXT_PUBLIC_MAPBOX_TOKEN,
    url: 'mapbox://styles/mapbox/dark-v11'
  },
  {
    id: 'satellite',
    name: 'Satellite',
    type: 'mapbox',
    token: env.NEXT_PUBLIC_MAPBOX_TOKEN,
    url: 'mapbox://styles/mapbox/satellite-v9'
  }
]
