import MapboxDraw from '@mapbox/mapbox-gl-draw'
import { MutableRefObject } from 'react'
import { StateCreator } from 'zustand'

export interface DrawSlice {
  drawRef: MutableRefObject<MapboxDraw | null> | null
  setDrawRef: (ref: MutableRefObject<MapboxDraw | null>) => void
  mode: MapboxDraw.DrawMode
  setMode: (mode: MapboxDraw.DrawMode) => void
}

export const createDrawSlice: StateCreator<DrawSlice, [], [], DrawSlice> = (
  set
) => ({
  drawRef: null,
  mode: 'simple_select',
  setDrawRef: (ref: MutableRefObject<MapboxDraw | null>) =>
    set({
      drawRef: ref
    }),
  setMode: (mode: MapboxDraw.DrawMode) =>
    set({
      mode: mode
    })
})
