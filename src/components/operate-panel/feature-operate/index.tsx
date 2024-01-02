import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useFeatures } from '@/hooks/use-features'
import PropertiesTable from './properties-table'
import StyleSetting from './style-setting'
import GeojsonEditor from './geojson-editor'

function FeatureOperate() {
  const { selectedFeatureNodeIds } = useFeatures()

  return (
    <div className='h-full px-2'>
      {selectedFeatureNodeIds.length ? (
        <>
          <div className='h-2/5'>
            <span className='inline-block pb-2 text-sm'>Properties</span>
            <ScrollArea className='h-[calc(100%-28px)]'>
              <PropertiesTable />
            </ScrollArea>
          </div>
          <ScrollArea className='h-3/5 pr-2'>
            <Accordion type='single' collapsible>
              <AccordionItem value='style'>
                <AccordionTrigger className='text-sm'>
                  Style Setting
                </AccordionTrigger>
                <AccordionContent>
                  <StyleSetting />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value='geojson'>
                <AccordionTrigger className='text-sm'>GeoJSON</AccordionTrigger>
                <AccordionContent>
                  <ScrollArea className='wfull'>
                    <GeojsonEditor />
                  </ScrollArea>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value='export'>
                <AccordionTrigger className='text-sm'>Export</AccordionTrigger>
                <AccordionContent>Export</AccordionContent>
              </AccordionItem>
            </Accordion>
          </ScrollArea>
        </>
      ) : (
        <div className='text-sm'>Create or Select a feature</div>
      )}
    </div>
  )
}

export default FeatureOperate
