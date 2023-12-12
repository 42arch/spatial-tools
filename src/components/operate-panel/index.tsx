import { cn } from '@/lib/utils'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import FeatureOperate from './feature-operate'
import TableOperate from './table-operate'

interface OperatePanelProps {
  className?: string
}

function OperatePanel({ className }: OperatePanelProps) {
  return (
    <div className={cn(className, 'h-full px-1')}>
      <Tabs defaultValue='feature' className='w-full h-full'>
        <TabsList className='h-8 w-full justify-evenly'>
          <TabsTrigger value='feature' className='w-full'>
            Feature
          </TabsTrigger>
          <TabsTrigger value='datatable' className='w-full'>
            Table
          </TabsTrigger>
        </TabsList>
        <TabsContent value='feature' className='h-[calc(100%-32px)]'>
          <FeatureOperate />
        </TabsContent>
        <TabsContent value='datatable' className='h-full'>
          <TableOperate />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default OperatePanel