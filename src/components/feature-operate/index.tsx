import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import StylePanel from './style-panel'
import DetailsPanel from './details-panel'
import GeoJSONPanel from './geojson-panel'

function FeatureOperate() {
  return (
    <Tabs defaultValue='style' className='w-[400px]'>
      <TabsList className='h-9 text-sm'>
        <TabsTrigger className='w-16' value='style'>
          Style
        </TabsTrigger>
        <TabsTrigger className='w-16' value='details'>
          Details
        </TabsTrigger>
        <TabsTrigger className='w-16' value='geojson'>
          Json
        </TabsTrigger>
      </TabsList>
      <TabsContent value='style'>
        <StylePanel />
      </TabsContent>
      <TabsContent value='details'>
        <DetailsPanel />
      </TabsContent>
      <TabsContent value='geojson'>
        <GeoJSONPanel />
      </TabsContent>
    </Tabs>
  )
}

export default FeatureOperate
