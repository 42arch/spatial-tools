import { DrawToolbar } from '@/components/draw-toolbar'
import FeatureLayer from '@/components/feature-layer'
import DrawControl from '@/components/mapbox/draw-control'
import BaseMap from '@/components/mapbox/map'
import { TopMenu } from '@/components/topmenu'
import { featureTreeToNodes } from '@/lib/feature'
import { useFeatureStore } from '@/store'
import MapboxDraw, {
  DrawCreateEvent,
  MapboxDrawOptions
} from '@mapbox/mapbox-gl-draw'
import { useMemo, useState } from 'react'

function MainPage() {
  const { featureNodes, updateFeatureNodes } = useFeatureStore((state) => state)
  const [drawOptions, setDrawOptions] = useState<MapboxDrawOptions>({
    displayControlsDefault: false
  })

  const nodes = useMemo(() => {
    console.log(99877, featureTreeToNodes(featureNodes))
    return featureTreeToNodes(featureNodes)
  }, [featureNodes])

  // const hiddenFeatures = useMemo(() => {}, [featureNodes])
  // const displayFeatures = useMemo(() => {}, [featureNodes])

  const [drawMode, setDrawMode] = useState<MapboxDraw.DrawMode>('simple_select')

  const onUpdateFeatures = (e: DrawCreateEvent) => {
    updateFeatureNodes(e.features)
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
            // features={features}
            featureNodes={nodes}
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
