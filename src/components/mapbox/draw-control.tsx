import { useContext, useEffect } from 'react'
import MapboxDraw, { MapboxDrawOptions } from '@mapbox/mapbox-gl-draw'
import { MapContext } from './context'
import { DrawMode } from '@/types'

interface Porps {
  options?: MapboxDrawOptions
  mode?: DrawMode
}

const DrawControl = ({ options, mode }: Porps) => {
  const { mapRef } = useContext(MapContext)

  useEffect(() => {
    const draw = new MapboxDraw(options)

    if (mapRef.current) {
      console.log(draw, 2222)
      mapRef.current?.addControl(draw, 'top-left')
      // if (mode) {
      //   draw?.changeMode(mode)
      // }
    }
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      mapRef.current?.removeControl(draw)
    }
  }, [mapRef, options, mode])

  return <></>
}

export default DrawControl
