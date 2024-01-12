import { Icon } from '@iconify/react'
import caretRightFill from '@iconify/icons-ph/caret-right-fill'
import { useToggle } from 'react-use'
import { cn } from '@/lib/utils'
import useLayers from '@/hooks/use-layers'
import LayerNode from './layer-node'

function LayerList() {
  const { layerList } = useLayers()
  const [open, toggleOpen] = useToggle(false)

  console.log(22221111, layerList)

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
        <span className='pl-2'>Layers</span>
      </div>
      <div className={cn('ml-2 text-sm', open ? 'block' : 'hidden')}>
        {layerList.map((layer) => (
          <LayerNode
            key={layer.id}
            id={layer.id}
            data={layer}
            name={layer.name}
            isHidden={false}
            isSelected={false}
          />
        ))}
      </div>
    </div>
  )
}

export default LayerList
