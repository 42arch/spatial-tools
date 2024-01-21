import { Icon } from '@iconify/react'
import globeHemisphereEast from '@iconify/icons-ph/globe-hemisphere-east'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useToggle } from 'react-use'
import BackgroundLayer from '../background-layer'

function BgLayerMenu() {
  const [open, toggleOpen] = useToggle(false)

  return (
    <BackgroundLayer open={open} onOpenChange={(open) => toggleOpen(open)}>
      <Button
        className={cn(
          'relative h-10 w-10 border border-border p-1 text-foreground ring-0 focus-visible:ring-0',
          open
            ? 'bg-primary text-primary-foreground'
            : 'bg-background text-foreground hover:bg-secondary'
        )}
      >
        <Icon icon={globeHemisphereEast} />
      </Button>
    </BackgroundLayer>
  )
}

export default BgLayerMenu
