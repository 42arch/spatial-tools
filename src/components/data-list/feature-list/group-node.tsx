import { ReactNode } from 'react'
import { useToggle } from 'react-use'
import { Icon } from '@iconify/react'
import caretRightFill from '@iconify/icons-ph/caret-right-fill'
import crosshairSimple from '@iconify/icons-ph/crosshair-simple'
import { cn } from '@/lib/utils'
import GroupNodeMenu from './group-node-menu'
import { FeatureGroup, FeatureType } from '@/types'

interface GroupNodeProps {
  id: string
  data: Array<FeatureType>
  isEditing: boolean
  name: string
  onClick: () => void
  children: ReactNode
}

function GroupNode({
  id,
  data,
  name,
  isEditing = false,
  onClick,
  children
}: GroupNodeProps) {
  const [open, toggleOpen] = useToggle(false)

  const handleClick = () => {
    toggleOpen()
    onClick()
  }

  return (
    <GroupNodeMenu id={id} data={data}>
      <div className='w-full'>
        <div
          className='flex h-7 w-full cursor-pointer items-center px-2 py-[2px] hover:bg-primary/10'
          onClick={handleClick}
        >
          <Icon
            icon={caretRightFill}
            className={cn('text-muted-foreground', open ? 'rotate-90' : '')}
          />
          <span className='pl-2 text-accent-foreground' title={name}>
            {name}
          </span>
          <Icon
            icon={crosshairSimple}
            className={cn(
              'ml-2 text-sm text-accent-foreground',
              isEditing ? 'block' : 'hidden'
            )}
          />
        </div>
        {open && <>{children}</>}
      </div>
    </GroupNodeMenu>
  )
}

export default GroupNode
