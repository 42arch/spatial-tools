import { BackgroundLayer } from '@/types'
import mapboxgl from 'mapbox-gl'
import env from './env'

export function getMapboxLayerURL(layer: BackgroundLayer) {
  return (
    layer.url.replace('mapbox://styles/', 'https://api.mapbox.com/styles/v1/') +
    `?optimize=true&access_token=${layer.token || env.NEXT_PUBLIC_MAPBOX_TOKEN}`
  )
}

export function getEmptyStyle() {
  const style: mapboxgl.Style = {
    version: 8,
    name: 'XYZ Layer',
    sprite: 'mapbox://styles/mapbox/empty-v9',
    glyphs: 'mapbox://fonts/mapbox/{fontstack}/{range}.pbf',
    sources: {},
    layers: []
  }
  return style
}

export function addXYZLayer(style: mapboxgl.Style, layer: BackgroundLayer) {
  style.sources[layer.name] = {
    type: 'raster',
    tiles: [layer.url],
    scheme: 'xyz',
    tileSize: 256
  }
  const newLayer = {
    id: layer.name,
    type: 'raster',
    source: layer.name,
    paint: {
      'raster-opacity': layer.opacity || 1
    },
    layout: {
      visibility: layer.hidden ? 'none' : 'visible'
    },
    minzoom: 0,
    maxzoom: 22
  } as mapboxgl.AnyLayer
  style.layers.push(newLayer)
  return style
}

export async function addMapboxLayer(
  _base: mapboxgl.Style,
  layer: BackgroundLayer
) {
  const nextToken = layer.token as string
  mapboxgl.accessToken = nextToken

  const url = getMapboxLayerURL(layer)

  const style: mapboxgl.Style = await fetch(url)
    .then((res) => {
      if (!res?.ok) {
        throw new Error('Could not fetch layer')
      }
      return res.json()
    })
    .catch(() => {
      return getEmptyStyle()
    })

  return style
}

// Inspiration from placemaker
export async function loadAndComposeStyle(layers: Array<BackgroundLayer>) {
  let style = getEmptyStyle()
  const allLayers = [...layers].reverse()

  for (const layer of allLayers) {
    switch (layer.type) {
      case 'mapbox':
        style = await addMapboxLayer(style, layer)
        break
      case 'xyz':
        style = addXYZLayer(style, layer)
        break
    }
  }

  return style
}
