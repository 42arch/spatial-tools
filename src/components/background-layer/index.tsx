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
  const { currentBackgroundLayer } = useMap()

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent align='end' className='p-2'>
        <div className=''>
          <div className='flex h-8 justify-between border-b border-border'>
            <h4 className='text-base font-semibold'>Background Layers</h4>
            <LayerSelect>
              <Button variant='outline' size='icon' className='h-6 w-6'>
                <Icon icon={plusIcon} />
              </Button>
            </LayerSelect>
          </div>
          <div className='pt-2'>
            <div className='flex flex-col justify-evenly p-2'>
              <div className='flex items-center justify-between text-base'>
                <span>{currentBackgroundLayer.name}</span>
                <Icon
                  icon={trashIcon}
                  width={16}
                  className='cursor-pointer text-muted-foreground hover:text-foreground'
                />
              </div>
              <div className='text-sm opacity-80'>
                {currentBackgroundLayer.type}
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default BackgroundLayer
