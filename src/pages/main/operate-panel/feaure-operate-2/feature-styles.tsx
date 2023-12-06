import { FeatureType } from '@/types'
import { useContext, useEffect, useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { FeatureOperateContext } from '.'
import { useFeatures } from './useFeatures'

const styleKeyNames: string[] = [
  'fill',
  'fill-opacity',
  'stroke',
  'stroke-opacity',
  'stroke-width'
]

const generateProps = (feature: FeatureType) => {
  switch (feature.geometry.type) {
    case 'Point':
    case 'MultiPoint':
      return {
        ...feature.properties,
        fill: 'rgba(175, 23, 144, 1)',
        'fill-opacity': 0.3,
        stroke: 'rgba(219, 140, 22, 1)',
        'stroke-opacity': 1,
        'stroke-width': 1
      }
    case 'LineString':
    case 'MultiLineString':
      return {
        ...feature.properties,
        fill: 'rgba(175, 23, 144, 1)',
        'fill-opacity': 0.3,
        stroke: 'rgba(219, 140, 22, 1)',
        'stroke-opacity': 1,
        'stroke-width': 1
      }
    case 'Polygon':
    case 'MultiPolygon':
      return {
        ...feature.properties,
        fill: 'rgba(175, 23, 144, 1)',
        'fill-opacity': 0.3,
        stroke: 'rgba(219, 140, 22, 1)',
        'stroke-opacity': 1,
        'stroke-width': 1
      }
    default:
      return { ...feature.properties }
  }
}

type StyleProps = { [key: string]: string | number | undefined | object }

function FeatureStyles() {
  const { feature, setFeature } = useContext(FeatureOperateContext)
  // const { selectedFeatures } = useFeatures()

  const [propList, setPropList] = useState<
    {
      keyName: string
      isStyle: boolean
      value: string | number | undefined
      checked: boolean
    }[]
  >([])

  useEffect(() => {
    if (feature) {
      const props = generateProps(feature)
      setPropList(
        props
          ? Object.entries(props).map(([keyName, value]) => {
              return {
                isStyle: styleKeyNames.includes(keyName),
                checked: false,
                keyName,
                value
              }
            })
          : []
      )
    }
  }, [])

  useEffect(() => {
    const valueProps = {}
    const styleProps = {}
    propList.forEach((prop) => {
      if (prop.isStyle) {
        if (prop.checked) {
          styleProps[prop.keyName] = prop.value
        }
      } else {
        valueProps[prop.keyName] = prop.value
      }
    })

    if (setFeature) {
      setFeature((prev) => ({
        ...prev,
        properties: {
          ...valueProps,
          ...styleProps
        }
      }))
    }
  }, [propList, setFeature])

  const handleCheckChange = (checked: boolean, keyName, value) => {
    // setPropList((prev) =>
    //   prev.map((style) =>
    //     style.keyName === keyName
    //       ? { ...style, checked, keyName, value }
    //       : style
    //   )
    // )

    const valueProps = {}
    const styleProps = {}
    propList.forEach((prop) => {
      if (prop.isStyle) {
        if (prop.checked) {
          styleProps[prop.keyName] = prop.value
        }
      } else {
        valueProps[prop.keyName] = prop.value
      }
    })

    if (setFeature) {
      setFeature((prev) => ({
        ...prev,
        properties: {
          ...valueProps,
          ...styleProps
        }
      }))
    }
  }

  return (
    <div className='flex flex-col border-t border-b text-sm'>
      {propList
        .filter((prop) => styleKeyNames.includes(prop.keyName))
        .map((style) => (
          <div
            key={style.keyName}
            className='flex items-center justify-between h-8 border-b'
          >
            <div className='w-1/2 h-full flex flex-row items-center gap-2 border-r'>
              <Checkbox
                id={style.keyName}
                checked={style.checked}
                onCheckedChange={(checked) =>
                  handleCheckChange(
                    Boolean(checked),
                    style.keyName,
                    style.value
                  )
                }
              />
              <label htmlFor={style.keyName} className='text-sm leading-none'>
                {style.keyName}
              </label>
            </div>
            <div className='text-sm w-1/2 h-full p-0.5 flex flex-row items-center'>
              <Input
                className='rounded-none focus:ring-slate-800 focus-visible:ring-slate-800 h-6 p-0 border-0 w-full'
                value={style.value}
                onChange={(e) =>
                  handleCheckChange(
                    Boolean(style.checked),
                    style.keyName,
                    e.target.value
                  )
                }
              />
            </div>
          </div>
        ))}
    </div>
  )
}

export default FeatureStyles
