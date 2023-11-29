import { Feature, Geometry, GeoJsonProperties } from 'geojson'

export type DrawMode =
  | 'simple_select'
  | 'draw_line_string'
  | 'draw_polygon'
  | 'draw_point'

export type FeatureType = Feature<Geometry, GeoJsonProperties>

export interface FeatureNode extends FeatureType {
  isFolder?: boolean
  visible?: boolean
  selected?: boolean
  children?: FeatureNode[]
}
