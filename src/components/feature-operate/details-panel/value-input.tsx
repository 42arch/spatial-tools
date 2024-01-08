import { Input } from '@/components/ui/input'
import RowMenu from './row-menu'
import { CombinedProperty } from './utils'
import { useState } from 'react'

interface ValueInputProps {
  data: CombinedProperty
  onEdit: (value: string) => void
  onUpdate: () => void
  onDelete: () => void
}

function ValueInput({ data, onEdit, onUpdate, onDelete }: ValueInputProps) {
  const [isInput, setIsInput] = useState(false)

  return (
    <>
      <Input
        type='text'
        placeholder={data.mixed ? 'Mixed' : 'Value'}
        className='h-6 border-none px-3 py-[1px] text-xs leading-6 text-secondary-foreground placeholder:text-xs'
        value={data.value}
        onChange={(e) => {
          // handleEdit(property.id, 'value', e.target.value)
          onEdit(e.target.value)
        }}
        onInput={() => {
          setIsInput(true)
        }}
        onBlur={() => {
          if (isInput) {
            onUpdate()
            setIsInput(false)
          }
        }}
      />
      <div className='absolute right-4 top-1'>
        <RowMenu
          className='invisible group-hover:visible'
          onDelete={onDelete}
        />
      </div>
    </>
  )
}

export default ValueInput
