import { memo, useEffect, useRef, useState } from 'react'
import MapboxDraw, {
  DrawCreateEvent,
  DrawModeChangeEvent,
  DrawSelectionChangeEvent,
  DrawUpdateEvent
} from '@mapbox/mapbox-gl-draw'
import DrawRectangle from 'mapbox-gl-draw-rectangle-mode'
import {
  CircleMode,
  DragCircleMode,
  DirectMode,
  SimpleSelectMode
} from 'mapbox-gl-draw-circle'
import { CUSTOM_STYLES } from './style-spec'
import { FeatureCollection } from 'geojson'
import { useDrawStore, useMapStore } from '@/store'
import { useFeatures } from '@/hooks/use-features'

const DrawControl = () => {
  const { mapRef } = useMapStore()
  const { setDrawRef, mode, setMode } = useDrawStore()
  const {
    features,
    addFeatures,
    updateFeatures,
    hiddenFeatureIds,
    selectedFeatureIds,
    setSelectedFeatureIds
  } = useFeatures()
  const drawRef = useRef<MapboxDraw | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    if (!drawRef.current) {
      const modes = {
        ...MapboxDraw.modes,
        draw_rectangle: DrawRectangle,
        // Todo: draw_circle needs to be fixed
        draw_circle: CircleMode,
        direct_select: DirectMode,
        simple_select: SimpleSelectMode,
        drag_circle: DragCircleMode
      }

      drawRef.current = new MapboxDraw({
        displayControlsDefault: false,
        styles: CUSTOM_STYLES,
        userProperties: true,
        modes: modes
      })

      mapRef?.current?.addControl(drawRef.current)
      if (drawRef.current) {
        setDrawRef(drawRef)
      }

      mapRef?.current?.on('draw.create', (e: DrawCreateEvent) => {
        addFeatures(e.features)
      })
      mapRef?.current?.on('draw.update', (e: DrawUpdateEvent) => {
        updateFeatures(e.features)
      })
      mapRef?.current?.on('draw.modechange', (e: DrawModeChangeEvent) =>
        setMode(e.mode)
      )

      mapRef?.current?.on(
        'draw.selectionchange',
        (e: DrawSelectionChangeEvent) => {
          const featureIds = e.features.map((f) => f.id)
          setSelectedFeatureIds(featureIds)
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
      const displayedFeatures = features.filter(
        (feature) => !hiddenFeatureIds.includes(feature.id)
      )
      const featureCollection: FeatureCollection = {
        type: 'FeatureCollection',
        features: displayedFeatures
      }
      drawRef.current.set(featureCollection)
    }
  }, [features, hiddenFeatureIds])

  useEffect(() => {
    if (selectedFeatureIds && selectedFeatureIds.length > 0) {
      if (mode === 'simple_select') {
        drawRef.current?.changeMode(mode as string, {
          featureIds: selectedFeatureIds
        })
      }
    } else {
      drawRef.current?.changeMode(mode as string)
    }
  }, [mode, selectedFeatureIds])

  if (!mounted) {
    return null
  }

  return <></>
}

export default memo(DrawControl)
