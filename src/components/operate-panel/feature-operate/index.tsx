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

function FeatureOperate() {
  const { selectedFeatures } = useSelectedFeatures()

  return (
    <ScrollArea className='h-full px-2'>
      {selectedFeatures.length > 0 ? (
        <div>
          <div>
            <span className='text-sm inline-block pb-2'>Properties</span>
            <ScrollArea className='h-[360px]'>
              <PropertiesTable />
            </ScrollArea>
          </div>

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
              <AccordionContent>Geojson</AccordionContent>
            </AccordionItem>
            <AccordionItem value='export'>
              <AccordionTrigger className='text-sm'>Export</AccordionTrigger>
              <AccordionContent>Export</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      ) : (
        <div className='text-sm'>Create or Select a feature</div>
      )}
    </ScrollArea>
  )
}

export default FeatureOperate
