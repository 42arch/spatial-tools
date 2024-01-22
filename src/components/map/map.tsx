'use client'

import useLayers from '@/hooks/use-layers'
import useMap from '@/hooks/use-map'
import {
  DEFAULT_COLOR,
  DEFAULT_FILL_OPACITY,
  DEFAULT_STROKE_WIDTH
} from '@/lib/style'
import { useMapStore } from '@/store'
import mapboxgl from 'mapbox-gl'
import { ReactNode, useEffect, useRef, useState } from 'react'

mapboxgl.accessToken =
  'pk.eyJ1IjoiaW5nZW40MiIsImEiOiJjazlsMnliMXoyMWoxM2tudm1hajRmaHZ6In0.rWx_wAz2cAeMIzxQQfPDPA'

interface Props {
  children: ReactNode
}
const types = ['point', 'line', 'fill']

export default function BaseMap({ children }: Props) {
  const mapContainerRef = useRef<any>()
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const [loaded, setLoaded] = useState(false)
  const {
    setMapRef,
    currentRemoveLayer,
    clearRemoveLayer,
    // currentMapboxBgLayer,
    currentCustomBgLayers,
    currentZoom
  } = useMapStore()

  const { currentMapboxBgLayer } = useMap()
  const { layerList, currentRemoveId, clearRemoveId, hiddenLayerIds } =
    useLayers()

  const onMapLoaded = () => {
    setLoaded(true)

    // mapRef.current?.addSource('osm-tiles', {
    //   type: 'raster',
    //   tiles: ['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'],
    //   tileSize: 256
    // })

    // mapRef.current?.addLayer({
    //   id: 'osm-layer',
    //   type: 'raster',
    //   source: 'osm-tiles',
    //   minzoom: 0,
    //   maxzoom: 22
    // })
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
    console.log('mapbox layer change')
    if (currentMapboxBgLayer) {
      mapRef.current?.setStyle(currentMapboxBgLayer.url)
    }
  }, [currentMapboxBgLayer])

  useEffect(() => {
    if (currentRemoveLayer) {
      if (mapRef.current?.getLayer(currentRemoveLayer)) {
        mapRef.current?.removeLayer(currentRemoveLayer)
        clearRemoveLayer()
        console.log(9999, mapRef.current?.getStyle())
      }
    }

    if (currentCustomBgLayers.length) {
      // mapRef.current?.setStyle(currentMapboxBgLayer.url)
      currentCustomBgLayers.forEach((layer) => {
        if (layer.type === 'xyz') {
          if (!mapRef.current?.getLayer(layer.name)) {
            mapRef.current?.addLayer({
              id: layer.name,
              type: 'raster',
              source: {
                type: 'raster',
                tiles: [layer.url],
                tileSize: 256
              },
              minzoom: 0,
              maxzoom: 22
            })
          } else {
            mapRef.current?.setLayoutProperty(
              layer.name,
              'visibility',
              layer.hidden ? 'none' : 'visible'
            )
          }
        }
      })
    }
  }, [clearRemoveLayer, currentCustomBgLayers, currentRemoveLayer])

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
