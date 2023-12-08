import mapboxgl from 'mapbox-gl'
import { MutableRefObject, createContext } from 'react'

interface Props {
  mapRef: MutableRefObject<mapboxgl.Map | null>
}

export const MapContext = createContext({} as Props)
