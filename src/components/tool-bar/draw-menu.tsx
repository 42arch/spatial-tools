import { useEffect, useState } from 'react'
import { useToggle } from 'react-use'
import { Icon } from '@iconify/react'
import pointIcon from '@iconify/icons-gis/point'
import polylineIcon from '@iconify/icons-gis/polyline'
import polygonO from '@iconify/icons-gis/polygon-o'
import caretDown from '@iconify/icons-ph/caret-down'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '../ui/button'
import useDraw from '@/hooks/use-draw'
import { cn } from '@/lib/utils'

function getIcon(value: 'draw_point' | 'draw_line_string' | 'draw_polygon') {
  switch (value) {
    case 'draw_point':
      return pointIcon
    case 'draw_line_string':
      return polylineIcon
    case 'draw_polygon':
      return polygonO
  }
}

function itemCn(mode: string, value: string) {
  return cn('focus:bg-primary/10 px-1', mode === value ? 'bg-primary/20' : '')
}

function DrawMenu() {
  const [open, toggleOpen] = useToggle(false)
  const [active, toggleActive] = useToggle(false)
  const { mode, setMode } = useDraw()
  const [currentMode, setCurrentMode] = useState<
    'draw_point' | 'draw_line_string' | 'draw_polygon'
  >('draw_point')

  useEffect(() => {
    if (
      ['draw_point', 'draw_line_string', 'draw_polygon'].includes(currentMode)
    ) {
      if (active) {
        setMode(currentMode)
      }
    }
  }, [currentMode, setMode, active])

  useEffect(() => {
    if (!['draw_point', 'draw_line_string', 'draw_polygon'].includes(mode)) {
      toggleActive(false)
    }
  }, [mode, toggleActive])

  const handleActive = () => {
    toggleActive()
    setMode('simple_select')
  }

  const handleModeChange = (
    v: 'draw_point' | 'draw_line_string' | 'draw_polygon'
  ) => {
    setCurrentMode(v)
    toggleActive(true)
  }

  return (
    <Button
      className={cn(
        'relative h-10 w-10 p-1 text-foreground ring-0  focus-visible:ring-0',
        active
          ? 'bg-primary text-primary-foreground'
          : 'bg-background text-foreground hover:bg-secondary'
      )}
      onClick={handleActive}
    >
      <div className='flex h-full w-[24px] items-center justify-center'>
        <Icon icon={getIcon(currentMode)} width={16} />
      </div>
      <DropdownMenu open={open} onOpenChange={toggleOpen}>
        <DropdownMenuTrigger asChild className='ring-0 focus-visible:ring-0'>
          <div
            className={cn(
              'flex h-full w-[16px] items-center justify-center hover:-mb-1',
              open ? '-mb-1' : ''
            )}
          >
            <Icon icon={caretDown} width={12} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='text-sm'>
          <DropdownMenuRadioGroup
            value={currentMode}
            onValueChange={handleModeChange}
          >
            <DropdownMenuRadioItem
              value='draw_point'
              className={itemCn(mode, 'draw_point')}
            >
              <Icon icon={pointIcon} width={16} />
              <span className='ml-1'>Point</span>
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem
              value='draw_line_string'
              className={itemCn(mode, 'draw_line_string')}
            >
              <Icon icon={polylineIcon} width={16} />
              <span className='ml-1'>Line</span>
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem
              value='draw_polygon'
              className={itemCn(mode, 'draw_polygon')}
            >
              <Icon icon={polygonO} width={16} />
              <span className='ml-1'>Polygon</span>
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </Button>
  )
}

export default DrawMenu
