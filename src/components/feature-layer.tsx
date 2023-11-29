import { Icon } from '@iconify/react'
import { useBoundStore } from '@/store'

const FeatureLayer = () => {
  const { features, toggleFeatureVisible } = useBoundStore((state) => state)

  return (
    <div className='flex flex-col gap-1 h-[calc(100%-40px)] w-48 absolute left-0 top-10 bg-black z-10'>
      {features.map((feature, idx) => (
        <div
          key={idx}
          className='h-8 flex items-center justify-between px-4 cursor-pointer hover:bg-gray-800'
        >
          <span>{feature.geometry.type}</span>
          {feature.visible ? (
            <Icon
              icon='ph:eye-light'
              className='hover:text-gray-500'
              onClick={() => toggleFeatureVisible(String(feature.id))}
            />
          ) : (
            <Icon
              icon='ph:eye-slash'
              className='hover:text-gray-500'
              onClick={() => toggleFeatureVisible(String(feature.id))}
            />
          )}
        </div>
      ))}
    </div>
  )
}

export default FeatureLayer
