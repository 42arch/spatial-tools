import { Icon } from '@iconify/react'
import { useFeatureStore } from '@/store'

const FeatureLayer = () => {
  const { featureNodes, toggleFeatureNodeVisible } = useFeatureStore(
    (state) => state
  )

  return (
    <div className='flex flex-col gap-1 h-[calc(100%-40px)] w-48 absolute left-0 top-10 bg-black z-10'>
      {featureNodes.map((node, idx) => (
        <div
          key={idx}
          className='h-8 flex items-center justify-between px-4 cursor-pointer hover:bg-gray-800'
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
      ))}
    </div>
  )
}

export default FeatureLayer
