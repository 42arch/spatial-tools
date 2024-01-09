import { memo, useEffect, useRef, useState } from 'react'
import MapboxDraw, {
  DrawCreateEvent,
  DrawModeChangeEvent,
  DrawSelectionChangeEvent,
  DrawUpdateEvent,
  MapboxDrawOptions
} from '@mapbox/mapbox-gl-draw'
import { FeatureNode, FeatureType } from '@/types'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import { CUSTOM_STYLES } from './style-spec'
import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson'
import { useDrawStore, useMapStore } from '@/store'

interface Porps {
  features?: FeatureType[]
  featureNodes?: FeatureNode[]
  selectedIds?: string[]
  options?: MapboxDrawOptions
  onDrawCreate?: (event: DrawCreateEvent) => void
  onDrawUpdate?: (event: DrawUpdateEvent) => void
  onModeChange?: (event: DrawModeChangeEvent) => void
  onDrawSelectionChange?: (event: DrawSelectionChangeEvent) => void
}

const DrawControl = ({
  featureNodes,
  selectedIds,
  onDrawCreate,
  onDrawUpdate,
  onDrawSelectionChange
}: Porps) => {
  const { mapRef } = useMapStore()
  const { setDrawRef, mode, setMode } = useDrawStore()
  const drawRef = useRef<MapboxDraw | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    if (!drawRef.current) {
      drawRef.current = new MapboxDraw({
        displayControlsDefault: false,
        // defaultMode: mode,
        styles: CUSTOM_STYLES,
        userProperties: true
      })

      mapRef?.current?.addControl(drawRef.current)
      if (drawRef.current) {
        setDrawRef(drawRef)
      }

      mapRef?.current?.on('draw.create', (e: DrawCreateEvent) => {
        onDrawCreate?.(e)
      })
      mapRef?.current?.on('draw.update', (e: DrawUpdateEvent) => {
        onDrawUpdate?.(e)
      })
      mapRef?.current?.on('draw.modechange', (e: DrawModeChangeEvent) =>
        setMode(e.mode)
      )

      mapRef?.current?.on(
        'draw.selectionchange',
        (e: DrawSelectionChangeEvent) => {
          onDrawSelectionChange?.(e)
        }
      )
    }

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

  useEffect(() => {
    if (drawRef.current) {
      const features = featureNodes?.filter((n) => n.visible).map((n) => n.data)
      const featureCollection: FeatureCollection<Geometry, GeoJsonProperties> =
        {
          type: 'FeatureCollection',
          features: features || []
        }

      drawRef.current.set(featureCollection)
    }
  }, [featureNodes])

  useEffect(() => {
    if (selectedIds && selectedIds.length > 0) {
      if (mode === 'simple_select') {
        drawRef.current?.changeMode(mode, {
          featureIds: selectedIds
        })
      }
    } else {
      drawRef.current?.changeMode(mode as string)
    }
  }, [mode, selectedIds])

  if (!mounted) {
    return null
  }

  return <></>
}

export default memo(DrawControl)
