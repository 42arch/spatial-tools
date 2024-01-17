import { LayerType } from '@/types'

export function getFeaturesData(layer: LayerType) {
  const data = layer.data.features.map((feature) => {
    return feature.properties as {
      [key: string]: any
    }
  })
  return data
}
