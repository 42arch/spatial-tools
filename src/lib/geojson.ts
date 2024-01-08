import { FeatureType } from '@/types'

export const isJSONString = (str: string): boolean => {
  try {
    JSON.parse(str)
    return true
  } catch (e) {
    return false
  }
}

export function toGeoJSONString(elements: Array<FeatureType>) {
  return JSON.stringify(elements, null, 2)
}
