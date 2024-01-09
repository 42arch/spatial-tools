import { MouseEvent } from 'react'
import { Icon } from '@iconify/react'
import eyeIcon from '@iconify/icons-ph/eye'
import eyeClosed from '@iconify/icons-ph/eye-closed'
import { FeatureNode } from '@/types'
import { cn } from '@/lib/utils'

interface FeatureNodeProps {
  data: FeatureNode
  isSelected?: boolean
  isVisible?: boolean
  onIsVisibleChange?: () => void
  onSelectClick?: (e: MouseEvent<HTMLDivElement>) => void
}

function FeatureNode({
  data,
  isSelected = false,
  isVisible = true,
  onSelectClick,
  onIsVisibleChange
}: FeatureNodeProps) {
  return (
    <div
      key={data.id}
      className={cn(
        'group flex cursor-pointer select-none items-center justify-between py-1 pl-6 pr-2 text-xs hover:bg-primary/10',
        isSelected ? 'bg-primary/10' : ''
      )}
      onClick={onSelectClick}
    >
      <span className='text-accent-foreground'>{data.data.geometry.type}</span>
      <div>
        <Icon
          className='invisible text-sm group-hover:visible'
          icon={isVisible ? eyeIcon : eyeClosed}
          onClick={onIsVisibleChange}
        />
      </div>
    </div>
  )
}

export default FeatureNode
