'use client'

import FeatureOperate from '@/components/feature-operate'
import TopMenu from '@/components/top-menu'
import { useFeatures } from '@/hooks/use-features'
import {
  DrawCreateEvent,
  DrawSelectionChangeEvent,
  DrawUpdateEvent
} from '@mapbox/mapbox-gl-draw'
import dynamic from 'next/dynamic'
import DataList from '@/components/data-list'
import ToolBar from '@/components/tool-bar'

const DynamicMap = dynamic(() => import('@/components/map/map'), {
  ssr: false
})

const DynamicDraw = dynamic(() => import('@/components/map/draw-control'), {
  ssr: false
})

export default function Home() {
  const { features } = useFeatures()

  // const onDrawFeatures = (e: DrawCreateEvent) => {
  //   setFeatureGroups(e.features)
  // }

  // const onUpdateFeatures = (e: DrawUpdateEvent) => {
  //   setFeatureGroups(e.features)
  // }

  // const onSelectionChange = (e: DrawSelectionChangeEvent) => {
  //   const ids = e.features.map((feature) => String(feature.id))
  //   setSelectedFeatureNodeIds(ids)
  // }

  return (
    <main className='h-full w-full'>
      <TopMenu className='h-10' />
      <div className='h-[calc(100%-40px)]'>
        {/* <DrawToolbar /> */}
        <div className='h-10 w-full text-center'>
          <ToolBar />
        </div>
        <div className='relative flex h-[calc(100%-40px)] flex-row justify-between'>
          <DataList />
          <div className='h-full w-[calc(100%-200px-360px)]'>
            <DynamicMap>
              <DynamicDraw
              // featureNodes={[]}
              // selectedIds={[]}
              // onDrawCreate={}
              // onDrawUpdate={onUpdateFeatures}
              // onDrawSelectionChange={onSelectionChange}
              />
            </DynamicMap>
          </div>
          <FeatureOperate />
        </div>
      </div>
    </main>
  )
}
