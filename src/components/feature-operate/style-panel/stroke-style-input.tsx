import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { STROKE_STYLES } from '@/lib/style'

interface StrokeStyleInputProps {
  value: string
  onChange: (value: string) => void
}

function StrokeStyleInput({ value, onChange }: StrokeStyleInputProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className='h-8 w-[220px]'>
        <SelectValue className='' placeholder='stroke style' />
      </SelectTrigger>
      <SelectContent>
        {STROKE_STYLES.map((style) => (
          <SelectItem value={style} key={style}>
            {style}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default StrokeStyleInput
