import { MutableRefObject } from 'react'
import { FeatureNode } from '@/types'
import {
  DEFAULT_COLOR,
  DEFAULT_FILL_OPACITY,
  DEFAULT_STROKE_OPACITY,
  DEFAULT_STROKE_WIDTH
} from '@/lib/style'

// feature styles
export const CUSTOM_STYLES: object[] = [
  // default theme
  // {
  //   id: 'gl-draw-polygon-fill-inactive',
  //   type: 'fill',
  //   filter: [
  //     'all',
  //     ['==', 'active', 'false'],
  //     ['==', '$type', 'Polygon'],
  //     ['!=', 'mode', 'static']
  //   ],
  //   paint: {
  //     'fill-color': '#3bb2d0',
  //     'fill-outline-color': '#3bb2d0',
  //     'fill-opacity': 0.1
  //   }
  // },
  {
    id: 'gl-draw-polygon-fill-active',
    type: 'fill',
    filter: ['all', ['==', 'active', 'true'], ['==', '$type', 'Polygon']],
    paint: {
      'fill-color': '#fbb03b',
      'fill-outline-color': '#fbb03b',
      'fill-opacity': 0.1
    }
  },
  {
    id: 'gl-draw-polygon-midpoint',
    type: 'circle',
    filter: ['all', ['==', '$type', 'Point'], ['==', 'meta', 'midpoint']],
    paint: {
      'circle-radius': 3,
      'circle-color': '#fbb03b'
    }
  },
  // {
  //   id: 'gl-draw-polygon-stroke-inactive',
  //   type: 'line',
  //   filter: [
  //     'all',
  //     ['==', 'active', 'false'],
  //     ['==', '$type', 'Polygon'],
  //     ['!=', 'mode', 'static']
  //   ],
  //   layout: {
  //     'line-cap': 'round',
  //     'line-join': 'round'
  //   },
  //   paint: {
  //     'line-color': '#3bb2d0',
  //     'line-width': 2
  //   }
  // },
  // {
  //   id: 'gl-draw-polygon-stroke-active',
  //   type: 'line',
  //   filter: [
  //     'all',
  //     ['==', 'active', 'true'],
  //     ['==', '$type', 'Polygon'],
  //     ['has', 'user_stroke'],
  //     ['has', 'user_stroke-width']
  //   ],
  //   layout: {
  //     'line-cap': 'round',
  //     'line-join': 'round'
  //   },
  //   paint: {
  //     'line-opacity': 0.3,
  //     'line-color': ['get', 'user_stroke'],
  //     'line-width': ['get', 'user_stroke-width'],
  //     'line-dasharray': [0.2, 2]
  //   }
  // },
  // {
  //   id: 'gl-draw-line-inactive',
  //   type: 'line',
  //   filter: [
  //     'all',
  //     ['==', 'active', 'false'],
  //     ['==', '$type', 'LineString'],
  //     ['!=', 'mode', 'static']
  //   ],
  //   layout: {
  //     'line-cap': 'round',
  //     'line-join': 'round'
  //   },
  //   paint: {
  //     'line-color': '#3bb2d0',
  //     'line-width': 2
  //   }
  // },
  {
    id: 'gl-draw-line-active',
    type: 'line',
    filter: ['all', ['==', '$type', 'LineString'], ['==', 'active', 'true']],
    layout: {
      'line-cap': 'round',
      'line-join': 'round'
    },
    paint: {
      'line-color': '#fbb03b',
      'line-dasharray': [0.2, 2],
      'line-width': 2
    }
  },
  {
    id: 'gl-draw-polygon-and-line-vertex-stroke-inactive',
    type: 'circle',
    filter: [
      'all',
      ['==', 'meta', 'vertex'],
      ['==', '$type', 'Point'],
      ['!=', 'mode', 'static']
    ],
    paint: {
      'circle-radius': 5,
      'circle-color': '#fff'
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
      'circle-radius': 3,
      'circle-color': '#fbb03b'
    }
  },
  {
    id: 'gl-draw-point-point-stroke-inactive',
    type: 'circle',
    filter: [
      'all',
      ['==', 'active', 'false'],
      ['==', '$type', 'Point'],
      ['==', 'meta', 'feature'],
      ['!=', 'mode', 'static']
    ],
    paint: {
      'circle-radius': 5,
      'circle-opacity': 1,
      'circle-color': '#fff'
    }
  },
  {
    id: 'gl-draw-point-inactive',
    type: 'circle',
    filter: [
      'all',
      ['==', 'active', 'false'],
      ['==', '$type', 'Point'],
      ['==', 'meta', 'feature'],
      ['!=', 'mode', 'static']
    ],
    paint: {
      'circle-radius': 3,
      'circle-color': '#3bb2d0'
    }
  },
  {
    id: 'gl-draw-point-stroke-active',
    type: 'circle',
    filter: [
      'all',
      ['==', '$type', 'Point'],
      ['==', 'active', 'true'],
      ['!=', 'meta', 'midpoint']
    ],
    paint: {
      'circle-radius': 7,
      'circle-color': '#fff'
    }
  },
  {
    id: 'gl-draw-point-active',
    type: 'circle',
    filter: [
      'all',
      ['==', '$type', 'Point'],
      ['!=', 'meta', 'midpoint'],
      ['==', 'active', 'true']
    ],
    paint: {
      'circle-radius': 5,
      'circle-color': '#fbb03b'
    }
  },
  // {
  //   id: 'gl-draw-polygon-fill-static',
  //   type: 'fill',
  //   filter: ['all', ['==', 'mode', 'static'], ['==', '$type', 'Polygon']],
  //   paint: {
  //     'fill-color': '#404040',
  //     'fill-outline-color': '#404040',
  //     'fill-opacity': 0.1
  //   }
  // },
  // {
  //   id: 'gl-draw-polygon-stroke-static',
  //   type: 'line',
  //   filter: ['all', ['==', 'mode', 'static'], ['==', '$type', 'Polygon']],
  //   layout: {
  //     'line-cap': 'round',
  //     'line-join': 'round'
  //   },
  //   paint: {
  //     'line-color': '#404040',
  //     'line-width': 2
  //   }
  // },
  // {
  //   id: 'gl-draw-line-static',
  //   type: 'line',
  //   filter: ['all', ['==', 'mode', 'static'], ['==', '$type', 'LineString']],
  //   layout: {
  //     'line-cap': 'round',
  //     'line-join': 'round'
  //   },
  //   paint: {
  //     'line-color': '#404040',
  //     'line-width': 2
  //   }
  // },
  {
    id: 'gl-draw-point-static',
    type: 'circle',
    filter: ['all', ['==', 'mode', 'static'], ['==', '$type', 'Point']],
    paint: {
      'circle-radius': 5,
      'circle-color': '#404040'
    }
  },
  // custom theme
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
    layout: {
      visibility: 'none'
    },
    paint: {
      'fill-color': ['get', 'user_color'],
      'fill-outline-color': ['get', 'user_color'],
      'fill-opacity': ['get', 'user_fill']
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
      ['has', 'user_width']
    ],
    layout: {
      visibility: 'none',
      'line-cap': 'round',
      'line-join': 'round'
    },
    paint: {
      'line-color': ['get', 'user_color'],
      'line-opacity': ['get', 'user_stroke'],
      'line-width': ['get', 'user_width']
    }
  },
  //Custom LineString Style
  {
    id: 'gl-draw-line-color',
    type: 'line',
    filter: [
      'all',
      ['==', '$type', 'LineString'],
      ['has', 'user_stroke'],
      ['has', 'user_color'],
      ['has', 'user_width']
    ],
    layout: {
      'line-cap': 'round',
      'line-join': 'round'
    },
    paint: {
      'line-opacity': ['get', 'user_stroke'],
      'line-color': ['get', 'user_color'],
      'line-width': ['get', 'user_width']
    }
  },
  {
    id: 'gl-draw-point-color',
    type: 'circle',
    filter: [
      'all',
      ['==', '$type', 'Point'],
      ['has', 'user_stroke'],
      ['has', 'user_stroke-width'],
      ['has', 'user_stroke-opacity']
    ],
    paint: {
      // 'circle-radius': 3,
      'circle-radius': ['get', 'user_stroke-width'],
      'circle-color': ['get', 'user_stroke'],
      'circle-opacity': ['get', 'user_stroke-opacity']
    }
  }
]

export function setStyleProperties(
  drawRef: MutableRefObject<any>,
  featureNode: FeatureNode
) {
  const existFeature = drawRef.current.get(featureNode.id)
  if (!existFeature) return

  console.log('featureNodes', featureNode)

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
        break
      case 'Point':
      case 'MultiPoint':
        drawRef.current?.setFeatureProperty(
          featureNode.id,
          'stroke',
          properties['stroke'] ? properties['stroke'] : '#ff0040'
        )
        drawRef.current?.setFeatureProperty(
          featureNode.id,
          'stroke-width',
          properties['stroke-width'] ? Number(properties['stroke-width']) : 1
        )
        drawRef.current?.setFeatureProperty(
          featureNode.id,
          'stroke-opacity',
          properties['stroke-opacity']
            ? Number(properties['stroke-opacity'])
            : 1
        )
        break
      default:
        break
    }

    const newFeature = drawRef.current.get(featureNode.id)
    drawRef.current.add(newFeature)
  }
}
