import { useEffect, useState } from 'react'
import { useFeatures } from '@/hooks/use-features'
import { Icon } from '@iconify/react'
import plusIcon from '@iconify/icons-ph/plus'
import { CombinedKeyValue, getCombinedPropertyList } from './utils'
import { cn } from '@/lib/utils'
import { nanoid } from 'nanoid'
import KeyInput from './key-input'
import ValueInput from './value-input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { APP_PREFIX } from '@/lib/constants'

function DetailsPanel() {
  const { selectedFeatures, updateFeatures } = useFeatures()
  const [propertyList, setPropertyList] = useState<Array<CombinedKeyValue>>([])

  useEffect(() => {
    setPropertyList(getCombinedPropertyList(selectedFeatures))
  }, [selectedFeatures])

  const updateFeature = (
    propertyList: Array<CombinedKeyValue>,
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
    updateFeatures(newFeatures)
  }

  const handleEdit = (id: string, field: 'key' | 'value', value: string) => {
    const updatedPropertyList = [...propertyList]
    const index = propertyList.findIndex((property) => property.id === id)
    const itemToUpdate = updatedPropertyList[index] as CombinedKeyValue
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
    <ScrollArea type='scroll' className='h-full pb-4'>
      {propertyList
        .filter((p) => !p.key.startsWith(APP_PREFIX))
        .map((p) => (
          <div
            key={p.id}
            className={cn(
              'group relative flex flex-row justify-between odd:bg-accent'
            )}
          >
            <div className='relative w-2/5 px-1 py-[1px]'>
              <KeyInput
                value={p.key}
                count={p.count}
                countShow={selectedFeatures.length > 1}
                onEdit={(v) => {
                  handleEdit(p.id, 'key', v)
                }}
                onUpdate={() => {
                  updateFeature(propertyList, p.id)
                }}
              />
            </div>
            <div className='w-3/5 px-1 py-[1px]'>
              <ValueInput
                value={p.value}
                mixed={p.mixed}
                menuShow
                onEdit={(v) => {
                  handleEdit(p.id, 'value', v)
                }}
                onUpdate={() => {
                  updateFeature(propertyList)
                }}
                onDelete={() => handleDelete(p.key)}
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
            onClick={() => handleAdd()}
          />
        </div>
      ) : null}
    </ScrollArea>
  )
}

export default DetailsPanel
