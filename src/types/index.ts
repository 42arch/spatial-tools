import { Feature, Geometry, GeoJsonProperties } from 'geojson'

export type DrawMode =
  | 'simple_select'
  | 'draw_line_string'
  | 'draw_polygon'
  | 'draw_point'

export type FeatureType = Feature<Geometry, GeoJsonProperties>

export interface FeatureNode {
  id: string
  isGroup?: boolean
  visible?: boolean
  selected?: boolean
  data: FeatureType
  children?: FeatureNode[]
}
