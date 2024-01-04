'use client'

import { useFeatures } from '@/hooks/use-features'
import {
  LineStringStyleId,
  PolygonStyleId,
  StyleGroup,
  StyleObject,
  StyleValue,
  generateStyleGroupList,
  getStylePropertyKey
} from '@/lib/style'
import { useEffect, useMemo, useState } from 'react'
import ColorInput from './color-input'
import StrokeStyleInput from './stroke-style-input'
import NumberInput from './number-input'
import { getFeatureTypes } from '@/lib/feature'

interface GeometryStyleProps {
  data: StyleGroup
  onKeyValueChange: (key: string, value: StyleValue) => void
}

function PointStyle({ data }: GeometryStyleProps) {
  return (
    <div className='flex flex-col'>
      <div className='flex flex-row'>
        <label>Color</label>
        <div>{data.style.Color?.value}</div>
      </div>
      <div className='flex flex-row'>
        <label>Icon</label>
        <div>{data.style.Symbol?.value}</div>
      </div>
    </div>
  )
}

function LineStringStyle({ data, onKeyValueChange }: GeometryStyleProps) {
  const handleValueChange = (id: LineStringStyleId, value: StyleValue) => {
    const key = getStylePropertyKey(id)
    onKeyValueChange(key, value)
  }

  return (
    <div className='flex w-full flex-col gap-1 py-2'>
      <div className='flex h-8 flex-row items-center justify-between'>
        <label className='w-24'>Color</label>
        <div className='w-[calc(100%-96px)]'>
          <ColorInput
            value={data.style.Color?.value as string}
            onChange={(value) => handleValueChange('linestring-color', value)}
          />
        </div>
      </div>
      <div className='flex h-8 flex-row items-center  justify-between'>
        <label className='w-24'>Stroke</label>
        <div className='w-[calc(100%-96px)]'>
          <NumberInput
            type='precent'
            value={data.style.Stroke?.value as number}
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
            value={data.style.Width?.value as number}
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
            value={data.style.Style?.value as string}
            onChange={(value) =>
              handleValueChange('linestring-stroke-style', value)
            }
          />
        </div>
      </div>
    </div>
  )
}

function PolygonStyle({ data, onKeyValueChange }: GeometryStyleProps) {
  const handleValueChange = (id: PolygonStyleId, value: StyleValue) => {
    const key = getStylePropertyKey(id)
    onKeyValueChange(key, value)
  }

  return (
    <div className='flex w-full flex-col gap-1 py-2'>
      <div className='flex h-8 flex-row items-center justify-between'>
        <label className='w-24'>Color</label>
        <div className='w-[calc(100%-96px)]'>
          <ColorInput
            value={data.style.Color?.value as string}
            onChange={(value) => handleValueChange('polygon-color', value)}
          />
        </div>
      </div>
      <div className='flex h-8 flex-row items-center  justify-between'>
        <label className='w-24'>Fill</label>
        <div className='w-[calc(100%-96px)]'>
          <NumberInput
            type='precent'
            value={data.style.Fill?.value as number}
            onChange={(value) =>
              handleValueChange('polygon-stroke-opacity', value)
            }
          />
        </div>
      </div>
      <div className='flex h-8 flex-row items-center  justify-between'>
        <label className='w-24'>Stroke</label>
        <div className='w-[calc(100%-96px)]'>
          <NumberInput
            type='precent'
            value={data.style.Stroke?.value as number}
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
            value={data.style.Width?.value as number}
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
            value={data.style.Style?.value as string}
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
  const { selectedFeatures, selectedFeatureTypes, updateSelectedFeature } =
    useFeatures()

  const styleGroupList = useMemo(() => {
    return generateStyleGroupList(selectedFeatures)
  }, [selectedFeatures])

  return (
    <div className='flex h-full flex-col border-b px-3 text-sm'>
      {styleGroupList.map((styleGroup) => (
        <div key={styleGroup.type}>
          <div>{styleGroup.type}</div>
          <LineStringStyle data={styleGroup} onKeyValueChange={() => {}} />
        </div>
      ))}
    </div>
  )
}

export default StyleOperate
