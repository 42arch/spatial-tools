import { useSelectedFeatures } from '@/hooks/use-selected-features'
import { useFeatureStore } from '@/store'
import PropertiesTable from './properties-table'

function FeatureOperate() {
  const { selectedFeatures } = useSelectedFeatures()

  return (
    <div className='px-2 py-2'>
      {selectedFeatures.length > 0 ? (
        <div>
          <PropertiesTable />
        </div>
      ) : (
        <div className='text-sm'>Create or Select a feature</div>
      )}
    </div>
  )
}

export default FeatureOperate
