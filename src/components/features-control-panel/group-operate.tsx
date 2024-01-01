import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Icon } from '@iconify/react'
import folderPlus from '@iconify/icons-ph/folder-plus'
import { Input } from '@/components/ui/input'
import { Button } from '../ui/button'
import { useState } from 'react'
import { useToggle } from 'react-use'

interface GroupOperateProps {
  onAddNew: (label: string) => void
}

function GroupOperate({ onAddNew }: GroupOperateProps) {
  const [newPopoverOpen, toggleNewPopover] = useToggle(false)
  const [groupLabel, setGroupLabel] = useState<string>('')

  return (
    <div className='flex h-6 w-full items-center justify-between px-2'>
      <div></div>
      <div>
        <Popover open={newPopoverOpen} onOpenChange={toggleNewPopover}>
          <PopoverTrigger>
            <Icon
              className='cursor-pointer'
              width={18}
              icon={folderPlus}
              xlinkTitle='Add new group'
            />
          </PopoverTrigger>
          <PopoverContent className='flex gap-4 p-2 text-sm'>
            <Input
              className='h-6'
              value={groupLabel}
              onChange={(e) => setGroupLabel(e.target.value)}
            />
            <Button
              size='sm'
              className='h-6'
              onClick={() => {
                onAddNew(groupLabel)
                toggleNewPopover(false)
                setGroupLabel('')
              }}
            >
              Add
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}

export default GroupOperate
