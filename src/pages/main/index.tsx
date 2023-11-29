import { DrawToolbar } from '@/components/draw-toolbar'
import FeatureLayer from '@/components/feature-layer'
import DrawControl from '@/components/mapbox/draw-control'
import BaseMap from '@/components/mapbox/map'
import { TopMenu } from '@/components/topmenu'
import { useBoundStore } from '@/store'
import MapboxDraw, {
  DrawCreateEvent,
  MapboxDrawOptions
} from '@mapbox/mapbox-gl-draw'
import { useState } from 'react'

function MainPage() {
  const { updateFeatures } = useBoundStore((state) => state)
  const [drawOptions, setDrawOptions] = useState<MapboxDrawOptions>({
    displayControlsDefault: false
  })

  const [drawMode, setDrawMode] = useState<MapboxDraw.DrawMode>('simple_select')

  const onUpdateFeatures = (e: DrawCreateEvent) => {
    updateFeatures(e.features)
    setDrawMode('simple_select')
  }

  return (
    <div className='w-full h-full'>
      <TopMenu />
      <div className='border-t h-[calc(100%-36px)] relative'>
        <div className=''>
          <DrawToolbar
            currentMode={drawMode}
            onModeChange={(mode) => {
              setDrawMode(mode)
            }}
          />
        </div>
        <FeatureLayer />
        <BaseMap>
          <DrawControl
            mode={drawMode}
            options={drawOptions}
            onDrawCreate={onUpdateFeatures}
            onDrawUpdate={(e) => {
              console.log('onupdate', e.features[0])
            }}
          />
        </BaseMap>
      </div>
    </div>
  )
}

export default MainPage
