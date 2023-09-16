import mapboxgl from 'mapbox-gl'
import MapboxDraw from '@mapbox/mapbox-gl-draw'
import { ReactNode, useEffect, useRef, useState } from 'react'

mapboxgl.accessToken =
  'pk.eyJ1IjoiaW5nZW40MiIsImEiOiJjazlsMnliMXoyMWoxM2tudm1hajRmaHZ6In0.rWx_wAz2cAeMIzxQQfPDPA'

const TestMap = () => {
  const mapContainerRef = useRef<any>(null)
  const [map, setMap] = useState<any>(null)
  const [draw, setDraw] = useState<any>(null)
  const [currentMode, setCurrentMode] = useState<any>('simple_select')

  // 初始化地图
  useEffect(() => {
    const initializeMap = () => {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-74.5, 40],
        zoom: 9
      })

      const draw = new MapboxDraw({
        displayControlsDefault: false,
        controls: {
          point: false,
          line_string: false,
          polygon: false
        }
      })

      map.addControl(draw)

      map.on('draw.modechange', (e) => {
        console.log('mode change', e)
      })

      setMap(map)
      setDraw(draw)

      map.on('load', () => {
        // 初始设置绘图模式
        draw.changeMode('simple_select')
        setCurrentMode('simple_select')
      })
    }

    if (!map) {
      initializeMap()
    }

    return () => {
      if (map) {
        map.remove()
      }
    }
  }, [map])

  const handleModeChange = (mode: any) => {
    // 如果有先前的模式，保存已绘制的图形
    if (currentMode) {
      const fs = draw.getAll()
      console.log(33333, currentMode, fs)
    }

    // 切换模式并加载上一个模式的图形
    draw.changeMode(mode)
    setCurrentMode(mode)
  }

  return (
    <div className='w-full h-full relative'>
      <div ref={mapContainerRef} className='w-full h-full' />

      <div className='absolute top-0 bg-black flex flex-row gap-4'>
        <button onClick={() => handleModeChange('draw_polygon')}>
          Polygon
        </button>
        <button onClick={() => handleModeChange('draw_line_string')}>
          Line
        </button>
        <button onClick={() => handleModeChange('draw_point')}>Point</button>
        <button onClick={() => handleModeChange('simple_select')}>
          simple
        </button>
      </div>
    </div>
  )
}

export default TestMap
