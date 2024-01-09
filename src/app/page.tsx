'use client'

import { DrawToolbar } from '@/components/draw-toolbar'
import FeatureOperate from '@/components/feature-operate'
import TopMenu from '@/components/top-menu'
import { useFeatures } from '@/hooks/use-features'
import { useFeatureStore } from '@/store'
import {
  DrawCreateEvent,
  DrawSelectionChangeEvent,
  DrawUpdateEvent
} from '@mapbox/mapbox-gl-draw'
import dynamic from 'next/dynamic'
import DataList from '@/components/data-list'

const DynamicMap = dynamic(() => import('@/components/map/map'), {
  ssr: false
})

const DynamicDraw = dynamic(() => import('@/components/map/draw-control'), {
  ssr: false
})

export default function Home() {
  const {
    setFeatureGroups,
    selectedFeatureNodeIds,
    setSelectedFeatureNodeIds
  } = useFeatureStore((state) => state)

  const { featureNodes } = useFeatures()

  const onDrawFeatures = (e: DrawCreateEvent) => {
    setFeatureGroups(e.features)
  }

  const onUpdateFeatures = (e: DrawUpdateEvent) => {
    setFeatureGroups(e.features)
  }

  const onSelectionChange = (e: DrawSelectionChangeEvent) => {
    const ids = e.features.map((feature) => String(feature.id))
    setSelectedFeatureNodeIds(ids)
  }

  return (
    <main className='h-full w-full'>
      <TopMenu className='h-10' />
      <div className='h-[calc(100%-40px)]'>
        <DrawToolbar />
        <div className='relative flex h-[calc(100%-40px)] flex-row justify-between'>
          <DataList />
          <div className='h-full w-[calc(100%-200px-360px)]'>
            <DynamicMap>
              <DynamicDraw
                featureNodes={featureNodes}
                selectedIds={selectedFeatureNodeIds}
                onDrawCreate={onDrawFeatures}
                onDrawUpdate={onUpdateFeatures}
                onDrawSelectionChange={onSelectionChange}
              />
            </DynamicMap>
          </div>
          <FeatureOperate />
        </div>
      </div>
    </main>
  )
}
