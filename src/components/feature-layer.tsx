import { MouseEvent } from 'react'
import clsx from 'clsx'
import { Icon } from '@iconify/react'
import { useFeatureStore } from '@/store'
import { FeatureNodeMenu } from './feature-node-menu'

const FeatureLayer = () => {
  const {
    featureNodes,
    selectedNodeIds,
    updateSelectedNodeIds,
    toggleFeatureNodeVisible
  } = useFeatureStore((state) => state)

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
    <div className='flex flex-col gap-1 h-[calc(100%-40px)] w-48 absolute left-0 top-10 bg-black z-10'>
      {featureNodes.map((node, idx) => (
        <FeatureNodeMenu key={node.id}>
          <div
            onClick={(e: MouseEvent<HTMLDivElement>) =>
              onFeatureNodeClick(node.id, e.shiftKey)
            }
            className={clsx(
              'h-8 flex items-center justify-between px-4 cursor-pointer hover:bg-gray-800',
              selectedNodeIds.includes(node.id) ? ' bg-slate-700' : ''
            )}
          >
            <span>{node.data.geometry.type}</span>
            {node.visible ? (
              <Icon
                icon='ph:eye-light'
                className='hover:text-gray-500'
                onClick={() => toggleFeatureNodeVisible(String(node.data.id))}
              />
            ) : (
              <Icon
                icon='ph:eye-slash'
                className='hover:text-gray-500'
                onClick={() => toggleFeatureNodeVisible(String(node.data.id))}
              />
            )}
          </div>
        </FeatureNodeMenu>
      ))}
    </div>
  )
}

export default FeatureLayer
