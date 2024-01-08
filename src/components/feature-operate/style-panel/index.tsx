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
  PointStyleId,
  StyleGroup
} from '@/lib/style'
import { useCallback, useEffect, useMemo, useState } from 'react'
import ColorInput from './color-input'
import StrokeStyleInput from './stroke-style-input'
import NumberInput from './number-input'
import { ScrollArea } from '@/components/ui/scroll-area'

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
            value={styles.color as string}
            onChange={(value) => handleValueChange('point-color', value)}
          />
        </div>
      </div>
      {/* <div className='flex h-8 flex-row items-center justify-between'>
        <label className='w-24'>Symbol</label>
        <div className='w-[calc(100%-96px)]'>
          <StrokeStyleInput
            value={styles.Style?.value as string}
            onChange={(value) => handleValueChange('point-symbol', value)}
          />
        </div>
      </div> */}
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
            value={styles.color as string}
            onChange={(value) => handleValueChange('linestring-color', value)}
          />
        </div>
      </div>
      <div className='flex h-8 flex-row items-center  justify-between'>
        <label className='w-24'>Stroke</label>
        <div className='w-[calc(100%-96px)]'>
          <NumberInput
            type='precent'
            value={styles.stroke as number}
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
            value={styles.width as number}
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
            value={styles.style as string}
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
        <label className='w-24 text-muted-foreground'>Color</label>
        <div className='w-[calc(100%-96px)]'>
          <ColorInput
            value={styles.color as string}
            onChange={(value) => handleValueChange('polygon-color', value)}
          />
        </div>
      </div>
      <div className='flex h-8 flex-row items-center  justify-between'>
        <label className='w-24 text-muted-foreground'>Fill</label>
        <div className='w-[calc(100%-96px)]'>
          <NumberInput
            type='precent'
            value={styles.fill as number}
            onChange={(value) =>
              handleValueChange('polygon-fill-opacity', value)
            }
          />
        </div>
      </div>
      <div className='flex h-8 flex-row items-center  justify-between'>
        <label className='w-24 text-muted-foreground'>Stroke</label>
        <div className='w-[calc(100%-96px)]'>
          <NumberInput
            type='precent'
            value={styles.stroke as number}
            onChange={(value) =>
              handleValueChange('polygon-stroke-opacity', value)
            }
          />
        </div>
      </div>
      <div className='flex h-8 flex-row items-center justify-between'>
        <label className='w-24 text-muted-foreground'>Width</label>
        <div className='w-[calc(100%-96px)]'>
          <NumberInput
            type='number'
            max={10}
            step={0.1}
            value={styles.width as number}
            onChange={(value) => {
              handleValueChange('polygon-stroke-width', value)
            }}
          />
        </div>
      </div>
      <div className='flex h-8 flex-row items-center justify-between'>
        <label className='w-24 text-muted-foreground'>Style</label>
        <div className='w-[calc(100%-96px)]'>
          <StrokeStyleInput
            value={styles.style as string}
            onChange={(value) =>
              handleValueChange('polygon-stroke-style', value)
            }
          />
        </div>
      </div>
    </div>
  )
}

function StylePanel() {
  const { selectedFeatures, updateSelectedFeature } = useFeatures()
  const [styleGroup, setStyleGroup] = useState<StyleGroup | undefined>()

  useEffect(() => {
    setStyleGroup(generateStyleSetting(selectedFeatures))
  }, [selectedFeatures])

  const handleKeyValueChange = (
    type: 'Point' | 'LineString' | 'Polygon',
    key: string,
    value: StyleValue
  ) => {
    const newFeatures = selectedFeatures.map((feature) => {
      const oldProperties = feature.properties

      return {
        ...feature,
        properties: { ...oldProperties, [key]: value }
      }
    })
    updateSelectedFeature(newFeatures)
  }

  return (
    <ScrollArea
      type='scroll'
      className='flex h-full flex-col border-b px-3 pb-4 text-sm'
    >
      {styleGroup && styleGroup.point.has && (
        <div>
          <span className='inline-block h-8 font-bold leading-8 text-accent-foreground'>
            Point
          </span>
          <PointStyle
            styles={styleGroup.point}
            onKeyValueChange={(key, value) => {
              // console.log(333333, key, value)
              handleKeyValueChange('Point', key, value)
            }}
          />
        </div>
      )}
      {styleGroup && styleGroup.line.has && (
        <div>
          <span className='inline-block h-8 font-bold leading-8 text-accent-foreground'>
            Line
          </span>
          <LineStringStyle
            styles={styleGroup.line}
            onKeyValueChange={(key, value) => {
              // console.log(333333, key, value)
              handleKeyValueChange('LineString', key, value)
            }}
          />
        </div>
      )}
      {styleGroup && styleGroup.polygon.has && (
        <div>
          <span className='inline-block h-8 font-bold leading-8 text-accent-foreground'>
            Polygon
          </span>
          <PolygonStyle
            styles={styleGroup.polygon}
            onKeyValueChange={(key, value) => {
              // console.log(333333, key, value)
              handleKeyValueChange('Polygon', key, value)
            }}
          />
        </div>
      )}
    </ScrollArea>
  )
}

export default StylePanel
