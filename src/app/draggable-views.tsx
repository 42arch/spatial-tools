import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import Draggable from '@/components/ui/draggable'
import SpatialToolbox from '@/components/spatial-toolbox'
import useView from '@/hooks/use-draggable-view'

function DraggableViews() {
  const { views, update, toggle } = useView()

  const sensors = useSensors(
    useSensor(KeyboardSensor),
    useSensor(TouchSensor),
    useSensor(MouseSensor)
  )

  const handleDragEnd = (e: DragEndEvent) => {
    const activeId = e.active.id
    update(activeId, e.delta)
  }

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
      {views
        .filter((view) => !view.hidden)
        .map((view) => (
          <Draggable
            key={view.id}
            id={view.id}
            name={view.name}
            styles={{
              position: 'absolute',
              left: `${view.position.x}px`,
              top: `${view.position.y}px`
            }}
            onClose={() => toggle(view.id)}
          >
            <SpatialToolbox />
          </Draggable>
        ))}
    </DndContext>
  )
}

export default DraggableViews
