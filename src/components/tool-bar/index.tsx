import DrawMenu from './draw-menu'
import SpatialMenu from './spatial-menu'

function ToolBar() {
  return (
    <div className='flex h-10 flex-row gap-2'>
      <DrawMenu />
      <SpatialMenu />
    </div>
  )
}

export default ToolBar
