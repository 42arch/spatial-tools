import { Icon } from '@iconify/react'
import { Toggle } from '@/components/ui/toggle'

interface Props {
  onActive: (mode: 'draw_line_string' | 'draw_polygon' | 'draw_point') => void
}

export function DrawToolbar({ onActive }: Props) {
  return (
    <div className='flex h-10 items-center gap-4'>
      <Toggle
        onClick={() => {
          onActive('draw_point')
        }}
      >
        <Icon icon='gis:point' />
      </Toggle>
      <Toggle
        onClick={() => {
          onActive('draw_line_string')
        }}
      >
        <Icon icon='gis:polyline-pt' />
      </Toggle>
      <Toggle
        onClick={() => {
          onActive('draw_polygon')
        }}
      >
        <Icon icon='gis:polygon-pt' />
      </Toggle>
    </div>
  )
}
