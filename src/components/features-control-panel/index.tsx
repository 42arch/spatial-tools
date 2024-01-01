import { MouseEvent } from 'react'
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
    setCurrentGroupId,
    addNewFeatureGroup,
    toggleFeatureNodeVisible,
    toggleFeatureNodesSelected,
    resetFeatureNodesSelected
  } = useFeatureStore((state) => state)

  const { featureTree } = useFeatures()

  const onIsSelectedChange = (
    groupId: string,
    nodeId: string,
    shiftKey: boolean
  ) => {
    if (shiftKey) {
      toggleFeatureNodesSelected(groupId, [nodeId])
    } else {
      resetFeatureNodesSelected()
      toggleFeatureNodesSelected(groupId, [nodeId])
    }
  }

  console.log('wtf', featureTree)

  return (
    <div className='flex h-full w-[200px] flex-col p-2'>
      <GroupOperate
        onAddNew={(label) => {
          addNewFeatureGroup(label)
        }}
      />
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
              isSelected={node.selected}
              isVisible={node.visible}
              onIsVisibleChange={() => {
                toggleFeatureNodeVisible(group.id, node.id)
              }}
              onIsSelectedChange={(e: MouseEvent<HTMLDivElement>) => {
                onIsSelectedChange(group.id, node.id, e.shiftKey)
              }}
            />
          ))}
        </GroupFolder>
      ))}
    </div>
  )
}

export default FeaturesControlPanel
