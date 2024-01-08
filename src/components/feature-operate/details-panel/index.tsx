import { useEffect, useState } from 'react'
import { useFeatures } from '@/hooks/use-features'
import { Icon } from '@iconify/react'
import plusIcon from '@iconify/icons-ph/plus'
import { CombinedProperty, getCombinedPropertyList } from './utils'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { nanoid } from 'nanoid'
import RowMenu from './row-menu'
import KeyInput from './key-input'
import ValueInput from './value-input'

function DetailsPanel() {
  const { selectedFeatures, updateSelectedFeature } = useFeatures()
  const [propertyList, setPropertyList] = useState<Array<CombinedProperty>>([])
  const [isInputChange, setIsInputChange] = useState(false)
  const [emptyIndex, setEmptyIndex] = useState<Array<number>>([])

  useEffect(() => {
    console.log(7776666, getCombinedPropertyList(selectedFeatures))
    setPropertyList(getCombinedPropertyList(selectedFeatures))
  }, [selectedFeatures])

  const updateFeature = (
    propertyList: Array<CombinedProperty>,
    deleteKey?: string
  ) => {
    const newFeatures = selectedFeatures.map((feature) => {
      const oldProperties = { ...feature.properties }
      const newProperties: Record<string, string> = {}
      propertyList.forEach((item) => {
        if (!item.mixed) {
          newProperties[item.key] = item.value
        } else {
          newProperties[item.key] = oldProperties[item.key]
        }
      })

      if (deleteKey) {
        delete newProperties[deleteKey]
      }

      return {
        ...feature,
        properties: newProperties
      }
    })
    updateSelectedFeature(newFeatures)
  }

  const handleEdit = (id: string, field: 'key' | 'value', value: string) => {
    const updatedPropertyList = [...propertyList]
    const index = propertyList.findIndex((property) => property.id === id)
    const itemToUpdate = updatedPropertyList[index] as CombinedProperty
    itemToUpdate[field] = value
    if (field === 'value') {
      itemToUpdate.mixed = false
    }
    setPropertyList(updatedPropertyList)
  }

  const handleAdd = () => {
    const updatedPropertyList = [
      ...propertyList,
      { key: '', id: nanoid(), count: 0, mixed: false, value: '' }
    ]
    setPropertyList(updatedPropertyList)
    updateFeature(updatedPropertyList)
  }

  const handleDelete = (key: string) => {
    updateFeature(propertyList, key)
  }

  return (
    <div className='block '>
      {propertyList.map((property) => (
        <div
          key={property.id}
          className={cn(
            'group relative flex flex-row justify-between odd:bg-accent'
            // emptyIndex.includes(index) ? 'border border-destructive' : ''
          )}
        >
          <div className='relative w-2/5 px-1 py-[1px]'>
            <KeyInput
              data={property}
              onEdit={(v) => {
                handleEdit(property.id, 'key', v)
              }}
              onUpdate={() => {
                updateFeature(propertyList, property.id)
              }}
            />
          </div>
          <div className='w-3/5 px-1 py-[1px]'>
            <ValueInput
              data={property}
              onEdit={(v) => {
                handleEdit(property.id, 'value', v)
              }}
              onUpdate={() => {
                updateFeature(propertyList)
              }}
              onDelete={() => handleDelete(property.key)}
            />
          </div>
        </div>
      ))}
      {selectedFeatures.length ? (
        <div className='flex h-6 items-center justify-end px-4'>
          <Icon
            icon={plusIcon}
            width={16}
            height={16}
            className='cursor-pointer'
            onClick={handleAdd}
          />
        </div>
      ) : null}
    </div>
  )
}

export default DetailsPanel
