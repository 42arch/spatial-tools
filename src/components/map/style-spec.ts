import { MutableRefObject } from 'react'
import { FeatureNode } from '@/types'
import {
  DEFAULT_COLOR,
  DEFAULT_FILL_OPACITY,
  DEFAULT_STROKE_OPACITY,
  DEFAULT_STROKE_WIDTH,
  StrokeStyle
} from '@/lib/style'
import {
  STROKE_FIELD,
  WIDTH_FIELD,
  STYLE_FIELD,
  FILL_FIELD,
  COLOR_FIELD
} from '@/lib/constants'

const ACTIVE_COLOR = '#fa983a'

const USER_COLOR = `user_${COLOR_FIELD}`
const USER_STROKE = `user_${STROKE_FIELD}`
const USER_WIDTH = `user_${WIDTH_FIELD}`
const USER_STYLE = `user_${STYLE_FIELD}`
const USER_FILL = `user_${FILL_FIELD}`

export const CUSTOM_STYLES: object[] = [
  // Polygon style
  {
    id: 'gl-draw-polygon-stroke-create',
    type: 'line',
    filter: [
      'all',
      ['==', '$type', 'Polygon'],
      ['==', 'active', 'true'],
      ['!=', 'mode', 'static'],
      ['!has', USER_COLOR],
      ['!has', USER_STROKE],
      ['!has', USER_WIDTH],
      ['!has', USER_STYLE]
    ],
    layout: {
      'line-cap': 'round',
      'line-join': 'round'
    },
    paint: {
      'line-color': DEFAULT_COLOR,
      'line-opacity': DEFAULT_STROKE_OPACITY,
      'line-width': DEFAULT_STROKE_WIDTH
    }
  },
  {
    id: 'gl-draw-polygon-stroke',
    type: 'line',
    filter: [
      'all',
      ['==', '$type', 'Polygon'],
      ['has', USER_COLOR],
      ['has', USER_STROKE],
      ['has', USER_WIDTH],
      ['has', USER_STYLE]
    ],
    layout: {
      'line-cap': 'round',
      'line-join': 'round'
    },
    paint: {
      'line-color': ['get', USER_COLOR],
      'line-opacity': ['get', USER_STROKE],
      'line-width': ['get', USER_WIDTH],
      'line-dasharray': ['get', USER_STYLE]
    }
  },
  {
    id: 'gl-draw-polygon-fill-create',
    type: 'fill',
    filter: [
      'all',
      ['==', '$type', 'Polygon'],
      ['==', 'active', 'true'],
      ['!has', USER_COLOR],
      ['!has', USER_FILL]
    ],
    paint: {
      'fill-color': DEFAULT_COLOR,
      'fill-opacity': DEFAULT_FILL_OPACITY
    }
  },
  {
    id: 'gl-draw-polygon-fill-selected',
    type: 'fill',
    filter: [
      'all',
      ['==', '$type', 'Polygon'],
      ['==', 'active', 'true'],
      ['has', USER_COLOR],
      ['has', USER_FILL]
    ],
    paint: {
      'fill-color': ['get', USER_COLOR],
      'fill-opacity': ['get', USER_FILL]
    }
  },
  {
    id: 'gl-draw-polygon-fill',
    type: 'fill',
    filter: [
      'all',
      ['==', '$type', 'Polygon'],
      ['!=', 'active', 'true'],
      ['has', USER_COLOR],
      ['has', USER_FILL]
    ],
    paint: {
      'fill-color': ['get', USER_COLOR],
      // 'fill-outline-color': ['get', USER_COLOR],
      'fill-opacity': ['get', USER_FILL]
    }
  },

  // LineString Style
  {
    id: 'gl-draw-line',
    type: 'line',
    filter: [
      'all',
      ['==', '$type', 'LineString'],
      ['!=', 'active', 'true'],
      ['has', USER_STROKE],
      ['has', USER_COLOR],
      ['has', USER_WIDTH],
      ['has', USER_STYLE]
    ],
    layout: {
      'line-cap': 'round',
      'line-join': 'round'
    },
    paint: {
      'line-opacity': ['get', USER_STROKE],
      'line-color': ['get', USER_COLOR],
      'line-width': ['get', USER_WIDTH],
      'line-dasharray': ['get', USER_STYLE]
    }
  },
  {
    id: 'gl-draw-line-create',
    type: 'line',
    filter: [
      'all',
      ['==', '$type', 'LineString'],
      ['==', 'active', 'true'],
      ['!has', USER_STROKE],
      ['!has', USER_COLOR],
      ['!has', USER_WIDTH]
      // ['!has', USER_STYLE]
    ],
    layout: {
      'line-cap': 'round',
      'line-join': 'round'
    },
    paint: {
      'line-color': DEFAULT_COLOR,
      'line-width': DEFAULT_STROKE_WIDTH
    }
  },
  {
    id: 'gl-draw-line-selected',
    type: 'line',
    filter: [
      'all',
      ['==', '$type', 'LineString'],
      ['==', 'active', 'true'],
      ['has', USER_STROKE],
      ['has', USER_COLOR],
      ['has', USER_WIDTH],
      ['has', USER_STYLE]
    ],
    layout: {
      'line-cap': 'round',
      'line-join': 'round'
    },
    paint: {
      'line-opacity': ['get', USER_STROKE],
      'line-color': ['get', USER_COLOR],
      'line-width': ['get', USER_WIDTH],
      'line-dasharray': ['get', USER_STYLE]
    }
  },
  // point style
  {
    id: 'gl-draw-point',
    type: 'circle',
    filter: [
      'all',
      ['!=', 'active', 'true'],
      ['==', '$type', 'Point'],
      ['has', USER_COLOR]
    ],
    paint: {
      'circle-radius': 4,
      'circle-stroke-width': 1,
      'circle-stroke-color': '#fff',
      'circle-color': ['get', USER_COLOR]
    }
  },
  {
    id: 'gl-draw-point-outline',
    type: 'circle',
    filter: [
      'all',
      ['!=', 'active', 'true'],
      ['==', '$type', 'Point'],
      ['has', USER_COLOR]
    ],
    paint: {
      'circle-radius': 5,
      'circle-stroke-width': 1,
      'circle-stroke-color': ['get', USER_COLOR],
      'circle-opacity': 0
    }
  },
  {
    id: 'gl-draw-point-active',
    type: 'circle',
    filter: ['all', ['==', 'active', 'true'], ['==', '$type', 'Point']],
    paint: {
      'circle-radius': 5,
      'circle-stroke-width': 2,
      'circle-stroke-color': '#fff',
      'circle-color': ACTIVE_COLOR
    }
  },
  // control points
  {
    id: 'gl-draw-midpoint',
    type: 'circle',
    filter: ['all', ['==', '$type', 'Point'], ['==', 'meta', 'midpoint']],
    paint: {
      'circle-radius': 3,
      'circle-stroke-width': 1,
      'circle-stroke-color': '#fff',
      'circle-color': ACTIVE_COLOR
    }
  },
  {
    id: 'gl-draw-polygon-and-line-vertex-inactive',
    type: 'circle',
    filter: [
      'all',
      ['==', 'meta', 'vertex'],
      ['==', '$type', 'Point'],
      ['!=', 'mode', 'static']
    ],
    paint: {
      'circle-radius': 4,
      'circle-stroke-width': 2,
      'circle-stroke-color': '#fff',
      'circle-color': ACTIVE_COLOR
    }
  },
  {
    id: 'gl-draw-polygon-and-line-vertex-active',
    type: 'circle',
    filter: [
      'all',
      ['==', 'meta', 'vertex'],
      ['==', 'active', 'true'],
      ['==', '$type', 'Point'],
      ['!=', 'mode', 'static']
    ],
    paint: {
      'circle-radius': 5,
      'circle-stroke-width': 2,
      'circle-stroke-color': '#fff',
      'circle-color': ACTIVE_COLOR
    }
  }
]

