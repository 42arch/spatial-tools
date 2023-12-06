import { useFeatureStore } from '@/store'
import { useMemo } from 'react'
import PropertiesTable from './properties-table'

function FeatureOperate() {
  const { selectedNodeIds, featureNodes } = useFeatureStore()
  const selectedFeatures = useMemo(() => {
    return featureNodes.filter((node) => selectedNodeIds.includes(node.id))
  }, [selectedNodeIds, featureNodes])

  return (
    <div className='px-2 py-1'>
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
