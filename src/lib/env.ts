import { envsafe, str } from 'envsafe'

export default envsafe({
  NEXT_PUBLIC_MAPBOX_TOKEN: str({
    input: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
    devDefault: '_'
  })
})
