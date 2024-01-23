import { useMapStore } from '@/store'
import { LngLatBoundsLike } from 'mapbox-gl'

export default function useMap() {
  const {
    mapRef,
    bgLayers,
    setBgLayers,
    addBgLayer,
    removeBgLayer,
    toggleBgLayerVisibility
  } = useMapStore()

  const zoomToFit = (bbox: LngLatBoundsLike) => {
    mapRef?.current?.fitBounds(bbox, {
      padding: 30,
      maxZoom: 15
    })
  }

  return {
    zoomToFit,
    bgLayers,
    setBgLayers,
    addBgLayer,
    removeBgLayer,
    toggleBgLayerVisibility
  }
}
