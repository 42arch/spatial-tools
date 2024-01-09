import Ajv from 'ajv'
import schema from '@/lib/geojson-schema.json'

export const validateGeoJSON = (json: object) => {
  const ajv = new Ajv()
  const validate = ajv.compile(schema)
  const isValid = validate(json)
  return { isValid, errors: validate.errors }
}

export const getFileExtension = (fileName: string) => {
  return fileName.slice(((fileName.lastIndexOf('.') - 1) >>> 0) + 2)
}

export const getFileName = (fileName: string) => {
  return fileName.replace(/\.[^/.]+$/, '')
}

export const openFileExplorer = (): Promise<FileList | null> => {
  return new Promise((resolve) => {
    const fileInput = document.createElement('input')
    fileInput.type = 'file'
    fileInput.style.display = 'none'
    fileInput.addEventListener('change', () => {
      resolve(fileInput.files)
    })
    fileInput.click()
  })
}

export const parseJSONFile = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target?.result as string
      resolve(content)
    }
    reader.readAsText(file)
  })
}

export const readFile = async (file: File) => {
  const fileExt = getFileExtension(file.name)
  switch (fileExt) {
    case 'json':
    case 'geojson': {
      const content = await parseJSONFile(file)
      return content
    }

    default:
      break
  }
}
