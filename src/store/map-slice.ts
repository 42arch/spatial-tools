import { CURRENT_BG_LAYER } from '@/lib/constants'
import { BackgroundLayer } from '@/types'
import mapboxgl from 'mapbox-gl'
import { MutableRefObject } from 'react'
import { StateCreator } from 'zustand'

const initialMapState = {
  accessToken:
    'pk.eyJ1IjoiaW5nZW40MiIsImEiOiJjazlsMnliMXoyMWoxM2tudm1hajRmaHZ6In0.rWx_wAz2cAeMIzxQQfPDPA',
  currentRemoveLayer: null,
  // currentMapboxBgLayer: CURRENT_BG_LAYER,
  currentCustomBgLayers: [CURRENT_BG_LAYER],
  currentZoom: 12,
  mapRef: null
}

export interface MapSlice {
  accessToken: string
  setAccessToken: (token: string) => void
  currentRemoveLayer: string | null
  // currentMapboxBgLayer: BackgroundLayer | null
  currentCustomBgLayers: Array<BackgroundLayer>
  // setMapboxBgLayer: (backgroundLayer: BackgroundLayer) => void
  addCustomBgLayer: (backgroundLayer: BackgroundLayer) => void
  toggleBgLayerVisibility: (name: string) => void
  removeCustomBgLayer: (name: string) => void
  currentZoom: number
  mapRef: MutableRefObject<mapboxgl.Map | null> | null
  setMapRef: (ref: MutableRefObject<mapboxgl.Map | null> | null) => void
  clearRemoveLayer: () => void
}

export const createMapSlice: StateCreator<
  MapSlice,
  [['zustand/immer', never]],
  [['zustand/immer', never]],
  MapSlice
> = (set) => ({
  ...initialMapState,
  setAccessToken: (token: string) =>
    set({
      accessToken: token
    }),
  setMapRef: (ref: MutableRefObject<mapboxgl.Map | null> | null) =>
    set({
      mapRef: ref
    }),

  // setMapboxBgLayer: (backgroundLayer: BackgroundLayer) =>
  //   set({
  //     currentMapboxBgLayer: backgroundLayer
  //   }),
  toggleBgLayerVisibility: (name: string) =>
    set((state) => {
      const layer = state.currentCustomBgLayers.find((l) => l.name === name)
      if (layer) {
        layer.hidden = !layer.hidden
      }
    }),
  addCustomBgLayer: (backgroundLayer: BackgroundLayer) =>
    set((state) => {
      if (backgroundLayer.type === 'mapbox') {
        // Only keep one mapbox layer
        const existMapboxLayer = state.currentCustomBgLayers.find(
          (l) => l.type === 'mapbox'
        )
        if (existMapboxLayer) {
          existMapboxLayer.url = backgroundLayer.url
          existMapboxLayer.name = backgroundLayer.name
        } else {
          state.currentCustomBgLayers.push(backgroundLayer)
        }
      } else {
        state.currentCustomBgLayers.unshift(backgroundLayer)
      }
    }),
  removeCustomBgLayer: (name: string) =>
    set((state) => {
      const index = state.currentCustomBgLayers.findIndex(
        (l) => l.name === name
      )
      if (index !== -1) {
        state.currentRemoveLayer = name
        state.currentCustomBgLayers.splice(index, 1)
      }
    }),
  clearRemoveLayer: () =>
    set((state) => {
      state.currentRemoveLayer = null
    })
})
