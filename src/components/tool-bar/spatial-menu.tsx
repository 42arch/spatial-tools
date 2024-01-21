import { Button } from '@/components/ui/button'
import { Icon } from '@iconify/react'
import toolboxIcon from '@iconify/icons-ph/toolbox'
import useDraggableView from '@/hooks/use-draggable-view'
import { cn } from '@/lib/utils'

function SpatialMenu() {
  const { toggle, isActive } = useDraggableView()

  return (
    <Button
      className={cn(
        'relative h-10 w-10 border border-border p-1 text-foreground ring-0 focus-visible:ring-0',
        isActive('spatial-toolbox')
          ? 'bg-primary text-primary-foreground'
          : 'bg-background text-foreground hover:bg-secondary'
      )}
      onClick={() => {
        toggle('spatial-toolbox')
      }}
    >
      <Icon icon={toolboxIcon} />
    </Button>
  )
}

export default SpatialMenu
