import { Feature, Geometry, GeoJsonProperties, Point } from 'geojson'

export type DrawMode =
  | 'simple_select'
  | 'draw_line_string'
  | 'draw_polygon'
  | 'draw_point'

export type GeometryType =
  | 'Point'
  | 'LineString'
  | 'Polygon'
  | 'MultiPoint'
  | 'MultiLineString'
  | 'MultiPolygon'

export type AppGeometryType = 'point' | 'line' | 'polygon'

export type FeatureType = Feature<Geometry, GeoJsonProperties>

export type FeatureGroupMap = Record<string, FeatureGroup>

export type FeatureNodeMap = Record<string, FeatureNode>

export type FeatureGroup = {
  id: string
  label: string
  selected?: boolean
  visible?: boolean
  data: FeatureNodeMap
}
export interface FeatureNode {
  id: string
  groupId: string
  visible?: boolean
  selected?: boolean
  data: FeatureType
  // data: FeatureType
}

export type AcceptedFileType = 'application/json' | '.geojson'
