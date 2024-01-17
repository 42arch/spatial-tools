import { useViewStore } from '@/store'
import { UniqueIdentifier } from '@dnd-kit/core'

export default function useDraggableView() {
  const { draggableViews, updateDraggableView, toggleDraggableView } =
    useViewStore()

  const viewList = Object.values(draggableViews)

  const isActive = (id: UniqueIdentifier) => {
    const view = draggableViews[id]
    return !view?.hidden
  }

  return {
    viewList: viewList,
    update: updateDraggableView,
    toggle: toggleDraggableView,
    isActive
  }
}
