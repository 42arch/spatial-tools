import { DEFAULT_COLOR } from '@/lib/style'
import { useLayerStore, useMapStore } from '@/store'
import { layer } from '@uiw/react-codemirror'
import { Feature, FeatureCollection } from 'geojson'
import { PointLike } from 'mapbox-gl'
import { nanoid } from 'nanoid'
import { useMemo } from 'react'

export default function useLayers() {
  const { mapRef } = useMapStore()
  const { layers, addLayer: addLayerToStore } = useLayerStore()

  const layerList = useMemo(() => {
    return Object.values(layers)
  }, [layers])

  const addLayer = (name: string, data: FeatureCollection) => {
    if (mapRef?.current) {
      const id = nanoid()
      // mapRef.current.addSource(id, {
      //   type: 'geojson',
      //   data: data
      // })
      mapRef.current.addLayer({
        id: id,
        type: 'circle',
        source: {
          type: 'geojson',
          data: data
        },
        paint: {
          'circle-radius': 4,
          'circle-stroke-width': 1,
          'circle-stroke-color': '#fff',
          'circle-color': DEFAULT_COLOR
        }
      })
      addLayerToStore(id, name, layer)
      // const bounds = mapRef.current.querySourceFeatures(id)
      // mapRef.current.fitBounds(bounds[0].geometry.bbox?.[0])
    }
  }

  const getLayer = (id: string) => {
    return mapRef?.current?.getLayer(id)
  }

  const getSource = (id: string) => {
    return mapRef?.current?.getSource(id)
  }

  const getFeatures = (id: string) => {
    const source = getSource(id) as any
    return source._data.features as Array<Feature>
  }

  const querySourceFeatures = (
    id: string,
    params?: { filter: Array<any>; sourceLayer: string; validate: boolean }
  ) => {
    return mapRef?.current?.querySourceFeatures(id, params)
  }

  return {
    layerList,
    addLayer,
    getLayer,
    getSource,
    querySourceFeatures,
    getFeatures
  }
}
