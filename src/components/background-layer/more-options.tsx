import { useToggle } from 'react-use'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import XYZLayer from './xyz-layer'

interface MoreOptionsProps {
  onClose: () => void
  onSelectClose: () => void
}

function MoreOptions({ onClose, onSelectClose }: MoreOptionsProps) {
  const [xyzOpen, toggleXyz] = useToggle(false)
  const [mapboxOpen, toggleMapbox] = useToggle(false)

  return (
    <>
      {!xyzOpen && !mapboxOpen && (
        <div className='flex flex-col'>
          <div className='flex flex-row items-center justify-between px-2 text-base'>
            <span>More Types</span>
            <Button variant='outline' className='h-6' onClick={onClose}>
              back
            </Button>
          </div>
          <Separator className='my-2' />
          <div className='flex flex-col'>
            <div className='cursor-pointer px-2 py-1.5 text-sm hover:bg-accent'>
              Mapbox Styles
            </div>
            <div
              className='cursor-pointer px-2 py-1.5 text-sm hover:bg-accent'
              onClick={() => toggleXyz(true)}
            >
              XYZ
            </div>
          </div>
        </div>
      )}
      {xyzOpen && (
        <XYZLayer
          onClose={() => toggleXyz(false)}
          onSelectClose={onSelectClose}
        />
      )}
    </>
  )
}

export default MoreOptions
