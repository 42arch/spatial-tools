import { useLayerStore, useMapStore } from '@/store'
import { Feature, FeatureCollection } from 'geojson'
import { useMemo } from 'react'

export default function useLayers() {
  const { mapRef } = useMapStore()
  const {
    layers,
    hiddenLayerIds,
    toggleLayer,
    removeLayer,
    currentRemoveId,
    clearRemoveId,
    addLayer
  } = useLayerStore()

  const layerList = useMemo(() => {
    return Object.values(layers)
  }, [layers])

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
    hiddenLayerIds,
    addLayer,
    toggleLayer,
    remove: removeLayer,
    getLayer,
    getSource,
    querySourceFeatures,
    getFeatures,
    currentRemoveId,
    clearRemoveId
  }
}
