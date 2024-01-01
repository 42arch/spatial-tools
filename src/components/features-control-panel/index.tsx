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
    selectedNodeIds,
    updateSelectedNodeIds,
    currentGroupId,
    setCurrentGroupId,
    addNewFeatureGroup
  } = useFeatureStore((state) => state)

  const { featureGroupList } = useFeatures()

  const onFeatureNodeClick = (nodeId: string, shiftKey: boolean) => {
    const isSelected = selectedNodeIds.includes(nodeId)
    if (shiftKey) {
      const newSelectedNodeIds = isSelected
        ? selectedNodeIds.filter((id) => id !== nodeId)
        : [...selectedNodeIds, nodeId]
      updateSelectedNodeIds(newSelectedNodeIds)
    } else {
      if (isSelected) {
        updateSelectedNodeIds([])
      } else {
        updateSelectedNodeIds([nodeId])
      }
    }
  }

  return (
    <div className='flex flex-col p-2 h-full w-[200px]'>
      <GroupOperate
        onAddNew={(label) => {
          addNewFeatureGroup(label)
        }}
      />
      {featureGroupList.map((featureGroup) => (
        <GroupFolder
          key={featureGroup.label}
          label={featureGroup.label}
          isEditing={featureGroup.label === currentGroupId}
          onClick={() => {
            setCurrentGroupId(featureGroup.label)
          }}
        >
          {featureGroup.data.map((node) => (
            <FeatureNode key={node.id} data={node} />
          ))}
        </GroupFolder>
      ))}
    </div>
  )
}

export default FeaturesControlPanel
