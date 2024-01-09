import { MouseEvent } from 'react'
import { useToggle } from 'react-use'
import { Icon } from '@iconify/react'
import caretRightFill from '@iconify/icons-ph/caret-right-fill'
import { useFeatures } from '@/hooks/use-features'
import { useFeatureStore } from '@/store'
import GroupFolder from './group-folder'
import FeatureNode from './feature-node'
import { cn } from '@/lib/utils'
import useDraw from '@/hooks/use-draw'

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
      <div
        className='flex h-8 cursor-pointer flex-row items-center text-sm text-muted-foreground'
        onClick={toggleOpen}
      >
        <Icon
          icon={caretRightFill}
          className={cn('text-xs', open ? 'rotate-90' : '')}
        />
        <span className='pl-2'>Features</span>
      </div>
      <div className={cn('text-[13px]', open ? 'block' : 'hidden')}>
        {featureTree.map((group) => (
          <GroupFolder
            key={group.label}
            label={group.label}
            isEditing={group.label === currentGroupId}
            onClick={() => {
              setCurrentGroupId(group.label)
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
          </GroupFolder>
        ))}
      </div>
    </div>
  )
}

export default FeatureList
