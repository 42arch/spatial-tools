import { MouseEvent } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useFeatures } from '@/hooks/use-features'
import { useFeatureStore } from '@/store'
import GroupFolder from './group-folder'
import FeatureNode from './feature-node'
import GroupOperate from './group-operate'

interface FeaturesControlPanelProps {
  className?: string
}

function FeaturesControlPanel({ className }: FeaturesControlPanelProps) {
  const {
    currentGroupId,
    selectedFeatureNodeIds,
    setSelectedFeatureNodeIds,
    setCurrentGroupId,
    addNewFeatureGroup,
    toggleFeatureNodeVisible
  } = useFeatureStore((state) => state)

  const { featureTree } = useFeatures()

  const handleSelectClick = (nodeId: string, shiftKey: boolean) => {
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
    <div className='flex h-full w-[200px] flex-col p-2'>
      <GroupOperate
        onAddNew={(label) => {
          addNewFeatureGroup(label)
        }}
      />
      <ScrollArea className='h-[calc(100%-32px)]'>
        {featureTree.map((group) => (
          <GroupFolder
            key={group.label}
            label={group.label}
            isEditing={group.label === currentGroupId}
            onClick={() => {
              setCurrentGroupId(group.label)
            }}
          >
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
          </GroupFolder>
        ))}
      </ScrollArea>
    </div>
    // <div className='flex h-full w-[200px] flex-col p-2'>

    // </div>
  )
}

export default FeaturesControlPanel
