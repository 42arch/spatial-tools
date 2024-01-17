import {
  Feature,
  Geometry,
  GeoJsonProperties,
  FeatureCollection
} from 'geojson'
import { AnyLayout, AnyPaint } from 'mapbox-gl'

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

export type FeatureId = string | number | undefined

export type FeatureType = Feature<Geometry, GeoJsonProperties>

export type FeatureGroup = {
  id: string
  name: string
  selected: boolean
  hidden: boolean
  data: Record<string, FeatureType>
}

export type FeatureGroups = Record<string, FeatureGroup>

export type LayerType = {
  id: string
  name: string
  data: FeatureCollection
  paint?: AnyPaint
  layout?: AnyLayout
  // paint: AnyPaint
  // layer: AnyLayer
  // layout: AnyLayout
}

export type Layers = Record<string, LayerType>
