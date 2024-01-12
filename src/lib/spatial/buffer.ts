import { buffer } from '@turf/turf'
import { Feature, GeoJsonProperties, Geometry } from 'geojson'

export default function Buffer(
  geojson: Feature<Geometry, GeoJsonProperties>,
  radius: number,
  options: {
    units: 'kilometers'
    steps: number
  }
) {
  const buffered = buffer(geojson, radius, options)
  return buffered
}
