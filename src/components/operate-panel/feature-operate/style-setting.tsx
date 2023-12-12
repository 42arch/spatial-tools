'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { useSelectedFeatures } from '@/hooks/use-selected-features'
import { FeatureType } from '@/types'
import { useEffect, useState } from 'react'
import { HexAlphaColorPicker } from 'react-colorful'
import { useDebounce } from 'react-use'

const generateStyleList = (
  feature: FeatureType
): Array<{ checked: boolean; keyName: string; value: any }> => {
  const properties = { ...feature.properties }

  switch (feature.geometry.type) {
    case 'Point':
    case 'MultiPoint':
      return [
        {
          checked: !!properties.stroke,
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
  const { topFeature, updateTopFeature } = useSelectedFeatures()

  const [styleList, setStyleList] = useState<
    Array<{ checked: boolean; keyName: string; value: any }>
  >([])

  useEffect(() => {
    if (!topFeature) return
    const styles = generateStyleList(topFeature)
    setStyleList(styles)
  }, [])

  useEffect(() => {
    if (topFeature && topFeature.properties) {
      const properties = { ...topFeature.properties }
      styleList.forEach((style) => {
        if (style.checked) {
          properties[style.keyName] = style.value
        } else {
          delete properties[style.keyName]
        }
      })
      updateTopFeature(properties)
    }
  }, [styleList])

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
          <div className='text-sm w-1/2 p-0.5 flex flex-row items-center'>
            <ColorValue
              value={style.value}
              onChange={(e) => handleStyleChange(style.keyName, e)}
              // onChange={(e) => handleStyleChange(style.keyName, e)}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default StyleSetting
