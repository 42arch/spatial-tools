import mapboxgl from 'mapbox-gl'
import { ReactNode, useEffect, useRef, useState } from 'react'
import { MapContext } from './context'

mapboxgl.accessToken =
  'pk.eyJ1IjoiaW5nZW40MiIsImEiOiJjazlsMnliMXoyMWoxM2tudm1hajRmaHZ6In0.rWx_wAz2cAeMIzxQQfPDPA'

interface Props {
  // draw: () => void
  children: ReactNode
}

export default function BaseMap({ children }: Props) {
  const mapContainerRef = useRef<any>()
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [0, 0],
      zoom: 2
    })
    mapRef.current.addControl(new mapboxgl.NavigationControl(), 'top-right')
    mapRef.current.on('load', () => {
      setLoaded(true)
    })

    return () => mapRef.current?.remove()
  }, [])

  return (
    <MapContext.Provider
      value={{
        mapRef: mapRef
      }}
    >
      <div className='w-full h-full' ref={mapContainerRef}>
        {loaded && children}
      </div>
    </MapContext.Provider>
  )
}
