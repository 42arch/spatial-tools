import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import StyleSetting from './style-setting'

function FeatureOperate() {
  return (
    <Tabs defaultValue='style' className='w-[400px]'>
      <TabsList>
        <TabsTrigger value='style'>Style</TabsTrigger>
        <TabsTrigger value='details'>Details</TabsTrigger>
        <TabsTrigger value='code'>Code</TabsTrigger>
      </TabsList>
      <TabsContent value='style' className='h-full'>
        <StyleSetting />
      </TabsContent>
      <TabsContent value='details'>Change your password here.</TabsContent>
      <TabsContent value='code'>Change your password here.</TabsContent>
    </Tabs>
  )
}

export default FeatureOperate