export function strokeStyleToDasharray(strokeStyle: StrokeStyle) {
  switch (strokeStyle) {
    case 'Solid':
      return [1000]
    case 'Dashed':
      return [2, 1.5]
    case 'Dotted':
      return [0, 2]
  }
}

export function setStyleProperties(
  drawRef: MutableRefObject<any>,
  featureNode: FeatureNode
) {
  const existFeature = drawRef.current.get(featureNode.id)
  if (!existFeature) return

  const type = featureNode.data.geometry.type
  const properties = featureNode.data.properties
  if (properties) {
    switch (type) {
      case 'Polygon':
      case 'MultiPolygon':
        drawRef.current?.setFeatureProperty(
          featureNode.id,
          COLOR_FIELD,
          properties[COLOR_FIELD] || DEFAULT_COLOR
        )
        drawRef.current?.setFeatureProperty(
          featureNode.id,
          STROKE_FIELD,
          properties[STROKE_FIELD]
            ? Number(properties[STROKE_FIELD])
            : DEFAULT_STROKE_OPACITY
        )
        drawRef.current?.setFeatureProperty(
          featureNode.id,
          WIDTH_FIELD,
          properties[WIDTH_FIELD]
            ? Number(properties[WIDTH_FIELD])
            : DEFAULT_STROKE_WIDTH
        )
        drawRef.current?.setFeatureProperty(
          featureNode.id,
          FILL_FIELD,
          properties[FILL_FIELD]
            ? Number(properties[FILL_FIELD])
            : DEFAULT_FILL_OPACITY
        )
        drawRef.current?.setFeatureProperty(
          featureNode.id,
          STYLE_FIELD,
          properties[STYLE_FIELD]
            ? strokeStyleToDasharray(properties[STYLE_FIELD])
            : []
        )
        break
      case 'LineString':
      case 'MultiLineString':
        drawRef.current?.setFeatureProperty(
          existFeature?.id,
          COLOR_FIELD,
          properties[COLOR_FIELD] ? properties[COLOR_FIELD] : DEFAULT_COLOR
        )
        drawRef.current?.setFeatureProperty(
          existFeature?.id,
          WIDTH_FIELD,
          properties[WIDTH_FIELD]
            ? Number(properties[WIDTH_FIELD])
            : DEFAULT_STROKE_WIDTH
        )
        drawRef.current?.setFeatureProperty(
          existFeature?.id,
          STROKE_FIELD,
          properties[STROKE_FIELD]
            ? Number(properties[STROKE_FIELD])
            : DEFAULT_STROKE_OPACITY
        )
        drawRef.current?.setFeatureProperty(
          featureNode.id,
          STYLE_FIELD,
          properties[STYLE_FIELD]
            ? strokeStyleToDasharray(properties[STYLE_FIELD])
            : []
        )
        break
      case 'Point':
      case 'MultiPoint':
        drawRef.current?.setFeatureProperty(
          featureNode.id,
          COLOR_FIELD,
          properties[COLOR_FIELD] ? properties[COLOR_FIELD] : DEFAULT_COLOR
        )
        // drawRef.current?.setFeatureProperty(
        //   featureNode.id,
        //   'symbol',
        //   properties['st:symbol'] || '😍'
        // )
        break
      default:
        break
    }

    const newFeature = drawRef.current.get(featureNode.id)
    drawRef.current.add(newFeature)
  }
}
