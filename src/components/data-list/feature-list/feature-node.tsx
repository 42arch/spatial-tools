import { MouseEvent } from 'react'
import { Icon } from '@iconify/react'
import eyeIcon from '@iconify/icons-ph/eye'
import eyeClosed from '@iconify/icons-ph/eye-closed'
import pointIcon from '@iconify/icons-gis/point'
import polylineIcon from '@iconify/icons-gis/polyline'
import polygonO from '@iconify/icons-gis/polygon-o'
import { FeatureNode, GeometryType } from '@/types'
import { cn } from '@/lib/utils'
import FeatureNodeMenu from './feature-node-menu'

interface FeatureNodeProps {
  data: FeatureNode
  isSelected?: boolean
  isVisible?: boolean
  onIsVisibleChange?: () => void
  onSelectClick?: (e: MouseEvent<HTMLDivElement>) => void
}

const ShapeIconMap = {
  Point: <Icon icon={pointIcon} className='text-sm' />,
  LineString: <Icon icon={polylineIcon} className='text-sm' />,
  Polygon: <Icon icon={polygonO} className='text-sm' />
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
  isVisible = true,
  onSelectClick,
  onIsVisibleChange
}: FeatureNodeProps) {
  return (
    <FeatureNodeMenu data={data.data}>
      <div
        key={data.id}
        className={cn(
          'group flex cursor-pointer select-none items-center justify-between py-1 pl-4 pr-2 text-xs hover:bg-primary/10',
          isSelected ? 'bg-primary/10' : ''
        )}
        onClick={onSelectClick}
        onContextMenu={onSelectClick}
      >
        <div className='flex items-center'>
          {getShapeIcon(data.data.geometry.type as GeometryType)}
          <span className='pl-2 text-accent-foreground'>
            {data.data.geometry.type}
          </span>
        </div>
        <div>
          <Icon
            className='invisible text-sm text-accent-foreground group-hover:visible'
            icon={isVisible ? eyeIcon : eyeClosed}
            onClick={onIsVisibleChange}
          />
        </div>
      </div>
    </FeatureNodeMenu>
  )
}

export default FeatureNode
