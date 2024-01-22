import { useMapStore } from '@/store'
import { LngLatBoundsLike } from 'mapbox-gl'

export default function useMap() {
  const {
    mapRef,
    currentCustomBgLayers,
    // currentMapboxBgLayer,
    addCustomBgLayer,
    removeCustomBgLayer,
    toggleBgLayerVisibility
    // setMapboxBgLayer
  } = useMapStore()

  const zoomToFit = (bbox: LngLatBoundsLike) => {
    mapRef?.current?.fitBounds(bbox, {
      padding: 30,
      maxZoom: 15
    })
  }

  const currentMapboxBgLayer = currentCustomBgLayers.find(
    (l) => l.type === 'mapbox'
  )

  return {
    zoomToFit,
    currentCustomBgLayers,
    currentMapboxBgLayer,
    addCustomBgLayer,
    removeCustomBgLayer,
    toggleBgLayerVisibility
    // setMapboxBgLayer
  }
}
