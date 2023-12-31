import { Slider } from '@/components/ui/slider'
import { memo, useState } from 'react'
import { useDebounce } from 'react-use'

interface NumberInputProps {
  type: 'number' | 'precent'
  max?: number
  step?: number
  value: number
  onChange: (value: number) => void
}

function NumberInput({
  type,
  value,
  max = 100,
  step = 1,
  onChange
}: NumberInputProps) {
  const [numberValue, setNumberValue] = useState<number>(value)
  useDebounce(() => onChange(numberValue), 200, [numberValue])

  return (
    <div className='flex h-8 w-[240px] flex-row items-center justify-between gap-2 border border-border px-2 text-xs'>
      <Slider
        className='h-3 w-[170px]'
        defaultValue={[numberValue]}
        max={type === 'precent' ? 1 : max}
        step={type === 'precent' ? 0.01 : step}
        onValueChange={(e) => {
          setNumberValue(e[0])
        }}
      />
      <span className='inline-block w-[34px] text-left'>
        {type === 'precent' ? `${Math.floor(numberValue * 100)}%` : numberValue}
      </span>
    </div>
  )
}

export default memo(NumberInput)
