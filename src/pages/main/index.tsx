import { DrawToolbar } from '@/components/draw-toolbar'
import DrawControl from '@/components/mapbox/draw-control'
import BaseMap from '@/components/mapbox/map'
import TestMap from '@/components/mapbox/test-map'
import { TopMenu } from '@/components/topmenu'
import { DrawMode } from '@/types'
import MapboxDraw, { MapboxDrawOptions } from '@mapbox/mapbox-gl-draw'
import { useState } from 'react'

function MainPage() {
  const [currentFeatures, setCurrentFeatures] = useState(null)
  const [drawOptions, setDrawOptions] = useState<MapboxDrawOptions>({
    displayControlsDefault: false
  })

  const [drawMode, setDrawMode] = useState<MapboxDraw.DrawMode>('draw_polygon')

  return (
    <div className='w-full h-full'>
      <TopMenu />
      <div className='border-t h-[calc(100%-36px)]'>
        <div className=''>
          <DrawToolbar
            currentMode={drawMode}
            onModeChange={(mode) => {
              setDrawMode(mode)
            }}
          />
        </div>

        {/* <TestMap /> */}

        <BaseMap>
          <DrawControl
            mode={drawMode}
            features={currentFeatures}
            options={drawOptions}
            onDrawCreate={(e) => {
              console.log('oncreate', e.features)
            }}
            onDrawUpdate={(e) => {
              console.log('onupdate', e.features)
            }}
          />
        </BaseMap>
      </div>
    </div>
  )
}

export default MainPage
