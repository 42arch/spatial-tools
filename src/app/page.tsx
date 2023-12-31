'use client'

import { DrawToolbar } from '@/components/draw-toolbar'
import FeatureLayer from '@/components/feature-layer'
import DrawControl from '@/components/map/draw-control'
import BaseMap from '@/components/map/map'
import OperatePanel from '@/components/operate-panel'
import { TopMenu } from '@/components/top-menu'
import { featureTreeToNodes, flattenFeatureGroupsToNodes } from '@/lib/feature'
import { useFeatureStore } from '@/store'
import {
  DrawCreateEvent,
  DrawSelectionChangeEvent,
  DrawUpdateEvent
} from '@mapbox/mapbox-gl-draw'
import dynamic from 'next/dynamic'
import { useMemo, useState } from 'react'

const DynamicMap = dynamic(() => import('@/components/map/map'), {
  ssr: false
})

const DynamicDraw = dynamic(() => import('@/components/map/draw-control'), {
  ssr: false
})

export default function Home() {
  const {
    // featureNodes,
    featureGroups,
    updateFeatureGroups,
    selectedNodeIds,
    // updateFeatureNodes,
    updateSelectedNodeIds
  } = useFeatureStore((state) => state)

  const [drawMode, setDrawMode] = useState<MapboxDraw.DrawMode>('simple_select')

  const nodes = useMemo(() => {
    return flattenFeatureGroupsToNodes(featureGroups)
  }, [featureGroups])

  const onDrawFeatures = (e: DrawCreateEvent) => {
    updateFeatureGroups('default', e.features)
    // setDrawMode('simple_select')
  }

  const onUpdateFeatures = (e: DrawUpdateEvent) => {
    updateFeatureGroups(e.features)
  }

  const onSelectionChange = (e: DrawSelectionChangeEvent) => {
    const ids = e.features.map((feature) => String(feature.id))
    updateSelectedNodeIds(ids)
  }

  return (
    <main className='w-full h-full'>
      <TopMenu className='h-10' />
      <div className='h-[calc(100%-40px)]'>
        <DrawToolbar
          currentMode={drawMode}
          onModeChange={(mode) => {
            setDrawMode(mode)
          }}
        />
        <div className='relative h-[calc(100%-40px)] flex flex-row justify-between'>
          <FeatureLayer />
          <div className='h-full w-[calc(100%-200px-360px)]'>
            <DynamicMap>
              <DynamicDraw
                featureNodes={nodes}
                selectedIds={selectedNodeIds}
                mode={drawMode}
                onDrawCreate={onDrawFeatures}
                onDrawUpdate={onUpdateFeatures}
                onDrawSelectionChange={onSelectionChange}
              />
            </DynamicMap>
          </div>
          <OperatePanel className='w-[360px]' />
        </div>
      </div>
    </main>
  )
}
