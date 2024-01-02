import { MouseEvent } from 'react'
import { Icon } from '@iconify/react'
import eyeIcon from '@iconify/icons-ph/eye'
import eyeSlash from '@iconify/icons-ph/eye-slash'
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
        'flex cursor-pointer items-center justify-between px-2 py-1 text-xs hover:bg-zinc-200',
        isSelected ? 'bg-zinc-200' : 'bg-zinc-100'
      )}
      onClick={onSelectClick}
    >
      <span>{data.data.geometry.type}</span>
      <div>
        <Icon
          width={14}
          icon={isVisible ? eyeSlash : eyeIcon}
          onClick={onIsVisibleChange}
        />
      </div>
    </div>
  )
}

export default FeatureNode
