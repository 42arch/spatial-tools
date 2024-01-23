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
  bgLayers: [CURRENT_BG_LAYER],
  currentZoom: 12,
  mapRef: null
}

export interface MapSlice {
  // accessToken: string
  // setAccessToken: (token: string) => void
  // currentRemoveLayer: string | null
  // currentMapboxBgLayer: BackgroundLayer | null
  bgLayers: Array<BackgroundLayer>
  setBgLayers: (layers: Array<BackgroundLayer>) => void
  // setMapboxBgLayer: (backgroundLayer: BackgroundLayer) => void
  addBgLayer: (layer: BackgroundLayer) => void
  toggleBgLayerVisibility: (id: string) => void
  removeBgLayer: (id: string) => void
  currentZoom: number
  mapRef: MutableRefObject<mapboxgl.Map | null> | null
  setMapRef: (ref: MutableRefObject<mapboxgl.Map | null> | null) => void
  // clearRemoveLayer: () => void
}

export const createMapSlice: StateCreator<
  MapSlice,
  [['zustand/immer', never]],
  [['zustand/immer', never]],
  MapSlice
> = (set) => ({
  ...initialMapState,
  // setAccessToken: (token: string) =>
  //   set({
  //     accessToken: token
  //   }),
  setMapRef: (ref: MutableRefObject<mapboxgl.Map | null> | null) =>
    set({
      mapRef: ref
    }),
  setBgLayers: (layers: Array<BackgroundLayer>) =>
    set({
      bgLayers: layers
    }),
  toggleBgLayerVisibility: (id: string) =>
    set((state) => {
      const layer = state.bgLayers.find((l) => l.id === id)
      if (layer) {
        layer.hidden = !layer.hidden
      }
    }),
  addBgLayer: (layer: BackgroundLayer) =>
    set((state) => {
      if (layer.type === 'mapbox') {
        // Only keep one mapbox layer
        const existMapboxLayer = state.bgLayers.find((l) => l.type === 'mapbox')
        if (existMapboxLayer) {
          existMapboxLayer.id = layer.id
          existMapboxLayer.url = layer.url
          existMapboxLayer.name = layer.name
        } else {
          state.bgLayers.push(layer)
        }
      } else {
        state.bgLayers.unshift(layer)
      }
    }),
  removeBgLayer: (id: string) =>
    set((state) => {
      const index = state.bgLayers.findIndex((l) => l.id === id)
      if (index !== -1) {
        // state.currentRemoveLayer = name
        state.bgLayers.splice(index, 1)
      }
    })
  // clearRemoveLayer: () =>
  //   set((state) => {
  //     state.currentRemoveLayer = null
  //   })
})
