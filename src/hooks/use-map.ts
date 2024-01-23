import { useMapStore } from '@/store'
import { LngLatBoundsLike } from 'mapbox-gl'

export default function useMap() {
  const {
    mapRef,
    bgLayers,
    setBgLayers,
    // setAccessToken,
    // currentMapboxBgLayer,
    addCustomBgLayer,
    removeBgLayer,
    toggleBgLayerVisibility
    // setMapboxBgLayer
  } = useMapStore()

  const zoomToFit = (bbox: LngLatBoundsLike) => {
    mapRef?.current?.fitBounds(bbox, {
      padding: 30,
      maxZoom: 15
    })
  }

  // const currentMapboxBgLayer = currentCustomBgLayers.find(
  //   (l) => l.type === 'mapbox'
  // )

  return {
    zoomToFit,
    bgLayers,
    // currentMapboxBgLayer,
    setBgLayers,
    // setAccessToken,
    addCustomBgLayer,
    removeBgLayer,
    toggleBgLayerVisibility
  }
}
