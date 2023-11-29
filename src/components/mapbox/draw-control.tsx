import { memo, useContext, useEffect, useRef } from 'react'
import MapboxDraw, {
  DrawCreateEvent,
  DrawUpdateEvent,
  MapboxDrawOptions
} from '@mapbox/mapbox-gl-draw'
import { MapContext } from './context'
import { FeatureNode } from '@/types'

function noop(): void {
  /* do nothing */
}

interface Porps {
  features?: FeatureNode[]
  options?: MapboxDrawOptions
  mode?: MapboxDraw.DrawMode
  onDrawCreate?: (event: DrawCreateEvent) => void
  onDrawUpdate?: (event: DrawUpdateEvent) => void
}

const DrawControl = ({ features, mode, onDrawCreate, onDrawUpdate }: Porps) => {
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
    }

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      mapRef.current?.removeControl(drawRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapRef])

  useEffect(() => {
    if (mapRef.current && drawRef.current) {
      drawRef.current.changeMode(mode)
    }
  }, [mapRef, mode])

  return <></>
}

export default memo(DrawControl)
