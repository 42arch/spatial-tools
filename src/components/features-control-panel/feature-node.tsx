import { FeatureNode } from '@/types'

interface FeatureNodeProps {
  data: FeatureNode
}

function FeatureNode({ data }: FeatureNodeProps) {
  return (
    <div
      key={data.id}
      className='py-1 text-sm cursor-pointer bg-zinc-200 hover:bg-zinc-300 pl-2'
    >
      {data.data.geometry.type}
    </div>
  )
}

export default FeatureNode
