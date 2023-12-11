import { useSelectedFeatures } from '@/hooks/use-selected-features'
import { useState } from 'react'
import { Controlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'

function GeojsonEditor() {
  const { selectedFeatures } = useSelectedFeatures()

  const [code, setCode] = useState(JSON.stringify(selectedFeatures))

  const handleChange = (editor, data, value) => {
    setCode(value)
  }

  return (
    <CodeMirror
      value={code}
      options={{
        mode: 'js',
        theme: 'material'
      }}
      onBeforeChange={(editor, data, value) =>
        handleChange(editor, data, value)
      }
    />
  )
}

export default GeojsonEditor
