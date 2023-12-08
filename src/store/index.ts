import { create } from 'zustand'
import { FeatureSlice, createFeatureSlice } from './feature-slice'
// import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

export const useFeatureStore = create<FeatureSlice>()(
  immer((...a) => ({
    ...createFeatureSlice(...a)
  }))
)
