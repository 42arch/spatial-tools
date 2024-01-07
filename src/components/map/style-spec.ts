import { MutableRefObject } from 'react'
import { FeatureNode } from '@/types'
import {
  DEFAULT_COLOR,
  DEFAULT_FILL_OPACITY,
  DEFAULT_STROKE_OPACITY,
  DEFAULT_STROKE_WIDTH,
  StrokeStyle
} from '@/lib/style'

const ACTIVE_COLOR = '#fa983a'

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
      ['!has', 'user_color'],
      ['!has', 'user_stroke'],
      ['!has', 'user_width'],
      ['!has', 'user_style']
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
      ['has', 'user_color'],
      ['has', 'user_stroke'],
      ['has', 'user_width'],
      ['has', 'user_style']
    ],
    layout: {
      'line-cap': 'round',
      'line-join': 'round'
    },
    paint: {
      'line-color': ['get', 'user_color'],
      'line-opacity': ['get', 'user_stroke'],
      'line-width': ['get', 'user_width'],
      'line-dasharray': ['get', 'user_style']
    }
  },
  {
    id: 'gl-draw-polygon-fill-create',
    type: 'fill',
    filter: [
      'all',
      ['==', '$type', 'Polygon'],
      ['==', 'active', 'true'],
      ['!has', 'user_color'],
      ['!has', 'user_fill'],
      ['!has', 'user_stroke']
    ],
    paint: {
      'fill-antialias': false,
      'fill-color': DEFAULT_COLOR,
      // 'fill-outline-color': DEFAULT_COLOR,
      'fill-opacity': 0.3
    }
  },
  {
    id: 'gl-draw-polygon-fill',
    type: 'fill',
    filter: [
      'all',
      ['==', '$type', 'Polygon'],
      ['has', 'user_color'],
      ['has', 'user_fill'],
      ['has', 'user_stroke']
    ],
    paint: {
      'fill-antialias': false,
      'fill-color': ['get', 'user_color'],
      // 'fill-outline-color': ['get', 'user_color'],
      'fill-opacity': ['get', 'user_fill']
    }
  },

  // LineString Style
  {
    id: 'gl-draw-line',
    type: 'line',
    filter: [
      'all',
      ['==', '$type', 'LineString'],
      // ['!=', 'active', 'true'],
      ['has', 'user_stroke'],
      ['has', 'user_color'],
      ['has', 'user_width'],
      ['has', 'user_style']
    ],
    layout: {
      'line-cap': 'round',
      'line-join': 'round'
    },
    paint: {
      'line-opacity': ['get', 'user_stroke'],
      'line-color': ['get', 'user_color'],
      'line-width': ['get', 'user_width'],
      'line-dasharray': ['get', 'user_style']
    }
  },
  {
    id: 'gl-draw-line-create',
    type: 'line',
    filter: [
      'all',
      ['==', '$type', 'LineString'],
      ['==', 'active', 'true'],
      ['!has', 'user_stroke'],
      ['!has', 'user_color'],
      ['!has', 'user_width'],
      ['!has', 'user_style']
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
  // point style
  {
    id: 'gl-draw-point',
    type: 'circle',
    filter: [
      'all',
      ['!=', 'active', 'true'],
      ['==', '$type', 'Point'],
      ['has', 'user_color']
    ],
    paint: {
      'circle-radius': 4,
      'circle-stroke-width': 1,
      'circle-stroke-color': '#fff',
      'circle-color': ['get', 'user_color']
    }
  },
  {
    id: 'gl-draw-point-outline',
    type: 'circle',
    filter: [
      'all',
      ['!=', 'active', 'true'],
      ['==', '$type', 'Point'],
      ['has', 'user_color']
    ],
    paint: {
      'circle-radius': 5,
      'circle-stroke-width': 1,
      'circle-stroke-color': ['get', 'user_color'],
      'circle-opacity': 0
    }
  },
  {
    id: 'gl-draw-point-active',
    type: 'circle',
    filter: [
      'all',
      ['==', 'active', 'true'],
      ['==', '$type', 'Point'],
      ['has', 'user_color']
    ],
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
          'color',
          properties['st:color'] || DEFAULT_COLOR
        )
        drawRef.current?.setFeatureProperty(
          featureNode.id,
          'stroke',
          properties['st:stroke']
            ? Number(properties['st:stroke'])
            : DEFAULT_STROKE_OPACITY
        )
        drawRef.current?.setFeatureProperty(
          featureNode.id,
          'width',
          properties['st:width']
            ? Number(properties['st:width'])
            : DEFAULT_STROKE_WIDTH
        )
        drawRef.current?.setFeatureProperty(
          featureNode.id,
          'fill',
          properties['st:fill']
            ? Number(properties['st:fill'])
            : DEFAULT_FILL_OPACITY
        )
        drawRef.current?.setFeatureProperty(
          featureNode.id,
          'style',
          properties['st:style']
            ? strokeStyleToDasharray(properties['st:style'])
            : []
        )
        break
      case 'LineString':
      case 'MultiLineString':
        drawRef.current?.setFeatureProperty(
          existFeature?.id,
          'color',
          properties['st:color'] ? properties['st:color'] : DEFAULT_COLOR
        )
        drawRef.current?.setFeatureProperty(
          existFeature?.id,
          'width',
          properties['st:width']
            ? Number(properties['st:width'])
            : DEFAULT_STROKE_WIDTH
        )
        drawRef.current?.setFeatureProperty(
          existFeature?.id,
          'stroke',
          properties['st:stroke']
            ? Number(properties['st:stroke'])
            : DEFAULT_STROKE_OPACITY
        )
        drawRef.current?.setFeatureProperty(
          featureNode.id,
          'style',
          properties['st:style']
            ? strokeStyleToDasharray(properties['st:style'])
            : []
        )
        break
      case 'Point':
      case 'MultiPoint':
        drawRef.current?.setFeatureProperty(
          featureNode.id,
          'color',
          properties['st:color'] ? properties['st:color'] : DEFAULT_COLOR
        )
        drawRef.current?.setFeatureProperty(
          featureNode.id,
          'symbol',
          properties['st:symbol'] || '😍'
        )
        break
      default:
        break
    }

    const newFeature = drawRef.current.get(featureNode.id)
    drawRef.current.add(newFeature)
  }
}
