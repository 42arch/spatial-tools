import { FeatureType } from '@/types'
import { nanoid } from 'nanoid'

export interface CombinedKeyValue {
  id: string
  key: string
  count: number
  mixed: boolean
  value: string
}

export function getCombinedPropertyList(features: Array<FeatureType>) {
  const result: Array<CombinedKeyValue> = []
  features.forEach((feature) => {
    const properties = feature.properties
    if (properties) {
      Object.keys(properties).forEach((key, id) => {
        const index = result.findIndex((item) => item.key === key)
        if (index !== -1) {
          result[index].count++
          if (result[index].value !== properties[key]) {
            result[index].value = ''
            result[index].mixed = true
          }
        } else {
          result.push({
            id: nanoid(),
            key: key,
            count: 1,
            mixed: false,
            value: properties[key]
          })
        }
      })
    }
  })
  return result
}
