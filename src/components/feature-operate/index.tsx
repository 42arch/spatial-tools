import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import StylePanel from './style-panel'
import DetailsPanel from './details-panel'

function FeatureOperate() {
  return (
    <Tabs defaultValue='style' className='w-[400px]'>
      <TabsList className='h-9'>
        <TabsTrigger value='style'>Style</TabsTrigger>
        <TabsTrigger value='details'>Details</TabsTrigger>
        <TabsTrigger value='code'>Code</TabsTrigger>
      </TabsList>
      <TabsContent value='style'>
        <StylePanel />
      </TabsContent>
      <TabsContent value='details'>
        <DetailsPanel />
      </TabsContent>
      <TabsContent value='code'>Change your password here.</TabsContent>
    </Tabs>
  )
}

export default FeatureOperate
