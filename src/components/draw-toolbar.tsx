import { Icon } from '@iconify/react'
import { Toggle } from '@/components/ui/toggle'
import MapboxDraw from '@mapbox/mapbox-gl-draw'

interface Props {
  currentMode?: MapboxDraw.DrawMode
  onModeChange: (mode: MapboxDraw.DrawMode) => void
}

export function DrawToolbar({ currentMode, onModeChange }: Props) {
  return (
    <div className='flex h-10 items-center gap-4'>
      <Toggle
        pressed={currentMode === 'simple_select'}
        onClick={() => {
          onModeChange('simple_select')
        }}
      >
        <Icon icon='gis:arrow-o' />
      </Toggle>
      <Toggle
        pressed={currentMode === 'draw_point'}
        onClick={() => {
          onModeChange('draw_point')
        }}
      >
        <Icon icon='gis:point' />
      </Toggle>
      <Toggle
        pressed={currentMode === 'draw_line_string'}
        onClick={() => {
          onModeChange('draw_line_string')
        }}
      >
        <Icon icon='gis:polyline-pt' />
      </Toggle>
      <Toggle
        pressed={currentMode === 'draw_polygon'}
        onClick={() => {
          onModeChange('draw_polygon')
        }}
      >
        <Icon icon='gis:polygon-pt' />
      </Toggle>
    </div>
  )
}
