'use client'

import {
  MutableRefObject,
  memo,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from 'react'
import MapboxDraw, {
  DrawCreateEvent,
  DrawSelectionChangeEvent,
  DrawUpdateEvent,
  MapboxDrawOptions
} from '@mapbox/mapbox-gl-draw'
import type { FeatureCollection } from 'geojson'
import { MapContext } from './context'
import { FeatureNode, FeatureType } from '@/types'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'

// feature styles
const styles: object[] = [
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
  {
    id: 'gl-draw-polygon-stroke-active',
    type: 'line',
    filter: [
      'all',
      ['==', 'active', 'true'],
      ['==', '$type', 'Polygon'],
      ['has', 'user_stroke'],
      ['has', 'user_stroke-width']
    ],
    layout: {
      'line-cap': 'round',
      'line-join': 'round'
    },
    paint: {
      // 'line-color': '#fbb03b',
      'line-opacity': 0.3,
      'line-color': ['get', 'user_stroke'],
      'line-width': ['get', 'user_stroke-width'],
      'line-dasharray': [0.2, 2]
    }
  },
  {
    id: 'gl-draw-line-inactive',
    type: 'line',
    filter: [
      'all',
      ['==', 'active', 'false'],
      ['==', '$type', 'LineString'],
      ['!=', 'mode', 'static']
    ],
    layout: {
      'line-cap': 'round',
      'line-join': 'round'
    },
    paint: {
      'line-color': '#3bb2d0',
      'line-width': 2
    }
  },
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
  {
    id: 'gl-draw-polygon-fill-static',
    type: 'fill',
    filter: ['all', ['==', 'mode', 'static'], ['==', '$type', 'Polygon']],
    paint: {
      'fill-color': '#404040',
      'fill-outline-color': '#404040',
      'fill-opacity': 0.1
    }
  },
  {
    id: 'gl-draw-polygon-stroke-static',
    type: 'line',
    filter: ['all', ['==', 'mode', 'static'], ['==', '$type', 'Polygon']],
    layout: {
      'line-cap': 'round',
      'line-join': 'round'
    },
    paint: {
      'line-color': '#404040',
      'line-width': 2
    }
  },
  {
    id: 'gl-draw-line-static',
    type: 'line',
    filter: ['all', ['==', 'mode', 'static'], ['==', '$type', 'LineString']],
    layout: {
      'line-cap': 'round',
      'line-join': 'round'
    },
    paint: {
      'line-color': '#404040',
      'line-width': 2
    }
  },
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
    id: 'gl-draw-polygon-fill', // gl-draw-polygon-color-picker
    type: 'fill',
    filter: [
      'all',
      ['==', '$type', 'Polygon'],
      ['has', 'user_fill'],
      ['has', 'user_stroke'],
      ['has', 'user_fill-opacity']
    ],
    paint: {
      'fill-color': ['get', 'user_fill'],
      'fill-outline-color': ['get', 'user_stroke'],
      'fill-opacity': ['get', 'user_fill-opacity']
    }
  },
  {
    id: 'gl-draw-polygon-stroke-inactive',
    type: 'line',
    filter: [
      'all',
      ['==', 'active', 'false'],
      ['==', '$type', 'Polygon'],
      ['!=', 'mode', 'static'],
      ['has', 'user_stroke'],
      ['has', 'user_stroke-width']
    ],
    layout: {
      'line-cap': 'round',
      'line-join': 'round'
    },
    paint: {
      'line-color': ['get', 'user_stroke'],
      'line-width': ['get', 'user_stroke-width']
    }
  },
  {
    id: 'gl-draw-line-color',
    type: 'line',
    filter: [
      'all',
      ['==', '$type', 'LineString'],
      ['has', 'user_stroke'],
      ['has', 'user_stroke-width']
    ],
    paint: {
      'line-color': ['get', 'user_stroke'],
      'line-width': ['get', 'user_stroke-width']
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

function setStyleProperties(
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
          'fill',
          properties?.fill ? properties.fill : '#ff0040'
        )
        drawRef.current?.setFeatureProperty(
          featureNode.id,
          'stroke',
          properties?.stroke ? properties.stroke : '#ff0040'
        )
        drawRef.current?.setFeatureProperty(
          featureNode.id,
          'stroke-width',
          properties['stroke-width'] ? Number(properties['stroke-width']) : 2
        )
        drawRef.current?.setFeatureProperty(
          featureNode.id,
          'fill-opacity',
          properties['fill-opacity'] ? Number(properties['fill-opacity']) : 0.1
        )
        break
      case 'LineString':
      case 'MultiLineString':
        drawRef.current?.setFeatureProperty(
          existFeature?.id,
          'stroke',
          properties['stroke'] ? properties['stroke'] : '#ff0040'
        )
        drawRef.current?.setFeatureProperty(
          existFeature?.id,
          'stroke-width',
          properties['stroke-width'] ? Number(properties['stroke-width']) : 1
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

function noop(): void {
  /* do nothing */
}

interface Porps {
  features?: FeatureType[]
  featureNodes?: FeatureNode[]
  selectedIds?: string[]
  options?: MapboxDrawOptions
  mode?: MapboxDraw.DrawMode
  onDrawCreate?: (event: DrawCreateEvent) => void
  onDrawUpdate?: (event: DrawUpdateEvent) => void
  onDrawSelectionChange?: (event: DrawSelectionChangeEvent) => void
}

const DrawControl = ({
  features,
  featureNodes,
  selectedIds,
  mode,
  onDrawCreate,
  onDrawUpdate,
  onDrawSelectionChange
}: Porps) => {
  const { mapRef } = useContext(MapContext)
  const drawRef = useRef<any>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    if (!drawRef.current) {
      drawRef.current = new MapboxDraw({
        displayControlsDefault: false,
        styles: styles,
        userProperties: true
      })

      mapRef.current?.addControl(drawRef.current)

      mapRef.current?.on('draw.create', (e: DrawCreateEvent) => {
        onDrawCreate && onDrawCreate(e)
      })
      mapRef.current?.on('draw.update', (e: DrawUpdateEvent) => {
        onDrawUpdate && onDrawUpdate(e)
      })
      mapRef.current?.on(
        'draw.selectionchange',
        (e: DrawSelectionChangeEvent) => {
          onDrawSelectionChange && onDrawSelectionChange(e)
        }
      )

      // mapRef.current?.on('draw.create', onDrawCreate || noop)
      // mapRef.current?.on('draw.update', onDrawUpdate || noop)
      // mapRef.current?.on('draw.selectionchange', onDrawSelectionChange || noop)
    }
    // if (mapRef.current) {
    //   // mapRef.current.addControl(drawRef.current)
    //   // mapRef.current.on('draw.create', onDrawCreate || noop)
    //   // mapRef.current.on('draw.update', onDrawUpdate || noop)
    //   // mapRef.current.on('draw.selectionchange', onDrawSelectionChange || noop)
    // }

    // return () => {
    //   mapRef.current?.off('draw.create', onDrawCreate || noop)
    //   mapRef.current?.off('draw.update', onDrawUpdate || noop)
    //   mapRef.current?.off('draw.selectionchange', onDrawSelectionChange || noop)
    //   // eslint-disable-next-line react-hooks/exhaustive-deps
    //   // if (mapRef.current && drawRef.current) {
    //   //   mapRef.current?.removeControl(drawRef.current)
    //   // }
    // }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapRef])

  // control the display of features
  useLayoutEffect(() => {
    if (drawRef.current) {
      const drawFeatures = drawRef.current.getAll() as FeatureCollection
      const featureIds = drawFeatures.features.map((f) => f.id)
      const displayFeatureIds = featureNodes
        ?.filter((n) => !featureIds.includes(n.id))
        .map((n) => n.id)
      featureNodes?.forEach((node) => {
        if (!node.visible) {
          console.log(221112222, node, drawFeatures)

          setStyleProperties(drawRef, node)
          drawRef.current.delete(node.id)
        } else {
          if (displayFeatureIds?.includes(node.id)) {
            // const feature = drawRef.current.get(node.id)
            const feature = featureNodes.find((n) => n.id === node.id)?.data
            drawRef.current.add(feature)
          }
          setStyleProperties(drawRef, node)
        }
      })
    }
  }, [featureNodes])

  useEffect(() => {
    if (selectedIds && selectedIds?.length > 0) {
      if (mode === 'simple_select') {
        drawRef.current?.changeMode(mode, {
          featureIds: selectedIds
        })
      }
    } else {
      drawRef.current?.changeMode(mode)
    }
  }, [mode, selectedIds])

  if (!mounted) {
    return null
  }

  return <></>
}

export default memo(DrawControl)
