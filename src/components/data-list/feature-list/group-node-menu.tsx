import { ReactNode } from 'react'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger
} from '@/components/ui/context-menu'
import { cn } from '@/lib/utils'
import { FeatureType } from '@/types'
import { Bbox } from '@/lib/spatial'
import useMap from '@/hooks/use-map'
import { useFeatures } from '@/hooks/use-features'
import { nanoid } from 'nanoid'
import useLayers from '@/hooks/use-layers'

interface GroupNodeMenuProps {
  id: string
  data: Array<FeatureType>
  children: ReactNode
}

const MenuItemClassName = 'text-[13px] focus:bg-primary/10'

function GroupNodeMenu({ id, data, children }: GroupNodeMenuProps) {
  const { zoomToFit } = useMap()
  const { addFeatures, removeGroups } = useFeatures()
  const { addLayer } = useLayers()

  const handleZoomToFit = () => {
    const bbox = Bbox({
      type: 'FeatureCollection',
      features: data
    })
    zoomToFit(bbox)
  }

  const handleDuplicate = () => {
    // const newFeature = { ...data }
    // newFeature.id = nanoid()
    // addFeatures([newFeature])
  }

  const handleCopyAsGeojson = () => {}

  const handleExportAsGeojson = () => {}

  const handleConvertToLayer = () => {
    removeGroups([id])
    addLayer('untitled', {
      type: 'FeatureCollection',
      features: data
    })
  }

  const handleDelete = () => removeGroups([id])

  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem
          className={MenuItemClassName}
          onClick={handleZoomToFit}
        >
          Zoom to fit
        </ContextMenuItem>
        <ContextMenuItem
          className={MenuItemClassName}
          onClick={handleDuplicate}
        >
          Duplicate
        </ContextMenuItem>
        {/* <ContextMenuSub>
          <ContextMenuSubTrigger className={MenuItemClassName}>
            Copy as
          </ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem
              className={MenuItemClassName}
              onClick={handleCopyAsGeojson}
            >
              GeoJSON
            </ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub> */}
        <ContextMenuSub>
          <ContextMenuSubTrigger className={MenuItemClassName}>
            Export as
          </ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem
              className={MenuItemClassName}
              onClick={handleExportAsGeojson}
            >
              .geojson
            </ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSub>
          <ContextMenuSubTrigger className={MenuItemClassName}>
            Actions
          </ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem
              className={MenuItemClassName}
              onClick={handleConvertToLayer}
            >
              Convert to layer
            </ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuItem
          className={cn(
            'text-destructive focus:text-destructive',
            MenuItemClassName
          )}
          onClick={handleDelete}
        >
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export default GroupNodeMenu
