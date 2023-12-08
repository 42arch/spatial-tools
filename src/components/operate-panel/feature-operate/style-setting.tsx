'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { useSelectedFeatures } from '@/hooks/use-selected-features'
import { FeatureType } from '@/types'
import { useMemo } from 'react'

const generateStyleList = (
  feature: FeatureType
): Array<{ keyName: string; value: any }> => {
  const properties = { ...feature.properties }

  switch (feature.geometry.type) {
    case 'Point':
    case 'MultiPoint':
      return [
        {
          keyName: 'stroke',
          value: 'rgba(175, 23, 144, 1)'
        },
        {
          keyName: 'stroke-width',
          value: 1
        },
        {
          keyName: 'stroke-opacity',
          value: 0.7
        }
      ]
    case 'LineString':
    case 'MultiLineString':
      return [
        {
          keyName: 'stroke',
          value: 'rgba(175, 23, 144, 1)'
        },
        {
          keyName: 'stroke-width',
          value: 1
        },
        {
          keyName: 'stroke-opacity',
          value: 0.7
        }
      ]
    case 'Polygon':
    case 'MultiPolygon':
      return [
        {
          keyName: 'fill',
          value: 'rgba(175, 23, 144, 1)'
        },
        {
          keyName: 'fill-opacity',
          value: properties['fill-opacity'] || 0.2
        },
        {
          keyName: 'stroke',
          value: 'rgba(175, 23, 144, 1)'
        },
        {
          keyName: 'stroke-width',
          value: 1
        },
        {
          keyName: 'stroke-opacity',
          value: 0.7
        }
      ]
    default:
      return []
  }
}

function StyleSetting() {
  const { topFeature, topFeaturePropertyList, updateTopFeature } =
    useSelectedFeatures()

  console.log(topFeature, 222333)

  const styleList = useMemo(() => {
    if (!topFeature) return []
    return generateStyleList(topFeature)
  }, [topFeature])

  const handleStyleCheckedChange = (
    checked: boolean,
    keyName: string,
    value: any
  ) => {
    console.log('style checked', keyName, value)

    if (topFeature && topFeature.properties) {
      const properties = { ...topFeature.properties }
      if (checked) {
        const newObj = { ...properties, [keyName]: value }
        updateTopFeature(newObj)
      } else {
        delete properties[keyName]
        updateTopFeature(properties)
      }
    }
  }

  const handleStyleChange = (keyName: string, value: any) => {
    if (topFeature && topFeature.properties) {
      const properties = { ...topFeature.properties }
      const newObj = { ...properties, [keyName]: value }
      updateTopFeature(newObj)
    }
  }

  return (
    <div className='flex flex-col text-sm border-b'>
      {styleList.map((style) => (
        <div
          key={style.keyName}
          className='flex flex-row h-8 justify-between border-t'
        >
          <div className='w-1/2 flex flex-row items-center gap-2 border-r'>
            <Checkbox
              id={style.keyName}
              checked={
                !!topFeaturePropertyList.find(
                  (prop) => prop.keyName === style.keyName
                )
              }
              onCheckedChange={(checked) =>
                handleStyleCheckedChange(
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
          <div className='text-sm w-1/2 p-0.5 flex flex-row items-center'>
            <Input
              className='rounded-none h-6 p-0 border-0 w-full'
              value={style.value}
              onChange={(e) => handleStyleChange(style.keyName, e.target.value)}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default StyleSetting
