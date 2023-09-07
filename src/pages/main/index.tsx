import BaseMap from '@/components/map'
import { TopMenu } from '@/components/topmenu'

function MainPage() {
  return (
    <div className='w-full h-full'>
      <TopMenu />
      <div className='border-t h-[calc(100%-36px)]'>
        <BaseMap />
      </div>
    </div>
  )
}

export default MainPage
