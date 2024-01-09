import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Icon } from '@iconify/react'
import folderPlus from '@iconify/icons-ph/folder-plus'
import { Input } from '@/components/ui/input'
import { Button } from '../../ui/button'
import { useState } from 'react'
import { useToggle } from 'react-use'

interface GroupOperateProps {
  onAddNew: (label: string) => void
}

function GroupOperate({ onAddNew }: GroupOperateProps) {
  const [newPopoverOpen, toggleNewPopover] = useToggle(false)
  const [groupLabel, setGroupLabel] = useState<string>('')

  return (
    <div className='flex h-8 w-full items-center justify-between px-2'>
      <div></div>
      <div className='flex items-center gap-4'>
        <Popover open={newPopoverOpen} onOpenChange={toggleNewPopover}>
          <PopoverTrigger>
            <Button variant='outline' size='icon' className='h-7 w-7 text-sm'>
              <Icon
                className='cursor-pointer'
                width={18}
                icon={folderPlus}
                xlinkTitle='Add new group'
              />
            </Button>
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

        {/* <DataImportModal>
          <Button variant='outline' className='h-8 text-sm'>
            Import
          </Button>
        </DataImportModal> */}
      </div>
    </div>
  )
}

export default GroupOperate
