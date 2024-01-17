import { UniqueIdentifier } from '@dnd-kit/core'
import { StateCreator } from 'zustand'

const initialViewState = {
  draggableViews: {
    'spatial-toolbox': {
      id: 'spatial-toolbox',
      name: 'Spatial Toolbox',
      hidden: true,
      size: {
        width: 220,
        height: 320
      },
      position: {
        x: 920,
        y: 80
      }
    },
    'data-table': {
      id: 'data-table',
      name: 'Data Table',
      hidden: true,
      size: {
        width: 800,
        height: 400
      },
      position: {
        x: window.innerWidth / 2 - 400,
        y: window.innerHeight / 2 - 200
      }
    }
  }
}

type DraggableView = {
  id: UniqueIdentifier
  name: string
  size: { width: number; height: number; minWidth?: number; minHeight?: number }
  position: { x: number; y: number }
  hidden: boolean
}

export interface ViewSlice {
  draggableViews: Record<string, DraggableView>
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
    updateDraggableView: (
      id: UniqueIdentifier,
      delta: { x: number; y: number }
    ) =>
      set((state) => {
        const view = state.draggableViews[id]
        if (view) {
          const position = view.position
          view.position = {
            x: (position.x += delta.x),
            y: (position.y += delta.y)
          }
        }
      }),
    toggleDraggableView: (id: UniqueIdentifier) =>
      set((state) => {
        const view = state.draggableViews[id]
        if (view) {
          view.hidden = !view.hidden
        }
      })
  }
}
