import { useViewStore } from '@/store'
import { UniqueIdentifier } from '@dnd-kit/core'

export default function useDraggableView() {
  const { draggableViews, updateDraggableView, toggleDraggableView } =
    useViewStore()

  const isActive = (id: UniqueIdentifier) => {
    const view = draggableViews.find((v) => v.id === id)
    return !view?.hidden
  }

  return {
    views: draggableViews,
    update: updateDraggableView,
    toggle: toggleDraggableView,
    isActive
  }
}
