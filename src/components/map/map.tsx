'use client'

import useLayers from '@/hooks/use-layers'
import env from '@/lib/env'
import { loadAndComposeStyle } from '@/lib/background-layer'
import {
  DEFAULT_COLOR,
  DEFAULT_FILL_OPACITY,
  DEFAULT_STROKE_WIDTH
} from '@/lib/style'
import { useMapStore } from '@/store'
import mapboxgl from 'mapbox-gl'
import { ReactNode, useEffect, useRef, useState } from 'react'

mapboxgl.accessToken = env.NEXT_PUBLIC_MAPBOX_TOKEN
interface Props {
  children: ReactNode
}
const types = ['point', 'line', 'fill']

export default function BaseMap({ children }: Props) {
  const mapContainerRef = useRef<any>()
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const map = mapRef.current
  const [loaded, setLoaded] = useState(false)
  const { setMapRef, bgLayers, currentZoom } = useMapStore()

  const { layerList, currentRemoveId, clearRemoveId, hiddenLayerIds } =
    useLayers()

  const onMapLoaded = () => {
    setLoaded(true)
  }

  useEffect(() => {
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: [-91.874, 42.76],
      zoom: currentZoom,
      projection: {
        name: 'mercator'
      }
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

  useEffect(() => {
    async function setStyle() {
      const style = await loadAndComposeStyle(bgLayers)
      map?.setStyle(style)
    }
    setStyle()
  }, [bgLayers, map])

  useEffect(() => {
    if (mapRef.current) {
      // remove layer
      if (currentRemoveId) {
        types.forEach((type) => {
          if (mapRef.current?.getLayer(`${currentRemoveId}-${type}`)) {
            mapRef.current?.removeLayer(`${currentRemoveId}-${type}`)
            clearRemoveId()
          }
        })
      }

      // render layer
      layerList.forEach((layer) => {
        if (!mapRef.current?.getLayer(`${layer.id}-point`)) {
          mapRef.current?.addLayer({
            id: `${layer.id}-point`,
            type: 'circle',
            source: {
              type: 'geojson',
              data: layer.data
            },
            filter: ['==', '$type', 'Point'],
            paint: {
              'circle-radius': 4,
              'circle-stroke-width': 1,
              'circle-stroke-color': '#fff',
              'circle-color': DEFAULT_COLOR
            }
          })
        }
        if (!mapRef.current?.getLayer(`${layer.id}-line`)) {
          mapRef.current?.addLayer({
            id: `${layer.id}-line`,
            type: 'line',
            source: {
              type: 'geojson',
              data: layer.data
            },
            filter: ['==', '$type', 'LineString'],
            layout: {
              'line-cap': 'round',
              'line-join': 'round'
            },
            paint: {
              'line-color': DEFAULT_COLOR,
              'line-width': DEFAULT_STROKE_WIDTH
            }
          })
        }
        if (!mapRef.current?.getLayer(`${layer.id}-fill`)) {
          mapRef.current?.addLayer({
            id: `${layer.id}-fill`,
            type: 'fill',
            source: {
              type: 'geojson',
              data: layer.data
            },
            filter: ['==', '$type', 'Polygon'],
            paint: {
              'fill-color': DEFAULT_COLOR,
              'fill-opacity': DEFAULT_FILL_OPACITY
            }
          })
        }

        // toggle visibility
        if (hiddenLayerIds.includes(layer.id)) {
          types.forEach((type) => {
            if (mapRef.current?.getLayer(`${layer.id}-${type}`)) {
              mapRef.current?.setLayoutProperty(
                `${layer.id}-${type}`,
                'visibility',
                'none'
              )
            }
          })
        } else {
          types.forEach((type) => {
            if (mapRef.current?.getLayer(`${layer.id}-${type}`)) {
              mapRef.current?.setLayoutProperty(
                `${layer.id}-${type}`,
                'visibility',
                'visible'
              )
            }
          })
        }
      })
    }
  }, [layerList, currentRemoveId, hiddenLayerIds, clearRemoveId])

  return (
    <div className='h-full w-full' ref={mapContainerRef}>
      {loaded && children}
    </div>
  )
}
