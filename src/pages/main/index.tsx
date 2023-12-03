import { DrawToolbar } from '@/components/draw-toolbar'
import FeatureLayer from '@/components/feature-layer'
import DrawControl from '@/components/mapbox/draw-control'
import BaseMap from '@/components/mapbox/map'
import { TopMenu } from '@/components/topmenu'
import { featureTreeToNodes } from '@/lib/feature'
import { useFeatureStore } from '@/store'
import MapboxDraw, {
  DrawCreateEvent,
  DrawSelectionChangeEvent,
  DrawUpdateEvent,
  MapboxDrawOptions
} from '@mapbox/mapbox-gl-draw'
import { useMemo, useState } from 'react'

function MainPage() {
  const {
    featureNodes,
    selectedNodeIds,
    updateFeatureNodes,
    updateSelectedNodeIds
  } = useFeatureStore((state) => state)
  const [drawOptions, setDrawOptions] = useState<MapboxDrawOptions>({
    displayControlsDefault: false
  })

  const nodes = useMemo(() => {
    return featureTreeToNodes(featureNodes)
  }, [featureNodes])

  const [drawMode, setDrawMode] = useState<MapboxDraw.DrawMode>('simple_select')

  const onDrawFeatures = (e: DrawCreateEvent) => {
    updateFeatureNodes(e.features)
    setDrawMode('simple_select')
  }

  const onUpdateFeatures = (e: DrawUpdateEvent) => {
    updateFeatureNodes(e.features)
  }

  const onSelectionChange = (e: DrawSelectionChangeEvent) => {
    const ids = e.features.map((feature) => String(feature.id))
    updateSelectedNodeIds(ids)
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
            featureNodes={nodes}
            selectedIds={selectedNodeIds}
            mode={drawMode}
            options={drawOptions}
            onDrawCreate={onDrawFeatures}
            onDrawUpdate={onUpdateFeatures}
            onDrawSelectionChange={onSelectionChange}
          />
        </BaseMap>
      </div>
    </div>
  )
}

export default MainPage
