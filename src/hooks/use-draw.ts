import { useDrawStore } from '@/store'
import { FeatureType } from '@/types'

export default function useDraw() {
  const { drawRef, mode, setMode } = useDrawStore()

  const setFeatureProperty = (
    featureId: string | number,
    property: string,
    value: any
  ) => {
    drawRef?.current?.setFeatureProperty(String(featureId), property, value)
  }

  const refreshStyle = (features: Array<FeatureType>) => {
    features.forEach((feature) => {
      const properties = feature.properties
      if (properties) {
        Object.keys(properties).forEach((key) => {
          if (feature.id) {
            setFeatureProperty(feature.id, key, properties[key])
          }
        })
      }
    })
  }

  return {
    setFeatureProperty,
    refreshStyle,
    mode,
    setMode
  }
}
