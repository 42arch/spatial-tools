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
    <div className='w-full h-6 flex justify-between items-center px-2'>
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
          <PopoverContent className='text-sm flex p-2 gap-4'>
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
