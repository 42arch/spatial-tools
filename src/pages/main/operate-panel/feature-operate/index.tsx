import { useFeatureStore } from '@/store'
import { FeatureNode, FeatureType } from '@/types'
import { createContext, useMemo, useState } from 'react'
import FeatureTable from '@/pages/main/operate-panel/feature-operate/feature-table'
import FeatureStyles from '@/pages/main/operate-panel/feature-operate/feature-styles'

interface FeatureOperateContextProps {
  feature?: FeatureType
  setFeature?: (feature: FeatureType) => void
}

export const FeatureOperateContext = createContext<FeatureOperateContextProps>(
  {}
)

function EmptyPlaceholder() {
  return <div className='text-sm'>Create or Select a feature</div>
}

interface Props {
  featureNode: FeatureNode
}

function PropertiesTable({ featureNode }: Props) {
  const [currentFeature, setCurrentFeature] = useState<FeatureType>(
    featureNode.data
  )

  const handleStylesUpdate = (styleProps) => {
    setCurrentFeature((prev) => {
      return {
        ...prev,
        properties: {
          ...prev.properties,
          ...styleProps
        }
      }
    })
  }

  return (
    <FeatureOperateContext.Provider
      value={{
        feature: currentFeature,
        setFeature: setCurrentFeature
      }}
    >
      <div className='flex flex-col gap-8'>
        <div>
          <div className='py-2 text-sm'>Properties</div>
          <FeatureTable feature={currentFeature} />
        </div>

        <div>
          <div>Styles</div>
          <FeatureStyles />
        </div>
      </div>
    </FeatureOperateContext.Provider>
  )
}

function FeatureOperate() {
  const { selectedNodeIds, featureNodes } = useFeatureStore()
  const selectedFeatures = useMemo(() => {
    return featureNodes.filter((node) => selectedNodeIds.includes(node.id))
  }, [selectedNodeIds, featureNodes])

  return (
    <div className='px-2 py-1'>
      {selectedFeatures.length > 0 ? (
        <PropertiesTable featureNode={selectedFeatures[0]} />
      ) : (
        <EmptyPlaceholder />
      )}
    </div>
  )
}

export default FeatureOperate
