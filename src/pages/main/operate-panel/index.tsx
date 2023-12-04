import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import FeatureOperate from './feature-operate'
import DataTableOperate from './datatable-operate'

function OperatePanel() {
  return (
    <div className='h-full px-1'>
      <Tabs defaultValue='feature' className='w-full h-full'>
        <TabsList className='w-full justify-evenly'>
          <TabsTrigger value='feature' className='w-full'>
            Feature
          </TabsTrigger>
          <TabsTrigger value='datatable' className='w-full'>
            Table
          </TabsTrigger>
        </TabsList>
        <TabsContent value='feature'>
          <FeatureOperate />
        </TabsContent>
        <TabsContent value='datatable'>
          <DataTableOperate />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default OperatePanel
