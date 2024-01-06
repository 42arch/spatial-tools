'use client'

import mapboxgl from 'mapbox-gl'
import { ReactNode, useEffect, useRef, useState } from 'react'
import { MapContext } from './context'

mapboxgl.accessToken =
  'pk.eyJ1IjoiaW5nZW40MiIsImEiOiJjazlsMnliMXoyMWoxM2tudm1hajRmaHZ6In0.rWx_wAz2cAeMIzxQQfPDPA'

interface Props {
  children: ReactNode
}

export default function BaseMap({ children }: Props) {
  const mapContainerRef = useRef<any>()
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const [loaded, setLoaded] = useState(false)

  const onMapLoaded = () => {
    setLoaded(true)
    const img = new Image()
    img.onload = () => {
      mapRef.current?.addImage('trash', img)
    }
    img.src =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAFFmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDIgNzkuMTY0NDg4LCAyMDIwLzA3LzEwLTIyOjA2OjUzICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjIuMCAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIwLTA3LTEwVDEyOjA3OjQ3LTA3OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMS0wMS0yMVQxMToxOToyNC0wODowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMS0wMS0yMVQxMToxOToyNC0wODowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyNzM1ZTEzYi0zMjk5LTYyNDAtYjBmOS0zY2Y5NDdhNzVhY2QiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MjczNWUxM2ItMzI5OS02MjQwLWIwZjktM2NmOTQ3YTc1YWNkIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6MjczNWUxM2ItMzI5OS02MjQwLWIwZjktM2NmOTQ3YTc1YWNkIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDoyNzM1ZTEzYi0zMjk5LTYyNDAtYjBmOS0zY2Y5NDdhNzVhY2QiIHN0RXZ0OndoZW49IjIwMjAtMDctMTBUMTI6MDc6NDctMDc6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMi4wIChXaW5kb3dzKSIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6Wl0liAAADm0lEQVRYw82ZPUszQRDHN2tELCRoZxcNGkGsDFGxsdDCQBot/AzBwhcQa1GQkK8Q0EYEC0V8RRFLiWIhKCZoBIsgoiLBStTMc/8LuWcvd7m75EzOgZHb3bnZX27fZlYXsyGpVIrOz8/Z7e0tu76+ZpeXl3J9b28v6+npYV1dXSwYDDK/3+9itZLDw0MaHx8nznlZOjExQUdHR1RVsJaWlrLBihU+4OvXwC4uLqitrU3TUWNjI42NjVE8HqfT01NKJpOUzWZlxTPq0AYb2Ba/D5/wbQtuZ2dH47ivr482Nzfp6+uLrAps8Q7eLfa3t7dXGeTCwoLKkTThaWVlhewKfMCX6Bt92YLDMH18fNBvCXzBp9jH4uIiVTSsc3NzVC2Bb7Ev9G0KWBbc6yvR5CRRfT1JntWKOrTBpgxIQziv16saVkPJ5YiWlrRgxQob2BqIONxY3aZDi0lsOucyGaJAgKizk+j+XtuOOrTBBrYmc1JcOAcHB1rIpqYmxcDSal1fz3+h2VnsI3p7S74NNrC1sLrFzVwFt7GxodrnVPL2RjQ4aD6U5Sp8wrcg4j65tbUlQ3L8WVtbU2Dn5+eZUyL2vbq6ql25OJJKnhAvL/iJ9r8cfMBXiRNHPBZltkQioYz36Ogoc7vdjn1B9A2GgoCNn52dKRWhUMi6t0CAsefnvOLZrGxRRAawuR8eHpQKn89nHbCuDnPj/3N+rhiXLYjIkE6nGb+6ulIqWltbmdMiMkgRO+M3Nzd/FhBsvKGhgf1l4d3d3Urh6enJcSCRAWxcyrj+LCCyQl68apwWkaG9vZ3xgYEBpWJ/f99xQJEBbFw6oJWkWgpz2Pf3t2Nw6BsMBQGbvJPmcjm54vPzE3GhY4DoGwyQcDjMlGhGlGg0as3bzw9+WV7xbFa2IGLfkUhE1YaAwThgrXI0Iwaszc3NmohaBagb8v9W4DoyQvT+bhjyHx8f6wOKkJqkCYnP8rJ9QPgoSqLEpKmjo0M3aSI9SE3amc0STU3pp5lmindmZvC5Kko7SQ/S5XLVNHHXG9qSgAUFZC2uPmKxmGHSXhKuFpdH09PTplceZKTVvH7b3t42hHMJgGZ3Nqoy4kgkOMghEHAg0CwEm4hIoDj4cbbi+CqcEGJgmslkLN9dkxX1eDy2r4Dhw+yrVQxoNPRm2t/fT7u7u2WD2fr3AO6hT05O2OPjozycd3d3cr202cqxnNfrZcPDw2xoaKjifv4BfPvcBpIafmsAAAAASUVORK5CYII='
  }

  useEffect(() => {
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [0, 0],
      zoom: 2
    })
    mapRef.current.addControl(new mapboxgl.NavigationControl(), 'top-right')
    mapRef.current.on('load', onMapLoaded)

    return () => {
      mapRef.current?.off('load', onMapLoaded)
      mapRef.current?.remove()
    }
  }, [])

  return (
    <MapContext.Provider
      value={{
        mapRef: mapRef
      }}
    >
      <div className='h-full w-full' ref={mapContainerRef}>
        {loaded && children}
      </div>
    </MapContext.Provider>
  )
}
