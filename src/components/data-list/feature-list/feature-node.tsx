import { MouseEvent } from 'react'
import { Icon } from '@iconify/react'
import eyeIcon from '@iconify/icons-ph/eye'
import eyeClosed from '@iconify/icons-ph/eye-closed'
import pointIcon from '@iconify/icons-gis/point'
import polylineIcon from '@iconify/icons-gis/polyline'
import polygonO from '@iconify/icons-gis/polygon-o'
import { FeatureType, GeometryType } from '@/types'
import { cn } from '@/lib/utils'
import FeatureNodeMenu from './feature-node-menu'

interface FeatureNodeProps {
  data: FeatureType
  isSelected?: boolean
  isHidden?: boolean
  onIsHiddenChange?: () => void
  onSelectClick?: (e: MouseEvent<HTMLDivElement>) => void
}

function getShapeIcon(type: GeometryType) {
  switch (type) {
    case 'Point':
    case 'MultiPoint':
      return <Icon icon={pointIcon} className='text-sm text-muted-foreground' />
    case 'LineString':
    case 'MultiLineString':
      return (
        <Icon icon={polylineIcon} className='text-sm text-muted-foreground' />
      )
    case 'Polygon':
    case 'MultiPolygon':
      return <Icon icon={polygonO} className='text-sm text-muted-foreground' />
  }
}

function FeatureNode({
  data,
  isSelected = false,
  isHidden = false,
  onSelectClick,
  onIsHiddenChange
}: FeatureNodeProps) {
  return (
    <FeatureNodeMenu data={data}>
      <div
        className={cn(
          'group flex cursor-pointer select-none items-center justify-between py-1 pl-4 pr-2 text-xs hover:bg-primary/10',
          isSelected ? 'bg-primary/10' : ''
        )}
        onContextMenu={onSelectClick}
      >
        <div
          className='flex w-[calc(100%-1.5rem)] items-center'
          onClick={onSelectClick}
        >
          {getShapeIcon(data.geometry.type as GeometryType)}
          <span className='pl-2 text-accent-foreground'>
            {data.geometry.type}
          </span>
        </div>
        <div className='flex w-6 justify-end'>
          <Icon
            className='invisible text-sm text-accent-foreground group-hover:visible'
            icon={isHidden ? eyeClosed : eyeIcon}
            onClick={onIsHiddenChange}
          />
        </div>
      </div>
    </FeatureNodeMenu>
  )
}

export default FeatureNode
