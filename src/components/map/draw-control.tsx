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
import { CUSTOM_STYLES, setStyleProperties } from './style-spec'

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
        styles: CUSTOM_STYLES,
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
      // if (mode === 'simple_select') {
      //   drawRef.current?.changeMode(mode, {
      //     featureIds: selectedIds
      //   })
      // }
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
