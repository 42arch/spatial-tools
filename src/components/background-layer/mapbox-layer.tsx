import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { zodResolver } from '@hookform/resolvers/zod'
import { BackgroundLayer } from '@/types'
import useMap from '@/hooks/use-map'
import * as z from 'zod'
import { nanoid } from 'nanoid'
import mapboxgl from 'mapbox-gl'
import { useContext } from 'react'
import { LayerSelectContext } from './layer-select'

const formSchema = z.object({
  name: z.string().refine((data) => data.trim() !== '', {
    message: 'Name cannot be empty'
  }),
  token: z.string().refine((data) => data.trim() !== '', {
    message: 'Token cannot be empty'
  }),
  url: z.string().refine((data) => data.trim() !== '', {
    message: 'Url cannot be empty'
  })
})

interface MapboxLayerProps {
  onClose: () => void
}

function MapboxLayer({ onClose }: MapboxLayerProps) {
  const { toggleOpen } = useContext(LayerSelectContext)
  const { addBgLayer } = useMap()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      token: undefined,
      name: '',
      url: ''
    }
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const mapboxLayer: BackgroundLayer = {
      id: nanoid(),
      name: values.name,
      type: 'mapbox',
      url: values.url
    }
    mapboxgl.accessToken = values.token
    addBgLayer(mapboxLayer)
    toggleOpen()
  }

  return (
    <div className='flex flex-col'>
      <div className='flex flex-row items-center justify-between px-2 text-base'>
        <span>Mapbox Styles</span>
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
            name='token'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder='Access Token'
                    {...field}
                    className='h-8'
                  />
                </FormControl>
                <FormMessage className='text-xs' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='url'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder='Url' {...field} className='h-8' />
                </FormControl>
                {/* <FormDescription className='text-xs'>
                  {`For example: https://a.tile.openstreetmap.org/{z}/{x}/{y}.png`}
                </FormDescription> */}
                <FormMessage className='text-xs' />
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

export default MapboxLayer
