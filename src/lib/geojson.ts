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
  return elements.length > 1
    ? JSON.stringify(elements, null, 2)
    : JSON.stringify(elements[0], null, 2)
}
