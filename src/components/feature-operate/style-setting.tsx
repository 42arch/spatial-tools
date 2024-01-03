'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { useFeatures } from '@/hooks/use-features'
import { POINT_STYLE_PROPERTIES } from '@/lib/constants'
import { generateStyleProperties } from '@/lib/style'
import { FeatureType } from '@/types'
import { useEffect, useMemo, useState } from 'react'
import { HexAlphaColorPicker } from 'react-colorful'
import { useDebounce } from 'react-use'

const generateStyleList = (feature: FeatureType) => {
  const properties = { ...feature.properties }

  switch (feature.geometry.type) {
    case 'Point':
    case 'MultiPoint':
      return POINT_STYLE_PROPERTIES
    case 'LineString':
    case 'MultiLineString':
      return [
        {
          checked: !!properties['stroke'],
          keyName: 'stroke',
          value: '#af1790'
        },
        {
          checked: !!properties['stroke-width'],
          keyName: 'stroke-width',
          value: 1
        },
        {
          checked: !!properties['stroke-opacity'],
          keyName: 'stroke-opacity',
          value: 0.7
        }
      ]
    case 'Polygon':
    case 'MultiPolygon':
      return [
        {
          checked: !!properties['fill'],
          keyName: 'fill',
          value: '#af1790'
        },
        {
          checked: !!properties['fill-opacity'],
          keyName: 'fill-opacity',
          value: properties['fill-opacity'] || 0.8
        },
        {
          checked: !!properties['stroke'],
          keyName: 'stroke',
          value: '#af1790'
        },
        {
          checked: !!properties['stroke-width'],
          keyName: 'stroke-width',
          value: 1
        },
        {
          checked: !!properties['stroke-opacity'],
          keyName: 'stroke-opacity',
          value: 0.9
        }
      ]
    default:
      return []
  }
}

function ColorValue({
  value,
  onChange
}: {
  value: string
  onChange: (value: string) => void
}) {
  const [color, setColor] = useState(value)
  useDebounce(() => onChange(color), 200, [color])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <span>{value}</span>
      </PopoverTrigger>
      <PopoverContent className='w-60'>
        <HexAlphaColorPicker color={color} onChange={setColor} />
        <Input
          className='mt-4 h-8'
          value={color}
          onChange={(e) => {
            setColor(e.target.value)
          }}
        />
      </PopoverContent>
    </Popover>
  )
}

function NumberValue({}) {
  return <div></div>
}

function StyleSetting() {
  const { selectedFeatures, topFeature, updateTopFeature } = useFeatures()

  const styleList = useMemo(() => {
    console.log(444444, selectedFeatures)
    return generateStyleProperties(selectedFeatures)
  }, [selectedFeatures])

  // const [styleList, setStyleList] = useState<
  //   Array<{ checked: boolean; keyName: string; value: any }>
  // >([])

  // useEffect(() => {
  //   if (!topFeature) return
  //   const styles = generateStyleList(topFeature)
  //   setStyleList(styles)
  // }, [])

  // useEffect(() => {
  //   if (topFeature && topFeature.properties) {
  //     const properties = { ...topFeature.properties }
  //     styleList.forEach((style) => {
  //       if (style.checked) {
  //         properties[style.keyName] = style.value
  //       } else {
  //         delete properties[style.keyName]
  //       }
  //     })
  //     updateTopFeature(properties)
  //   }
  // }, [styleList])

  const handleStyleCheckedChange = (
    checked: boolean,
    keyName: string,
    value: any
  ) => {
    console.log('style checked', checked, keyName, value)

    const updatedStyleList = styleList.map((style) => {
      if (style.keyName === keyName) {
        return { ...style, checked: checked, value: value }
      }
      return style
    })

    setStyleList(updatedStyleList)
  }

  const handleStyleChange = (keyName: string, value: any) => {
    const updatedStyleList = styleList.map((style) => {
      if (style.keyName === keyName) {
        return { ...style, value: value }
      }
      return style
    })

    setStyleList(updatedStyleList)
  }

  console.log(styleList, 55566777)

  return (
    <div className='flex h-full flex-col border-b text-sm'>
      {/* {styleList.map((style) => (
        <div
          key={style.keyName}
          className='flex h-8 flex-row justify-between border-t'
        >
          <div className='flex w-1/2 flex-row items-center gap-2 border-r'>
            <Checkbox
              id={style.keyName}
              checked={style.checked}
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
          <div className='flex w-1/2 flex-row items-center p-0.5 text-sm'>
            <ColorValue
              value={style.value}
              onChange={(e) => handleStyleChange(style.keyName, e)}
              // onChange={(e) => handleStyleChange(style.keyName, e)}
            />
          </div>
        </div>
      ))} */}
    </div>
  )
}

export default StyleSetting
