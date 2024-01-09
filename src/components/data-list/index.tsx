import { ScrollArea } from '@/components/ui/scroll-area'
import FeatureList from './feature-list'
import LayerList from './layer-list'

function DataList() {
  return (
    <div className='flex h-full w-[200px] flex-col p-2'>
      <ScrollArea className='h-[calc(100%-32px)]'>
        <FeatureList />
        <LayerList />
      </ScrollArea>
    </div>
  )
}

export default DataList
