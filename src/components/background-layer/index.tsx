import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { ReactNode } from 'react'
import { Button } from '../ui/button'
import { Icon } from '@iconify/react'
import plusIcon from '@iconify/icons-ph/plus'
import trashIcon from '@iconify/icons-ph/trash'
import eyeIcon from '@iconify/icons-ph/eye'
import eyeClosed from '@iconify/icons-ph/eye-closed'
import LayerSelect from './layer-select'
import useMap from '@/hooks/use-map'

interface BackgroundLayerPorps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: ReactNode
}

function BackgroundLayer({
  open,
  onOpenChange,
  children
}: BackgroundLayerPorps) {
  const {
    currentCustomBgLayers,
    // currentMapboxBgLayer,
    removeCustomBgLayer,
    toggleBgLayerVisibility
  } = useMap()

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent align='end' className='p-2'>
        <div className='select-none'>
          <div className='flex h-8 justify-between border-b border-border'>
            <h4 className='text-base font-semibold'>Background Layers</h4>
            <LayerSelect>
              <Button variant='outline' size='icon' className='h-6 w-6'>
                <Icon icon={plusIcon} />
              </Button>
            </LayerSelect>
          </div>
          <div className='pt-2'>
            {currentCustomBgLayers.map((layer) => (
              <div
                key={layer.name}
                className='flex flex-col justify-evenly p-2'
              >
                <div className='flex items-center justify-between text-base'>
                  <span>{layer.name}</span>
                  <div className='flex gap-2'>
                    <Icon
                      icon={layer.hidden ? eyeClosed : eyeIcon}
                      width={16}
                      onClick={() => toggleBgLayerVisibility(layer.name)}
                      className='cursor-pointer text-muted-foreground hover:text-foreground'
                    />
                    <Icon
                      icon={trashIcon}
                      width={16}
                      onClick={() => removeCustomBgLayer(layer.name)}
                      className='cursor-pointer text-muted-foreground hover:text-foreground'
                    />
                  </div>
                </div>
                <div className='text-sm text-muted-foreground opacity-75'>
                  {layer.type}
                </div>
              </div>
            ))}
            {/* {currentMapboxBgLayer && (
              <div className='flex flex-col justify-evenly p-2'>
                <div className='flex items-center justify-between text-base'>
                  <span>{currentMapboxBgLayer.name}</span>
                  <div className='flex gap-2'>
                    <Icon
                      icon={currentMapboxBgLayer.hidden ? eyeClosed : eyeIcon}
                      width={16}
                      onClick={() =>
                        toggleBgLayerVisibility(currentMapboxBgLayer.name)
                      }
                      className='cursor-pointer text-muted-foreground hover:text-foreground'
                    />
                    <Icon
                      icon={trashIcon}
                      width={16}
                      className='cursor-pointer text-muted-foreground hover:text-foreground'
                    />
                  </div>
                </div>
                <div className='text-sm text-muted-foreground opacity-75'>
                  {currentMapboxBgLayer.type}
                </div>
              </div>
            )} */}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default BackgroundLayer
