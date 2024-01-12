import { CSSProperties, ReactNode } from 'react'
import { UniqueIdentifier, useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { Icon } from '@iconify/react'
import xIcon from '@iconify/icons-ph/x'

interface DraggableProps {
  id: UniqueIdentifier
  styles: CSSProperties
  name?: string
  onClose?: () => void
  children: ReactNode
}

function Draggable({ id, styles, name, onClose, children }: DraggableProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id })
  const style = {
    transform: CSS.Translate.toString(transform),
    ...styles
  }

  return (
    <div
      ref={setNodeRef}
      className='min-w-[240px] border border-border bg-background p-2 text-sm'
      style={style}
    >
      <div className='flex h-6 flex-row border-b'>
        <div
          className='w-[calc(100%-16px)] cursor-move'
          {...listeners}
          {...attributes}
        >
          {name}
        </div>
        <Icon
          icon={xIcon}
          width={16}
          className='cursor-pointer hover:text-muted-foreground'
          onClick={onClose}
        />
      </div>
      {children}
    </div>
  )
}

export default Draggable
