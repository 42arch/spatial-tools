import { UniqueIdentifier } from '@dnd-kit/core'
import { StateCreator } from 'zustand'

const initialViewState = {
  draggableViews: [
    {
      id: 'spatial-toolbox',
      name: 'Spatial Toolbox',
      hidden: true,
      position: {
        x: 920,
        y: 80
      }
    }
  ]
}

type DraggableView = {
  id: UniqueIdentifier
  name: string
  position: { x: number; y: number }
  hidden: boolean
}

export interface ViewSlice {
  draggableViews: Array<DraggableView>
  setDraggableViews: (draggableViews: Array<DraggableView>) => void
  updateDraggableView: (
    id: UniqueIdentifier,
    delta: { x: number; y: number }
  ) => void
  toggleDraggableView: (id: UniqueIdentifier) => void
}

export const createViewSlice: StateCreator<
  ViewSlice,
  [['zustand/immer', never]],
  [['zustand/immer', never]],
  ViewSlice
> = (set) => {
  return {
    ...initialViewState,
    setDraggableViews: (draggableViews: Array<DraggableView>) =>
      set((state) => {
        state.draggableViews = draggableViews
      }),
    updateDraggableView: (
      id: UniqueIdentifier,
      delta: { x: number; y: number }
    ) =>
      set((state) => {
        const index = state.draggableViews.findIndex((view) => view.id === id)
        if (index !== -1) {
          const position = state.draggableViews[index].position

          state.draggableViews[index].position = {
            x: (position.x += delta.x),
            y: (position.y += delta.y)
          }
        }
      }),
    toggleDraggableView: (id: UniqueIdentifier) =>
      set((state) => {
        const index = state.draggableViews.findIndex((view) => view.id === id)
        if (index !== -1) {
          state.draggableViews[index].hidden =
            !state.draggableViews[index].hidden
        }
      })
  }
}
