import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { ReactNode } from 'react'
import { Button } from '../ui/button'
import { Icon } from '@iconify/react'
import plusIcon from '@iconify/icons-ph/plus'
import trashIcon from '@iconify/icons-ph/trash'
import dotsSixVertical from '@iconify/icons-ph/dots-six-vertical'
import eyeIcon from '@iconify/icons-ph/eye'
import eyeClosed from '@iconify/icons-ph/eye-closed'
import LayerSelect from './layer-select'
import useMap from '@/hooks/use-map'
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { BackgroundLayer } from '@/types'
import {
  restrictToFirstScrollableAncestor,
  restrictToVerticalAxis
} from '@dnd-kit/modifiers'

type SortableItemProps = {
  layer: BackgroundLayer
}

function SortableItem({ layer }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: layer.id
  })

  const style = {
    transform: CSS.Translate.toString(transform),
    transition
  }

  const { removeBgLayer, toggleBgLayerVisibility } = useMap()

  return (
    <div
      key={layer.name}
      className='flex flex-row items-center'
      style={{ ...style }}
      ref={setNodeRef}
    >
      <Icon
        icon={dotsSixVertical}
        width={16}
        className='cursor-move outline-none'
        {...listeners}
        {...attributes}
      />
      <div className='flex w-[calc(100%-16px)] flex-col justify-evenly p-2'>
        <div className='flex items-center justify-between text-base'>
          <span>{layer.name}</span>
          <div className='flex gap-2'>
            <Icon
              icon={layer.hidden ? eyeClosed : eyeIcon}
              width={16}
              onClick={() => toggleBgLayerVisibility(layer.id)}
              className='cursor-pointer text-muted-foreground hover:text-foreground'
            />
            <Icon
              icon={trashIcon}
              width={16}
              onClick={() => removeBgLayer(layer.id)}
              className='cursor-pointer text-muted-foreground hover:text-foreground'
            />
          </div>
        </div>
        <div className='text-sm text-muted-foreground opacity-75'>
          {layer.type}
        </div>
      </div>
    </div>
  )
}

interface BackgroundLayerPorps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: ReactNode
}

function BackgroundLayer({
  open,
  onOpenChange,
  children
}: BackgroundLayerPorps) {
  const { bgLayers, setBgLayers } = useMap()

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    const activeId = active.id
    const overId = over?.id

    if (activeId && overId && activeId !== overId) {
      const oldIndex = bgLayers.findIndex((l) => l.id === activeId)
      const newIndex = bgLayers.findIndex((l) => l.id === overId)
      const orderedLayers = arrayMove(bgLayers, oldIndex, newIndex)
      setBgLayers(orderedLayers)
    }
  }

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent align='end' className='p-2'>
        <div className='select-none'>
          <div className='flex h-8 justify-between border-b border-border'>
            <h4 className='text-base font-semibold'>Background Layers</h4>
            <LayerSelect>
              <Button variant='outline' size='icon' className='h-6 w-6'>
                <Icon icon={plusIcon} />
              </Button>
            </LayerSelect>
          </div>
          <DndContext
            sensors={sensors}
            modifiers={[
              restrictToVerticalAxis,
              restrictToFirstScrollableAncestor
            ]}
            onDragStart={() => {}}
            onDragEnd={handleDragEnd}
          >
            <div className='min-h-[48px] pt-2'>
              <SortableContext
                items={bgLayers}
                strategy={verticalListSortingStrategy}
              >
                {bgLayers.map((layer) => (
                  <SortableItem key={layer.id} layer={layer} />
                ))}
              </SortableContext>
            </div>
          </DndContext>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default BackgroundLayer
