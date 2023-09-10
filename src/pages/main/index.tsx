import { DrawToolbar } from '@/components/draw-toolbar'
import DrawControl from '@/components/mapbox/draw-control'
import BaseMap from '@/components/mapbox/map'
import { TopMenu } from '@/components/topmenu'
import { DrawMode } from '@/types'
import { MapboxDrawOptions, Modes } from '@mapbox/mapbox-gl-draw'
import { useState } from 'react'

function MainPage() {
  const [drawOptions, setDrawOptions] = useState<MapboxDrawOptions>({
    displayControlsDefault: false
  })

  const [drawMode, setDrawMode] = useState<DrawMode>()

  return (
    <div className='w-full h-full'>
      <TopMenu />
      <div className='border-t h-[calc(100%-36px)]'>
        <div className=''>
          <DrawToolbar
            onActive={(mode) => {
              setDrawMode(mode)
            }}
          />
        </div>
        <BaseMap>
          <DrawControl mode={drawMode} />
        </BaseMap>
      </div>
    </div>
  )
}

export default MainPage
