import { FeatureType } from '@/types'
import { nanoid } from 'nanoid'

export interface CombinedProperty {
  // id: string
  key: string
  count: number
  value: string
}

// export function getKeyById(propertyList: Array<CombinedProperty>, id: string) {
//   return propertyList.find((p) => p.id === id)?.key
// }

export function getCombinedPropertyList(features: Array<FeatureType>) {
  const result: Array<CombinedProperty> = []
  features.forEach((feature) => {
    const properties = feature.properties
    if (properties) {
      Object.keys(properties).forEach((key) => {
        const index = result.findIndex((item) => item.key === key)
        if (index !== -1) {
          result[index].count++
          if (result[index].value !== properties[key]) {
            result[index].value = 'mixed'
          }
        } else {
          result.push({
            // id: nanoid(),
            key: key,
            count: 1,
            value: properties[key]
          })
        }
      })
    }
  })
  return result
}
