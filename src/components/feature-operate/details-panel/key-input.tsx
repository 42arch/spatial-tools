import { Input } from '@/components/ui/input'
import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface KeyInputProps {
  value?: string
  countShow: boolean
  count: number
  onEdit?: (value: string) => void
  onUpdate?: () => void
}

const KeyInput = forwardRef(
  ({ value, countShow, count, onEdit, onUpdate }: KeyInputProps, ref) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [isInput, setIsInput] = useState(false)
    const [isFocus, setIsFocus] = useState(false)

    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current?.focus()
      },
      value: inputRef.current?.value
    }))

    return (
      <>
        <Input
          ref={inputRef}
          type='text'
          placeholder='key'
          className='group h-6 border-none px-3 py-[1px] text-xs leading-6 text-accent-foreground placeholder:text-xs'
          value={value}
          onChange={(e) => {
            onEdit?.(e.target.value)
          }}
          onInput={() => {
            setIsInput(true)
          }}
          onFocus={() => {
            setIsFocus(true)
          }}
          onBlur={() => {
            if (isInput) {
              onUpdate?.()
              setIsInput(false)
            }
            setIsFocus(false)
          }}
        />
        <p
          className={cn(
            'pointer-events-none absolute top-0 cursor-text px-3 py-[1px] text-xs leading-6 text-accent-foreground',
            !countShow ? 'invisible' : '',
            !value ? 'invisible' : '',
            isFocus ? 'invisible' : ''
          )}
        >
          <span className='invisible'>{value + ' '}</span>
          <span className='inline-block h-6 text-muted-foreground'>
            ({count})
          </span>
        </p>
      </>
    )
  }
)

KeyInput.displayName = 'KeyInput'
export default KeyInput
