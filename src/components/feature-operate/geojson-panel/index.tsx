import CodeMirror from '@uiw/react-codemirror'
import { json } from '@codemirror/lang-json'
import { useFeatures } from '@/hooks/use-features'
import { useEffect, useState } from 'react'
import { isJSONString, toGeoJSONString } from '@/lib/geojson'
import { ScrollArea } from '@/components/ui/scroll-area'

function GeoJSONPanel() {
  const [jsonString, setJsonString] = useState('')
  const { selectedFeatures, updateSelectedFeature } = useFeatures()

  useEffect(() => {
    setJsonString(toGeoJSONString(selectedFeatures))
  }, [selectedFeatures])

  const handleChange = (value: string) => {
    if (!isJSONString(value)) return
    updateSelectedFeature(JSON.parse(value))
  }

  return (
    <ScrollArea type='scroll' className='h-full w-full'>
      <CodeMirror
        className='h-72 w-full'
        value={jsonString}
        onChange={handleChange}
        extensions={[json()]}
      />
    </ScrollArea>
  )
}

export default GeoJSONPanel
