import { Input } from '@/components/ui/input'
import RowMenu from './row-menu'
import { forwardRef, useImperativeHandle, useRef, useState } from 'react'

interface ValueInputProps {
  value?: string
  mixed?: boolean
  menuShow: boolean
  onEdit?: (value: string) => void
  onUpdate?: () => void
  onDelete?: () => void
}

const ValueInput = forwardRef(
  (
    { value, menuShow, mixed, onEdit, onUpdate, onDelete }: ValueInputProps,
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [isInput, setIsInput] = useState(false)

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
          placeholder={mixed ? 'Mixed' : 'Value'}
          className='h-6 border-none px-3 py-[1px] text-xs leading-6 text-secondary-foreground placeholder:text-xs'
          value={value}
          onChange={(e) => {
            // handleEdit(property.id, 'value', e.target.value)
            onEdit?.(e.target.value)
          }}
          onInput={() => {
            setIsInput(true)
          }}
          onBlur={() => {
            if (isInput) {
              onUpdate?.()
              setIsInput(false)
            }
          }}
        />
        {menuShow && (
          <div className='absolute right-4 top-1'>
            <RowMenu
              className='invisible group-hover:visible'
              onDelete={() => onDelete?.()}
            />
          </div>
        )}
      </>
    )
  }
)

ValueInput.displayName = 'ValueInput'
export default ValueInput
