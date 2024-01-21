import { ReactNode } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { DEFAULT_BG_LAYERS } from '@/lib/constants'
import useMap from '@/hooks/use-map'
import { BackgroundLayer } from '@/types'

interface LayerSelectProps {
  children: ReactNode
}

function LayerSelect({ children }: LayerSelectProps) {
  const { setBackgroundLayer } = useMap()

  const handleSelect = (layer: BackgroundLayer) => {
    setBackgroundLayer(layer)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator /> */}
        {DEFAULT_BG_LAYERS.map((layer) => (
          <DropdownMenuItem
            key={layer.name}
            onClick={() => handleSelect(layer)}
          >
            {layer.name}
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />
        <DropdownMenuItem>Custom</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LayerSelect
