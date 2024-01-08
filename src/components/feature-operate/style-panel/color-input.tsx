import { useState } from 'react'
import { HexAlphaColorPicker } from 'react-colorful'
import { useDebounce } from 'react-use'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { DEFAULT_COLOR } from '@/lib/style'

interface ColorInputProps {
  value: string | undefined
  onChange: (value: string) => void
}

function ColorInput({ value = DEFAULT_COLOR, onChange }: ColorInputProps) {
  const [color, setColor] = useState(value)
  useDebounce(() => onChange(color), 200, [color])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className='flex h-8 w-[240px] items-center gap-2 border border-border px-2 text-xs'>
          <div
            className='h-3 w-3 rounded-full'
            style={{ backgroundColor: value }}
          ></div>
          <span>{value.toUpperCase()}</span>
        </div>
      </PopoverTrigger>
      <PopoverContent className='w-60'>
        <HexAlphaColorPicker color={color} onChange={setColor} />
        <Input
          className='mt-4 h-8'
          value={color.toUpperCase()}
          onChange={(e) => {
            setColor(e.target.value)
          }}
        />
      </PopoverContent>
    </Popover>
  )
}

export default ColorInput
