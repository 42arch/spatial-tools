import { memo, useContext, useEffect, useRef } from 'react'
import MapboxDraw, {
  DrawCreateEvent,
  DrawUpdateEvent,
  MapboxDrawOptions
} from '@mapbox/mapbox-gl-draw'
import { MapContext } from './context'

interface Porps {
  features?: any
  options?: MapboxDrawOptions
  mode?: MapboxDraw.DrawMode
  onDrawCreate?: (event: DrawCreateEvent) => void
  onDrawUpdate?: (event: DrawUpdateEvent) => void
}

const DrawControl = ({ mode, onDrawCreate, onDrawUpdate }: Porps) => {
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
      mapRef.current.on('draw.create', (e: DrawCreateEvent) => {
        onDrawCreate && onDrawCreate(e)
      })
      mapRef.current.on('draw.update', (e: DrawUpdateEvent) => {
        onDrawUpdate && onDrawUpdate(e)
      })
    }

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      mapRef.current?.removeControl(drawRef.current)
    }
  }, [mapRef, onDrawCreate, onDrawUpdate])

  useEffect(() => {
    if (drawRef.current) {
      drawRef.current.changeMode(mode)
    }
  }, [mapRef, mode])

  return <></>
}

export default memo(DrawControl)
