import { ReactNode, createContext, useEffect } from 'react'
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

interface LayerSelectContextState {
  toggleOpen: () => void
  toggleMoreOptions: () => void
}

export const LayerSelectContext = createContext({} as LayerSelectContextState)

interface LayerSelectProps {
  children: ReactNode
}

function LayerSelect({ children }: LayerSelectProps) {
  const [open, toggleOpen] = useToggle(false)
  const [moreOptionsShow, toggleMoreOptions] = useToggle(false)
  const { addBgLayer } = useMap()

  const handleSelect = (layer: BackgroundLayer) => {
    addBgLayer(layer)
    toggleOpen(false)
  }

  useEffect(() => {
    if (!open) {
      toggleMoreOptions(false)
    }
  }, [open, toggleMoreOptions])

  return (
    <LayerSelectContext.Provider
      value={{
        toggleOpen,
        toggleMoreOptions
      }}
    >
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
    </LayerSelectContext.Provider>
  )
}

export default LayerSelect
