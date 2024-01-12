'use client'

import dynamic from 'next/dynamic'
import FeatureOperate from '@/components/feature-operate'
import TopMenu from '@/components/top-menu'
import DataList from '@/components/data-list'
import ToolBar from '@/components/tool-bar'
import DraggableViews from './draggable-views'

const DynamicMap = dynamic(() => import('@/components/map/map'), {
  ssr: false
})

const DynamicDraw = dynamic(() => import('@/components/map/draw-control'), {
  ssr: false
})

export default function Home() {
  return (
    <main className='h-full w-full'>
      <TopMenu className='h-10' />
      <div className='h-[calc(100%-40px)]'>
        {/* <DrawToolbar /> */}
        <div className='flex h-10 w-full items-center justify-center text-center'>
          <ToolBar />
        </div>
        <div className='relative flex h-[calc(100%-40px)] flex-row justify-between'>
          <DataList />
          <div className='h-full w-[calc(100%-200px-360px)]'>
            <DynamicMap>
              <DynamicDraw />
            </DynamicMap>
          </div>
          <FeatureOperate />
        </div>
      </div>
      <DraggableViews />
    </main>
  )
}
