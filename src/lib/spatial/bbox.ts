import { AllGeoJSON, bbox } from '@turf/turf'
import { LngLatBoundsLike } from 'mapbox-gl'

export default function Bbox(geojson: AllGeoJSON) {
  const [minX, minY, maxX, maxY] = bbox(geojson)
  return [
    [minX, minY],
    [maxX, maxY]
  ] as LngLatBoundsLike
}
