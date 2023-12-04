import { memo, useContext, useEffect, useRef } from 'react'
import MapboxDraw, {
  DrawCreateEvent,
  DrawSelectionChangeEvent,
  DrawUpdateEvent,
  MapboxDrawOptions
} from '@mapbox/mapbox-gl-draw'
import type { FeatureCollection } from 'geojson'
import { MapContext } from './context'
import { FeatureNode, FeatureType } from '@/types'

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
  featureNodes,
  selectedIds,
  mode,
  onDrawCreate,
  onDrawUpdate,
  onDrawSelectionChange
}: Porps) => {
  const { mapRef } = useContext(MapContext)
  const drawRef = useRef<any>(null)

  useEffect(() => {
    if (!drawRef.current) {
      drawRef.current = new MapboxDraw({
        displayControlsDefault: false
      })
    }
    if (mapRef.current) {
      mapRef.current.addControl(drawRef.current)
      mapRef.current.on('draw.create', onDrawCreate || noop)
      mapRef.current.on('draw.update', onDrawUpdate || noop)
      mapRef.current.on('draw.selectionchange', onDrawSelectionChange || noop)
    }

    return () => {
      mapRef.current?.off('draw.create', onDrawCreate || noop)
      mapRef.current?.off('draw.update', onDrawUpdate || noop)
      mapRef.current?.off('draw.selectionchange', onDrawSelectionChange || noop)
      // eslint-disable-next-line react-hooks/exhaustive-deps
      mapRef.current?.removeControl(drawRef.current)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapRef])

  // control the display of features
  useEffect(() => {
    if (drawRef.current) {
      const drawFeatures = drawRef.current.getAll() as FeatureCollection
      const featureIds = drawFeatures.features.map((f) => f.id)
      const displayFeatureIds = featureNodes
        ?.filter((n) => !featureIds.includes(n.id))
        .map((n) => n.id)
      featureNodes?.forEach((node) => {
        if (!node.visible) {
          drawRef.current.delete(node.id)
        } else {
          if (displayFeatureIds?.includes(node.id)) {
            drawRef.current.add(node.data)
          }
        }
      })
    }
  }, [featureNodes])

  useEffect(() => {
    if (mapRef.current && drawRef.current) {
      if (selectedIds && selectedIds?.length > 0) {
        // should do nothing
        // drawRef.current.changeMode(mode, {
        //   featureIds: selectedIds
        // })
      } else {
        drawRef.current.changeMode(mode)
      }
    }
  }, [mapRef, mode, selectedIds])

  return <></>
}

export default memo(DrawControl)
