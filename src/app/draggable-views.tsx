import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { restrictToWindowEdges } from '@dnd-kit/modifiers'
import Draggable from '@/components/ui/draggable'
import SpatialToolbox from '@/components/spatial-toolbox'
import useView from '@/hooks/use-draggable-view'
import { ReactNode } from 'react'
import DataTable from '@/components/data-table'

const viewMap: Record<string, ReactNode> = {
  'spatial-toolbox': <SpatialToolbox />,
  'data-table': <DataTable />
}

function DraggableViews() {
  const { viewList, update, toggle } = useView()

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
    <DndContext
      onDragEnd={handleDragEnd}
      sensors={sensors}
      modifiers={[restrictToWindowEdges]}
    >
      {viewList
        .filter((view) => !view.hidden)
        .map((view) => (
          <Draggable
            key={view.id}
            id={view.id}
            name={view.name}
            width={view.size.width}
            height={view.size.height}
            styles={{
              position: 'absolute',
              left: `${view.position.x}px`,
              top: `${view.position.y}px`
            }}
            onClose={() => toggle(view.id)}
          >
            {viewMap[view.id]}
          </Draggable>
        ))}
    </DndContext>
  )
}

export default DraggableViews
