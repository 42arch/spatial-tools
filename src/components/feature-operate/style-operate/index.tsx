'use client'

import { useFeatures } from '@/hooks/use-features'
import {
  LineStringStyleId,
  PolygonStyleId,
  StyleGroupProps,
  StyleValue,
  getStylePropKey,
  generateStyleSetting,
  StyleId,
  PointStyleId
} from '@/lib/style'
import { useCallback, useEffect, useMemo, useState } from 'react'
import ColorInput from './color-input'
import StrokeStyleInput from './stroke-style-input'
import NumberInput from './number-input'

interface GeometryStyleProps {
  styles: StyleGroupProps
  onKeyValueChange: (key: string, value: StyleValue) => void
}

function PointStyle({ styles, onKeyValueChange }: GeometryStyleProps) {
  const handleValueChange = (id: PointStyleId, value: StyleValue) => {
    const key = getStylePropKey(id)
    onKeyValueChange(key, value)
  }

  return (
    <div className='flex w-full flex-col gap-1 py-2'>
      <div className='flex h-8 flex-row items-center justify-between'>
        <label className='w-24'>Color</label>
        <div className='w-[calc(100%-96px)]'>
          <ColorInput
            value={styles.Color?.value as string}
            onChange={(value) => handleValueChange('point-color', value)}
          />
        </div>
      </div>
      <div className='flex h-8 flex-row items-center justify-between'>
        <label className='w-24'>Symbol</label>
        <div className='w-[calc(100%-96px)]'>
          <StrokeStyleInput
            value={styles.Style?.value as string}
            onChange={(value) => handleValueChange('point-symbol', value)}
          />
        </div>
      </div>
    </div>
  )
}

function LineStringStyle({ styles, onKeyValueChange }: GeometryStyleProps) {
  const handleValueChange = (id: LineStringStyleId, value: StyleValue) => {
    const key = getStylePropKey(id)
    onKeyValueChange(key, value)
  }

  return (
    <div className='flex w-full flex-col gap-1 py-2'>
      <div className='flex h-8 flex-row items-center justify-between'>
        <label className='w-24'>Color</label>
        <div className='w-[calc(100%-96px)]'>
          <ColorInput
            value={styles.Color?.value as string}
            onChange={(value) => handleValueChange('linestring-color', value)}
          />
        </div>
      </div>
      <div className='flex h-8 flex-row items-center  justify-between'>
        <label className='w-24'>Stroke</label>
        <div className='w-[calc(100%-96px)]'>
          <NumberInput
            type='precent'
            value={styles.Stroke?.value as number}
            onChange={(value) =>
              handleValueChange('linestring-stroke-opacity', value)
            }
          />
        </div>
      </div>
      <div className='flex h-8 flex-row items-center justify-between'>
        <label className='w-24'>Width</label>
        <div className='w-[calc(100%-96px)]'>
          <NumberInput
            type='number'
            max={10}
            step={0.1}
            value={styles.Width?.value as number}
            onChange={(value) =>
              handleValueChange('linestring-stroke-width', value)
            }
          />
        </div>
      </div>
      <div className='flex h-8 flex-row items-center justify-between'>
        <label className='w-24'>Style</label>
        <div className='w-[calc(100%-96px)]'>
          <StrokeStyleInput
            value={styles.Style?.value as string}
            onChange={(value) =>
              handleValueChange('linestring-stroke-style', value)
            }
          />
        </div>
      </div>
    </div>
  )
}

