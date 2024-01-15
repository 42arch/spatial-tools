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
import { LayerNode } from '@/types'
import { Bbox } from '@/lib/spatial'
import useMap from '@/hooks/use-map'
import useLayers from '@/hooks/use-layers'
import { useFeatures } from '@/hooks/use-features'

interface LayerNodeMenuProps {
  data: LayerNode
  children: ReactNode
}

const MenuItemClassName = 'text-[13px] focus:bg-primary/10'

function LayerNodeMenu({ data, children }: LayerNodeMenuProps) {
  const { zoomToFit } = useMap()
  const { remove } = useLayers()
  const { addNewFeatureGroup, addFeatures } = useFeatures()

  const handleZoomToFit = () => {
    const bbox = Bbox(data.data)
    zoomToFit(bbox)
  }

  const handleDuplicate = () => {}

  const handleConvertToFeatures = () => {
    addNewFeatureGroup(data.name)
    addFeatures(data.data.features)
    remove(data.id)
  }

  const handleExportAsGeojson = () => {}

  const handleDelete = () => remove(data.id)

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
            Operates
          </ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem
              className={MenuItemClassName}
              onClick={handleConvertToFeatures}
            >
              Convert to features
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

export default LayerNodeMenu
