import { ReactNode } from 'react'
import { Separator } from '@/components/ui/separator'
import { DEFAULT_BG_LAYERS } from '@/lib/constants'
import useMap from '@/hooks/use-map'
import { BackgroundLayer } from '@/types'

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { useToggle } from 'react-use'
import MoreOptions from './more-options'

interface LayerSelectProps {
  children: ReactNode
}

function LayerSelect({ children }: LayerSelectProps) {
  const [open, toggleOpen] = useToggle(false)
  const [moreOptionsShow, toggleMoreOptions] = useToggle(false)
  const { addCustomBgLayer } = useMap()

  const handleSelect = (layer: BackgroundLayer) => {
    // setMapboxBgLayer(layer)
    addCustomBgLayer(layer)
    toggleOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={toggleOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className='relative p-2'>
        {!moreOptionsShow ? (
          <>
            <div className='flex flex-col'>
              <div className='flex select-none flex-col'>
                {DEFAULT_BG_LAYERS.map((layer) => (
                  <div
                    key={layer.name}
                    className='cursor-pointer px-2 py-1.5 text-sm hover:bg-accent'
                    onClick={() => handleSelect(layer)}
                  >
                    <span className=''>{layer.name}</span>
                  </div>
                ))}
              </div>
              <Separator className='my-1' />
              <div
                className='cursor-pointer px-2 py-1.5 text-sm hover:bg-accent'
                onClick={() => toggleMoreOptions(true)}
              >
                <span>More</span>
              </div>
            </div>
          </>
        ) : (
          <MoreOptions
            onClose={() => toggleMoreOptions(false)}
            onSelectClose={() => toggleOpen(false)}
          />
        )}
      </PopoverContent>
    </Popover>

    // <DropdownMenu>
    //   <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
    //   <DropdownMenuContent>
    //     {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
    //     <DropdownMenuSeparator /> */}
    //     {DEFAULT_BG_LAYERS.map((layer) => (
    //       <DropdownMenuItem
    //         key={layer.name}
    //         onClick={() => handleSelect(layer)}
    //       >
    //         {layer.name}
    //       </DropdownMenuItem>
    //     ))}

    //     <DropdownMenuSeparator />
    //     <DropdownMenuSub>
    //       <DropdownMenuSubTrigger>Custom</DropdownMenuSubTrigger>
    //       <DropdownMenuPortal>
    //         <DropdownMenuSubContent>
    //           <Popover>
    //             <PopoverTrigger asChild>
    //               <DropdownMenuItem>Mapbox</DropdownMenuItem>
    //             </PopoverTrigger>
    //             <PopoverContent>
    //               Place content for the popover here.
    //             </PopoverContent>
    //           </Popover>
    //           <DropdownMenuItem>XYZ</DropdownMenuItem>
    //         </DropdownMenuSubContent>
    //       </DropdownMenuPortal>
    //     </DropdownMenuSub>
    //   </DropdownMenuContent>
    // </DropdownMenu>
  )
}

export default LayerSelect
