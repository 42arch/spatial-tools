import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { CombinedProperty } from './utils'
import { cn } from '@/lib/utils'

interface KeyInputProps {
  data: CombinedProperty
  onEdit: (value: string) => void
  onUpdate: () => void
}

function KeyInput({ data, onEdit, onUpdate }: KeyInputProps) {
  const [isInput, setIsInput] = useState(false)
  const [isFocus, setIsFocus] = useState(false)

  return (
    <>
      <Input
        type='text'
        placeholder='key'
        className='group h-6 border-none px-3 py-[1px] text-xs leading-6 text-accent-foreground placeholder:text-xs'
        value={data.key}
        onChange={(e) => {
          onEdit(e.target.value)
        }}
        onInput={() => {
          setIsInput(true)
        }}
        onFocus={() => {
          setIsFocus(true)
        }}
        onBlur={() => {
          if (isInput) {
            onUpdate()
            setIsInput(false)
          }
          setIsFocus(false)
        }}
      />
      <p
        className={cn(
          'pointer-events-none absolute top-0 cursor-text px-3 py-[1px] text-xs leading-6 text-accent-foreground',
          isFocus ? 'invisible' : ''
        )}
      >
        <span className='invisible'>{data.key + ' '}</span>
        <span className='inline-block h-6 text-muted-foreground'>
          ({data.count})
        </span>
      </p>
    </>
  )
}

export default KeyInput
