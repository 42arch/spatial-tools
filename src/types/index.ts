import { Feature, Geometry, GeoJsonProperties } from 'geojson'

export type DrawMode =
  | 'draw_line_string'
  | 'draw_polygon'
  | 'draw_point'
  | 'draw_rectangle'
  | 'drag_circle'

export type GeometryType =
  | 'Point'
  | 'LineString'
  | 'Polygon'
  | 'MultiPoint'
  | 'MultiLineString'
  | 'MultiPolygon'

export type AppShapeType = 'point' | 'line' | 'polygon'

// export type FeatureType = Omit<Feature<Geometry, GeoJsonProperties>, 'id'> & {
//   id: string
// }

export type FeatureType = Feature<Geometry, GeoJsonProperties>

export type FeatureGroup = {
  id: string
  name: string
  selected: boolean
  hidden: boolean
  data: Record<string, FeatureType>
}

export type FeatureGroups = Record<string, FeatureGroup>

// export interface FeatureNode {
//   id: string
//   groupId: string
//   hidden?: boolean
//   selected?: boolean
//   data: FeatureType
// }
