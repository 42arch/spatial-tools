import { ReactNode } from 'react'
import { useToggle } from 'react-use'
import { Icon } from '@iconify/react'
import caretDown from '@iconify/icons-ph/caret-down'
import caretUp from '@iconify/icons-ph/caret-up'
import penIcon from '@iconify/icons-ph/pen'

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
  const [isOpen, toggleOpen] = useToggle(false)

  return (
    <div className='w-full'>
      <div
        className='w-full flex justify-between items-center px-2 h-8  cursor-pointer'
        onClick={onClick}
      >
        <span className='' title={label}>
          {label}
        </span>
        <div className='flex gap-2'>
          {isEditing && <Icon width={14} icon={penIcon} />}
          <Icon
            width={14}
            icon={isOpen ? caretUp : caretDown}
            onClick={toggleOpen}
          />
        </div>
      </div>
      {isOpen && <div className='mx-2'>{children}</div>}
    </div>
  )
}

export default GroupFolder
