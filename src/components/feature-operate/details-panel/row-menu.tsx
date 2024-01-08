import { Icon } from '@iconify/react'
import dotsThree from '@iconify/icons-ph/dots-three'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface RowMenuProps {
  className?: string
  onDelete: () => void
}

function RowMenu({ className, onDelete }: RowMenuProps) {
  const [open, setOpen] = useState(false)

  return (
    <DropdownMenu onOpenChange={setOpen}>
      <DropdownMenuTrigger>
        <Icon
          icon={dotsThree}
          width={16}
          height={16}
          className={cn('cursor-pointere', className, open ? 'visible' : '')}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          className='cursor-pointer text-xs text-destructive focus:text-destructive'
          onClick={onDelete}
        >
          Delete row
        </DropdownMenuItem>
        {/* <DropdownMenuItem className='cursor-pointer text-xs text-accent-foreground'>
          Select
        </DropdownMenuItem>
        <DropdownMenuItem className='cursor-pointer text-xs text-accent-foreground'>
          Select
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default RowMenu
