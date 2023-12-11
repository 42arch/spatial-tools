import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { ScrollArea } from '@/components/ui/scroll-area'

import { useSelectedFeatures } from '@/hooks/use-selected-features'
import { useFeatureStore } from '@/store'
import PropertiesTable from './properties-table'
import StyleSetting from './style-setting'
import GeojsonEditor from './geojson-editor'

function FeatureOperate() {
  const { selectedFeatures } = useSelectedFeatures()

  return (
    <div className='h-full px-2'>
      {selectedFeatures.length > 0 ? (
        <div className='h-full flex flex-col justify-between'>
          <div className='h-1/2'>
            <span className='text-sm inline-block pb-2'>Properties</span>
            <ScrollArea className='h-[calc(100%-28px)]'>
              <PropertiesTable />
            </ScrollArea>
          </div>
          <ScrollArea className='h-1/2'>
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
                <AccordionTrigger className='text-sm'>Geojson</AccordionTrigger>
                <AccordionContent>
                  <GeojsonEditor />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value='export'>
                <AccordionTrigger className='text-sm'>Export</AccordionTrigger>
                <AccordionContent>Export</AccordionContent>
              </AccordionItem>
            </Accordion>
          </ScrollArea>
        </div>
      ) : (
        <div className='text-sm'>Create or Select a feature</div>
      )}
    </div>
  )
}

export default FeatureOperate
