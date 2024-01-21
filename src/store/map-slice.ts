import { CURRENT_BG_LAYER } from '@/lib/constants'
import { BackgroundLayer } from '@/types'
import mapboxgl from 'mapbox-gl'
import { MutableRefObject } from 'react'
import { StateCreator } from 'zustand'

const initialMapState = {
  currentBackgroundLayer: CURRENT_BG_LAYER,
  currentZoom: 12,
  mapRef: null
}

export interface MapSlice {
  currentBackgroundLayer: BackgroundLayer
  setBackgroundLayer: (backgroundLayer: BackgroundLayer) => void
  currentZoom: number
  mapRef: MutableRefObject<mapboxgl.Map | null> | null
  setMapRef: (ref: MutableRefObject<mapboxgl.Map | null> | null) => void
}

export const createMapSlice: StateCreator<MapSlice, [], [], MapSlice> = (
  set
) => ({
  ...initialMapState,
  setMapRef: (ref: MutableRefObject<mapboxgl.Map | null> | null) =>
    set({
      mapRef: ref
    }),
  setBackgroundLayer: (backgroundLayer: BackgroundLayer) =>
    set({
      currentBackgroundLayer: backgroundLayer
    })
})