function PolygonStyle({ styles, onKeyValueChange }: GeometryStyleProps) {
  const handleValueChange = (id: PolygonStyleId, value: StyleValue) => {
    const key = getStylePropKey(id)
    onKeyValueChange(key, value)
  }

  return (
    <div className='flex w-full flex-col gap-1 py-2'>
      <div className='flex h-8 flex-row items-center justify-between'>
        <label className='w-24'>Color</label>
        <div className='w-[calc(100%-96px)]'>
          <ColorInput
            value={styles.Color?.value as string}
            onChange={(value) => handleValueChange('polygon-color', value)}
          />
        </div>
      </div>
      <div className='flex h-8 flex-row items-center  justify-between'>
        <label className='w-24'>Fill</label>
        <div className='w-[calc(100%-96px)]'>
          <NumberInput
            type='precent'
            value={styles.Fill?.value as number}
            onChange={(value) =>
              handleValueChange('polygon-fill-opacity', value)
            }
          />
        </div>
      </div>
      <div className='flex h-8 flex-row items-center  justify-between'>
        <label className='w-24'>Stroke</label>
        <div className='w-[calc(100%-96px)]'>
          <NumberInput
            type='precent'
            value={styles.Stroke?.value as number}
            onChange={(value) =>
              handleValueChange('polygon-stroke-opacity', value)
            }
          />
        </div>
      </div>
      <div className='flex h-8 flex-row items-center justify-between'>
        <label className='w-24'>Width</label>
        <div className='w-[calc(100%-96px)]'>
          <NumberInput
            type='number'
            max={10}
            step={0.1}
            value={styles.Width?.value as number}
            onChange={(value) =>
              handleValueChange('polygon-stroke-width', value)
            }
          />
        </div>
      </div>
      <div className='flex h-8 flex-row items-center justify-between'>
        <label className='w-24'>Style</label>
        <div className='w-[calc(100%-96px)]'>
          <StrokeStyleInput
            value={styles.Style?.value as string}
            onChange={(value) =>
              handleValueChange('polygon-stroke-style', value)
            }
          />
        </div>
      </div>
    </div>
  )
}

function StyleOperate() {
  const { selectedFeatures, updateSelectedFeature } = useFeatures()

  const styleGroup = useMemo(() => {
    console.log(
      5555555,
      selectedFeatures,
      generateStyleSetting(selectedFeatures)
    )

    return generateStyleSetting(selectedFeatures)
  }, [selectedFeatures])

  const handleKeyValueChange = useCallback(
    (
      type: 'Point' | 'LineString' | 'Polygon',
      key: string,
      value: StyleValue
    ) => {
      // const properties: Record<string, any> = {}
      // // if (type === 'Point') {
      // styleProperties[key] = value
      // // }
      const newFeatures = selectedFeatures.map((feature) => {
        const oldProperties = feature.properties
        // switch (feature.geometry.type) {
        //   case 'Point':
        //   case 'MultiPoint':
        return {
          ...feature,
          properties: { ...oldProperties, [key]: value }
        }
        // default:
        //   break
        // }
      })
      console.log(44444, newFeatures)

      updateSelectedFeature(newFeatures)
    },
    [selectedFeatures, updateSelectedFeature]
  )

  return (
    <div className='flex h-full flex-col border-b px-3 text-sm'>
      {styleGroup.Point.has && (
        <div>
          <div>Point</div>
          <PointStyle
            styles={styleGroup.Point.style}
            onKeyValueChange={(key, value) => {
              // console.log(333333, key, value)
              handleKeyValueChange('Point', key, value)
            }}
          />
        </div>
      )}
      {styleGroup.LineString.has && (
        <div>
          <div>LineString</div>
          <LineStringStyle
            styles={styleGroup.LineString.style}
            onKeyValueChange={(key, value) => {
              // console.log(333333, key, value)
              handleKeyValueChange('LineString', key, value)
            }}
          />
        </div>
      )}
      {styleGroup.Polygon.has && (
        <div>
          <div>Polygon</div>
          <PolygonStyle
            styles={styleGroup.Polygon.style}
            onKeyValueChange={(key, value) => {
              // console.log(333333, key, value)
              handleKeyValueChange('Polygon', key, value)
            }}
          />
        </div>
      )}
    </div>
  )
}

export default StyleOperate
