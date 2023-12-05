import { FeatureType } from '@/types'
import { useContext, useEffect, useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { FeatureOperateContext } from '.'

const styleKeyNames: string[] = [
  'fill',
  'fill-opacity',
  'stroke',
  'stroke-opacity',
  'stroke-width'
]

const generateStyleProps = (feature: FeatureType) => {
  switch (feature.geometry.type) {
    case 'Point':
    case 'MultiPoint':
      return {
        fill: 'rgba(175, 23, 144, 1)',
        'fill-opacity': 0.3,
        stroke: 'rgba(219, 140, 22, 1)',
        'stroke-opacity': 1,
        'stroke-width': 1
      }
    case 'LineString':
    case 'MultiLineString':
      return {
        fill: 'rgba(175, 23, 144, 1)',
        'fill-opacity': 0.3,
        stroke: 'rgba(219, 140, 22, 1)',
        'stroke-opacity': 1,
        'stroke-width': 1
      }
    case 'Polygon':
    case 'MultiPolygon':
      return {
        fill: 'rgba(175, 23, 144, 1)',
        'fill-opacity': 0.3,
        stroke: 'rgba(219, 140, 22, 1)',
        'stroke-opacity': 1,
        'stroke-width': 1
      }
    default:
      return null
  }
}

type StyleProps = { [key: string]: string | number | undefined | object }

function FeatureStyles() {
  const { feature, setFeature } = useContext(FeatureOperateContext)

  const [styleList, setStyleList] = useState<
    { keyName: string; value: string | number | undefined; checked: boolean }[]
  >([])

  useEffect(() => {
    if (feature) {
      const styleProps = generateStyleProps(feature)
      const styles = styleProps
        ? Object.entries(styleProps).map(([keyName, value]) => ({
            checked: false,
            keyName,
            value
          }))
        : []
      setStyleList(styles)
    }
  }, [feature])

  useEffect(() => {
    const styleProps = {}
    styleList.forEach((style) => {
      if (style.checked) {
        styleProps[style.keyName] = style.value
      }
    })
  }, [styleList])

  const handleCheckChange = (checked, keyName, value) => {
    setStyleList((prev) =>
      prev.map((style) =>
        style.keyName === keyName
          ? { ...style, checked, keyName, value }
          : style
      )
    )
  }

  return (
    <div className='flex flex-col border-t border-b'>
      {styleList.map((style) => (
        <div
          key={style.keyName}
          className='flex items-center justify-between h-8 border-b'
        >
          <div className='w-1/2 h-full flex flex-row items-center gap-2 border-r'>
            <Checkbox
              id={style.keyName}
              checked={style.checked}
              onCheckedChange={(checked) =>
                handleCheckChange(checked, style.keyName, style.value)
              }
            />
            <label htmlFor={style.keyName} className='text-sm leading-none'>
              {style.keyName}
            </label>
          </div>
          <div className='text-sm w-1/2 h-full p-0.5 flex flex-row items-center'>
            <Input
              className='rounded-none focus:ring-slate-800 focus-visible:ring-slate-800 h-6 p-0 border-0 w-full'
              // value={style.value}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default FeatureStyles
