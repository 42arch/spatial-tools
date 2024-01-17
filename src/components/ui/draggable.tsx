import { CSSProperties, ReactNode } from 'react'
import { UniqueIdentifier, useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { Icon } from '@iconify/react'
import xIcon from '@iconify/icons-ph/x'
import { Resizable } from 're-resizable'

interface DraggableProps {
  id: UniqueIdentifier
  styles: CSSProperties
  width: number
  height: number
  name?: string
  onClose?: () => void
  children: ReactNode
}

function Draggable({
  id,
  styles,
  width,
  height,
  name,
  onClose,
  children
}: DraggableProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id })
  const style = {
    transform: CSS.Translate.toString(transform),
    ...styles
  }

  return (
    <div
      ref={setNodeRef}
      className='border border-border bg-background text-sm'
      style={{ ...style, width: width, height: height }}
    >
      {/* <Resizable
        bounds='window'
        defaultSize={{ width: width, height: height }}
        minWidth={300}
      > */}
      <div className='h-full p-2'>
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
        <div className='h-[calc(100%-24px)] w-full'>{children}</div>
      </div>
      {/* </Resizable> */}
    </div>
  )
}

export default Draggable
