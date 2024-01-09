'use client'

import { useMapStore } from '@/store'
import mapboxgl from 'mapbox-gl'
import { ReactNode, useEffect, useRef, useState } from 'react'

mapboxgl.accessToken =
  'pk.eyJ1IjoiaW5nZW40MiIsImEiOiJjazlsMnliMXoyMWoxM2tudm1hajRmaHZ6In0.rWx_wAz2cAeMIzxQQfPDPA'

interface Props {
  children: ReactNode
}

export default function BaseMap({ children }: Props) {
  const mapContainerRef = useRef<any>()
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const [loaded, setLoaded] = useState(false)
  const { setMapRef } = useMapStore()

  const onMapLoaded = () => {
    setLoaded(true)
  }

  useEffect(() => {
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/satellite-v9',
      center: [-91.874, 42.76],
      zoom: 12
    })
    setMapRef(mapRef)
    mapRef.current.addControl(new mapboxgl.NavigationControl(), 'top-right')
    mapRef.current.on('load', onMapLoaded)

    return () => {
      mapRef.current?.off('load', onMapLoaded)
      mapRef.current?.remove()
      setMapRef(null)
    }
  }, [])

  return (
    <div className='h-full w-full' ref={mapContainerRef}>
      {loaded && children}
    </div>
  )
}
