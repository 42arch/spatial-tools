import { useToast } from '@/components/ui/use-toast'
import { MenubarItem } from '@/components/ui/menubar'
import {
  getFileName,
  openFileExplorer,
  readFile,
  validateGeoJSON
} from '@/lib/file'
import { useFeatures } from '@/hooks/use-features'

function ImportMenuItem() {
  const { toast } = useToast()
  const { addFeatures, addNewFeatureGroup } = useFeatures()

  const hanleImportFile = async () => {
    const files = await openFileExplorer()
    if (files?.length) {
      const content = await readFile(files[0])
      if (content) {
        const fileName = getFileName(files[0].name)
        const jsonObject = JSON.parse(content?.toString())
        const { isValid, errors } = validateGeoJSON(jsonObject)
        if (isValid) {
          addNewFeatureGroup(fileName)
          addFeatures(jsonObject.features)
          toast({
            description: 'Import Data Successful.'
          })
        } else {
          toast({
            variant: 'destructive',
            title: 'Uh oh! Something went wrong.',
            description: errors?.[0].message
          })
        }
      }
    }
  }

  return <MenubarItem onClick={hanleImportFile}>Import</MenubarItem>
}

export default ImportMenuItem
