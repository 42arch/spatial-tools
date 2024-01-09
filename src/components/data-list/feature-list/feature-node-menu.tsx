import { ReactNode } from 'react'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger
} from '@/components/ui/context-menu'
import { cn } from '@/lib/utils'
import { FeatureType } from '@/types'
import { Bbox } from '@/lib/spatial'
import useMap from '@/hooks/use-map'

interface FeatureNodeMenuProps {
  data: FeatureType
  children: ReactNode
}

const MenuItemClassName = 'text-[13px] focus:bg-primary/10'

function FeatureNodeMenu({ data, children }: FeatureNodeMenuProps) {
  const { zoomToFit } = useMap()

  const handleZoomToFit = () => {
    const bbox = Bbox(data)
    zoomToFit(bbox)
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent className='text-[13px]'>
        <ContextMenuItem
          className={MenuItemClassName}
          onClick={handleZoomToFit}
        >
          Zoom to fit
        </ContextMenuItem>
        <ContextMenuItem className={MenuItemClassName}>Copy</ContextMenuItem>
        <ContextMenuItem className={MenuItemClassName}>
          Duplicate
        </ContextMenuItem>
        <ContextMenuItem
          className={cn(
            'text-destructive focus:text-destructive',
            MenuItemClassName
          )}
        >
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export default FeatureNodeMenu
