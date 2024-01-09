import { Icon } from '@iconify/react'
import caretRightFill from '@iconify/icons-ph/caret-right-fill'
import { useToggle } from 'react-use'
import { cn } from '@/lib/utils'

function LayerList() {
  const [open, toggleOpen] = useToggle(false)

  return (
    <div className='w-full select-none'>
      <div
        className='flex h-8 cursor-pointer flex-row items-center text-sm text-muted-foreground'
        onClick={toggleOpen}
      >
        <Icon
          icon={caretRightFill}
          className={cn('text-xs', open ? 'rotate-90' : '')}
        />
        <span className='pl-2'>Layers</span>
      </div>
      <div className={cn('ml-2 text-sm', open ? 'block' : 'hidden')}></div>
    </div>
  )
}

export default LayerList
