'use client'

import { useSelectedFeatures } from '@/hooks/use-selected-features'
import { useEffect, useRef, useState } from 'react'
import { Controlled as CodeMirror } from 'react-codemirror2'
import { useDebounce } from 'react-use'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/theme/ayu-mirage.css'
import { isJSONString } from '@/lib/file'
import isEqual from 'lodash/isEqual'

function GeojsonEditor() {
  const editorRef = useRef<any>()
  const wrapperRef = useRef<any>()

  const { topFeature, updateSelectedFeature } = useSelectedFeatures()

  const [code, setCode] = useState('')

  const updateFeature = (value: string) => {
    if (isJSONString(value)) {
      const feature = JSON.parse(value)
      if (!isEqual(topFeature, feature)) {
        updateSelectedFeature(feature)
      }
    }
  }

  useDebounce(() => updateFeature(code), 300, [code])

  useEffect(() => {
    setCode(JSON.stringify(topFeature, null, 2))
  }, [topFeature])

  const editorWillUnmount = () => {
    editorRef.current.display.wrapper.remove()
    if (wrapperRef.current) {
      wrapperRef.current.hydrated = false
    }
  }

  const handleChange = (editor, data, value) => {
    setCode(value)
  }

  return (
    <CodeMirror
      value={code}
      ref={wrapperRef}
      options={{
        mode: { name: 'javascript', json: true },
        theme: 'ayu-mirage'
      }}
      onBeforeChange={(editor, data, value) =>
        handleChange(editor, data, value)
      }
      editorDidMount={(e) => (editorRef.current = e)}
      editorWillUnmount={editorWillUnmount}
    />
  )
}

export default GeojsonEditor
