import { useFeatures } from '@/hooks/use-features'
import { useEffect, useState } from 'react'
import { CombinedProperty, getCombinedPropertyList } from './utils'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

function DetailsPanel() {
  const { selectedFeatures, updateSelectedFeature } = useFeatures()
  const [propertyList, setPropertyList] = useState<Array<CombinedProperty>>([])
  const [emptyIndex, setEmptyIndex] = useState<Array<number>>([])

  useEffect(() => {
    console.log(7776666, getCombinedPropertyList(selectedFeatures))
    setPropertyList(getCombinedPropertyList(selectedFeatures))
  }, [selectedFeatures])

  const updateFeature = (propertyList: Array<CombinedProperty>) => {
    const updatedData: Record<string, string> = propertyList.reduce(
      (result, item) => {
        result[item.key] = item.value
        return result
      },
      {}
    )
    console.log(updatedData, 44444)
    const newFeatures = selectedFeatures.map((feature) => {
      return {
        ...feature,
        properties: updatedData
      }
    })
    updateSelectedFeature(newFeatures)
  }

  const handleEdit = (index: number, filed: 'key' | 'value', value: string) => {
    const updatedPropertyList = [...propertyList]
    // if (filed == 'key' && value.trim() === '') {
    //   setEmptyIndex((prev) => [...prev, index])
    //   return
    // }
    const itemToUpdate = updatedPropertyList[index] as CombinedProperty
    itemToUpdate[filed] = value
    setPropertyList(updatedPropertyList)
    updateFeature(updatedPropertyList)
  }

  const handleAdd = () => {
    const updatedPropertyList = [
      ...propertyList,
      { key: '', count: 0, value: '' }
    ]
    setPropertyList(updatedPropertyList)
    updateFeature(updatedPropertyList)
  }

  const handleDelete = () => {}

  return (
    <div className='block '>
      {propertyList.map((property, index) => (
        <div
          key={index}
          className={cn(
            'flex flex-row justify-between odd:bg-accent',
            emptyIndex.includes(index) ? 'border border-destructive' : ''
          )}
        >
          <div className='w-2/5 px-1 py-[1px]'>
            <Input
              type='text'
              placeholder='key'
              className='h-6 border-none px-3 py-[1px] text-xs text-accent-foreground'
              // defaultValue={property.key}
              value={property.key}
              onChange={(e) => {
                handleEdit(index, 'key', e.target.value)
              }}
              onFocus={handleAdd}
            />
          </div>
          <div className='w-3/5 px-1 py-[1px]'>
            <Input
              type='text'
              placeholder='value'
              className='h-6 border-none px-3 py-[1px] text-xs text-secondary-foreground'
              value={property.value}
              onChange={(e) => {
                handleEdit(index, 'value', e.target.value)
              }}
              onFocus={handleAdd}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default DetailsPanel
