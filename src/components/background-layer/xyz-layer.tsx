import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form'
import { Input } from '../ui/input'
import { Separator } from '../ui/separator'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { BackgroundLayer } from '@/types'
import useMap from '@/hooks/use-map'
import { nanoid } from 'nanoid'

const formSchema = z.object({
  name: z.string().refine((data) => data.trim() !== '', {
    message: 'Name cannot be empty'
  }),
  url: z.string().refine((data) => data.trim() !== '', {
    message: 'Url cannot be empty'
  })
})

interface XYZLayerProps {
  onClose: () => void
  onSelectClose: () => void
}

function XYZLayer({ onClose, onSelectClose }: XYZLayerProps) {
  const { addCustomBgLayer } = useMap()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      url: ''
    }
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const xyzLayer: BackgroundLayer = {
      id: nanoid(),
      name: values.name,
      type: 'xyz',
      url: values.url
    }
    addCustomBgLayer(xyzLayer)
    onSelectClose()
  }

  return (
    <div className='flex flex-col'>
      <div className='flex flex-row items-center justify-between px-2 text-base'>
        <span>XYZ Tiles</span>
        <Button variant='outline' className='h-6' onClick={onClose}>
          back
        </Button>
      </div>
      <Separator className='my-2' />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Username</FormLabel> */}
                <FormControl>
                  <Input placeholder='Name' {...field} className='h-8' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='url'
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Username</FormLabel> */}
                <FormControl>
                  <Input placeholder='Tile Url' {...field} className='h-8' />
                </FormControl>
                <FormDescription className='text-xs'>
                  {`For example: https://a.tile.openstreetmap.org/{z}/{x}/{y}.png`}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' className='h-8 w-full'>
            Add Layer
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default XYZLayer
