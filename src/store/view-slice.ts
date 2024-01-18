import { UniqueIdentifier } from '@dnd-kit/core'
import { StateCreator } from 'zustand'

const getPosition = (width: number, height: number) => {
  return typeof window !== 'undefined'
    ? {
        x: window.innerWidth / 2 - width / 2,
        y: window.innerHeight / 2 - height / 2
      }
    : {
        x: 0,
        y: 0
      }
}

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
      position: getPosition(220, 320)
    },
    'data-table': {
      id: 'data-table',
      name: 'Data Table',
      hidden: true,
      size: {
        width: 900,
        height: 600
      },
      position: getPosition(900, 600)
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
