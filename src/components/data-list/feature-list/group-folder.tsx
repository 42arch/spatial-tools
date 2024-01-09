import { ReactNode } from 'react'
import { useToggle } from 'react-use'
import { Icon } from '@iconify/react'
import caretRightFill from '@iconify/icons-ph/caret-right-fill'
import crosshairSimple from '@iconify/icons-ph/crosshair-simple'
import { cn } from '@/lib/utils'

interface GroupFolderProps {
  isEditing: boolean
  label: string
  onClick: () => void
  children: ReactNode
}

function GroupFolder({
  label,
  isEditing = false,
  onClick,
  children
}: GroupFolderProps) {
  const [open, toggleOpen] = useToggle(false)

  const handleClick = () => {
    toggleOpen()
    onClick()
  }

  return (
    <div className='w-full'>
      <div
        className='flex h-7 w-full cursor-pointer items-center px-2 py-[2px]'
        onClick={handleClick}
      >
        <Icon
          icon={caretRightFill}
          className={cn('text-muted-foreground', open ? 'rotate-90' : '')}
        />
        <span className='pl-2 text-accent-foreground' title={label}>
          {label}
        </span>
        <Icon
          icon={crosshairSimple}
          className={cn('ml-2 text-sm', isEditing ? 'block' : 'hidden')}
        />
      </div>
      {open && <>{children}</>}
    </div>
  )
}

export default GroupFolder
