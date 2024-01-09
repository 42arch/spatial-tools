import { MouseEvent, useState } from 'react'
import { useToggle } from 'react-use'
import { Icon } from '@iconify/react'
import caretRightFill from '@iconify/icons-ph/caret-right-fill'
import folderSimplePlus from '@iconify/icons-ph/folder-simple-plus'
import { useFeatures } from '@/hooks/use-features'
import { useFeatureStore } from '@/store'
import GroupNode from './group-node'
import FeatureNode from './feature-node'
import { cn } from '@/lib/utils'
import useDraw from '@/hooks/use-draw'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

function AddNewGroup() {
  const [open, toggleOpen] = useToggle(false)
  const [name, setName] = useState<string>('')
  const { addNewFeatureGroup } = useFeatureStore()

  const handleConfirm = () => {
    addNewFeatureGroup(name)
    toggleOpen(false)
    setName('')
  }

  return (
    <Popover open={open} onOpenChange={toggleOpen}>
      <PopoverTrigger>
        <Icon
          className={cn(
            'invisible cursor-pointer text-sm text-accent-foreground group-hover:visible',
            open ? 'visible' : ''
          )}
          icon={folderSimplePlus}
          xlinkTitle='Add new group'
        />
      </PopoverTrigger>
      <PopoverContent className='z-50 flex gap-4 p-2 text-sm' align='end'>
        <Input
          className='h-5 text-xs'
          placeholder='New group name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button size='sm' className='h-5' onClick={handleConfirm}>
          Add
        </Button>
      </PopoverContent>
    </Popover>
  )
}

function FeatureList() {
  const [open, toggleOpen] = useToggle(false)
  const { setMode } = useDraw()
  const {
    currentGroupId,
    selectedFeatureNodeIds,
    setSelectedFeatureNodeIds,
    setCurrentGroupId,
    toggleFeatureNodeVisible
  } = useFeatureStore((state) => state)

  const { featureTree } = useFeatures()

  const handleSelectClick = (nodeId: string, shiftKey: boolean) => {
    setMode('simple_select')
    const isSelected = selectedFeatureNodeIds.includes(nodeId)
    if (shiftKey) {
      const newSelectedNodeIds = isSelected
        ? selectedFeatureNodeIds.filter((id) => id !== nodeId)
        : [...selectedFeatureNodeIds, nodeId]
      setSelectedFeatureNodeIds(newSelectedNodeIds)
    } else {
      if (isSelected) {
        setSelectedFeatureNodeIds([])
      } else {
        setSelectedFeatureNodeIds([nodeId])
      }
    }
  }

  return (
    <div className='w-full select-none'>
      <div className='group relative flex h-8 w-full cursor-pointer flex-row items-center justify-between pr-2 text-sm text-muted-foreground'>
        <div
          className='flex w-[calc(100%-14px)] items-center'
          onClick={toggleOpen}
        >
          <Icon
            icon={caretRightFill}
            className={cn('text-xs', open ? 'rotate-90' : '')}
          />
          <span className='pl-2'>Features</span>
        </div>
        <AddNewGroup />
      </div>
      <div className={cn('text-[13px]', open ? 'block' : 'hidden')}>
        {featureTree.map((group) => (
          <GroupNode
            key={group.label}
            label={group.label}
            isEditing={group.id === currentGroupId}
            onClick={() => {
              setCurrentGroupId(group.id)
            }}
          >
            <div className=''>
              {group.data.map((node) => (
                <FeatureNode
                  key={node.id}
                  data={node}
                  isSelected={selectedFeatureNodeIds.includes(node.id)}
                  isVisible={node.visible}
                  onIsVisibleChange={() => {
                    toggleFeatureNodeVisible(group.id, node.id)
                  }}
                  onSelectClick={(e: MouseEvent<HTMLDivElement>) => {
                    handleSelectClick(node.id, e.shiftKey)
                  }}
                />
              ))}
            </div>
          </GroupNode>
        ))}
      </div>
    </div>
  )
}

export default FeatureList
