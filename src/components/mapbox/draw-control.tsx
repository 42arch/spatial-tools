import { useContext, useEffect } from 'react'
import MapboxDraw from '@mapbox/mapbox-gl-draw'
import { MapContext } from './context'

const DrawControl = () => {
  const { mapRef } = useContext(MapContext)

  useEffect(() => {
    const draw = new MapboxDraw()

    if (mapRef.current) {
      mapRef.current?.addControl(draw, 'top-left')
    }
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      mapRef.current?.removeControl(draw)
    }
  }, [mapRef])

  return <></>
}

export default DrawControl
