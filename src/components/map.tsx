import mapboxgl from 'mapbox-gl'
import { useEffect, useRef } from 'react'

mapboxgl.accessToken =
  'pk.eyJ1IjoiaW5nZW40MiIsImEiOiJjazlsMnliMXoyMWoxM2tudm1hajRmaHZ6In0.rWx_wAz2cAeMIzxQQfPDPA'

export default function BaseMap() {
  const mapContainerRef = useRef<any>()
  // const map = useRef<mapboxgl.Map | null>(null)

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [0, 0],
      zoom: 2
    })

    map.addControl(new mapboxgl.NavigationControl(), 'top-right')

    return () => map.remove()
  }, [])

  return <div className='w-full h-full' ref={mapContainerRef} />
}
