import mapboxgl from 'mapbox-gl'
import { MutableRefObject } from 'react'
import { StateCreator } from 'zustand'

export interface MapSlice {
  mapRef: MutableRefObject<mapboxgl.Map | null> | null
  setMapRef: (ref: MutableRefObject<mapboxgl.Map | null> | null) => void
}

export const createMapSlice: StateCreator<MapSlice, [], [], MapSlice> = (
  set
) => ({
  mapRef: null,
  setMapRef: (ref: MutableRefObject<mapboxgl.Map | null> | null) =>
    set({
      mapRef: ref
    })
})
