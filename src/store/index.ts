import { create } from 'zustand'
import { FeatureSlice, createFeatureSlice } from './feature-slice'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

export const useBoundStore = create<FeatureSlice>()(
  persist(
    immer((...a) => ({
      ...createFeatureSlice(...a)
    })),
    { name: 'bound-store' }
  )
)
