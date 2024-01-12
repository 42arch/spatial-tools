import { Icon } from '@iconify/react'
import layerStackO from '@iconify/icons-gis/layer-stack-o'
import eyeIcon from '@iconify/icons-ph/eye'
import eyeClosed from '@iconify/icons-ph/eye-closed'
import { cn } from '@/lib/utils'
import LayerNodeMenu from './layer-node-menu'
import { LayerNode } from '@/types'

interface LayerNodeProps {
  id: string
  name: string
  data: LayerNode
  isSelected: boolean
  isHidden: boolean
  onSelectClick?: () => void
  onIsHiddenChange?: () => void
}

function LayerNode({
  id,
  name,
  data,
  isSelected,
  isHidden,
  onSelectClick,
  onIsHiddenChange
}: LayerNodeProps) {
  return (
    <LayerNodeMenu data={data}>
      <div
        className={cn(
          'group flex cursor-pointer select-none items-center justify-between py-1 pl-4 pr-2 text-xs hover:bg-primary/10',
          isSelected ? 'bg-primary/10' : ''
        )}
      >
        <div
          className='flex w-[calc(100%-1.5rem)] items-center'
          onClick={onSelectClick}
        >
          <Icon icon={layerStackO} className='text-sm text-muted-foreground' />
          <span className='pl-2 text-accent-foreground'>{name}</span>
        </div>
        <div className='flex w-6 justify-end'>
          <Icon
            className='invisible text-sm text-accent-foreground group-hover:visible'
            icon={isHidden ? eyeClosed : eyeIcon}
            onClick={onIsHiddenChange}
          />
        </div>
      </div>
    </LayerNodeMenu>
  )
}

export default LayerNode
