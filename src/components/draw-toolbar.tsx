'use client'

import { Icon } from '@iconify/react'
import { Toggle } from '@/components/ui/toggle'
import useDraw from '@/hooks/use-draw'

interface Props {
  // currentMode?: MapboxDraw.DrawMode
  // onModeChange: (mode: MapboxDraw.DrawMode) => void
}

export function DrawToolbar() {
  const { mode, setMode } = useDraw()

  return (
    <div className='flex h-10 items-center gap-4 px-2 lg:px-4'>
      <Toggle
        pressed={mode === 'simple_select'}
        onClick={() => setMode('simple_select')}
      >
        <Icon icon='gis:arrow-o' />
      </Toggle>
      <Toggle
        pressed={mode === 'draw_point'}
        onClick={() => setMode('draw_point')}
      >
        <Icon icon='gis:point' />
      </Toggle>
      <Toggle
        pressed={mode === 'draw_line_string'}
        onClick={() => {
          setMode('draw_line_string')
        }}
      >
        <Icon icon='gis:polyline-pt' />
      </Toggle>
      <Toggle
        pressed={mode === 'draw_polygon'}
        onClick={() => {
          setMode('draw_polygon')
        }}
      >
        <Icon icon='gis:polygon-pt' />
      </Toggle>
    </div>
  )
}
