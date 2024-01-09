import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { STROKE_STYLES, STROKE_STYLE_LABELS } from '@/lib/style'
import { isEqual } from 'lodash-es'
import { useEffect, useState } from 'react'

interface StrokeStyleInputProps {
  value: Array<number>
  onChange: (value: Array<number>) => void
}

function StrokeStyleInput({ value, onChange }: StrokeStyleInputProps) {
  const [innerValue, setInnerValue] = useState<string | undefined>()

  useEffect(() => {
    const label = STROKE_STYLES.find((s) => isEqual(s.value, value))?.label
    setInnerValue(label || 'Solid')
  }, [value])

  const handleChange = (v: string) => {
    const value = STROKE_STYLES.find((s) => s.label === v)?.value
    if (value) {
      onChange(value)
    }
  }

  return (
    <Select value={innerValue} onValueChange={handleChange}>
      <SelectTrigger className='h-8 w-[240px] text-xs'>
        <SelectValue placeholder='stroke style' />
      </SelectTrigger>
      <SelectContent>
        {STROKE_STYLE_LABELS.map((style) => (
          <SelectItem className='text-xs' value={style} key={style}>
            {style}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default StrokeStyleInput
