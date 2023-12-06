import { ChangeEvent } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Icon } from '@iconify/react'
import { Input } from '@/components/ui/input'
import { useSelectedFeatures } from './useSelectedFeatures'

function PropertiesTable() {
  const {
    topFeature: feature,
    topFeaturePropertyList,
    updateTopFeature
  } = useSelectedFeatures()

  const onKeyValueUpdate = (
    id: number | string,
    keyName: string,
    value: any
  ) => {
    const newPropertyList = topFeaturePropertyList.map((row) =>
      row.id === id ? { ...row, keyName, value } : row
    )

    const propsObj = newPropertyList.reduce((acc, current) => {
      acc[current.keyName] = current.value
      return acc
    }, {})

    updateTopFeature(propsObj)
  }

  const addNewRow = () => {
    const newKey = '',
      newValue = ''
    const newObj = { ...feature?.properties, [newKey]: newValue }
    updateTopFeature(newObj)
  }

  return (
    <Table className='w-full'>
      <TableHeader>
        <TableRow className='border-t'>
          <TableHead className='h-6 p-1.5 text-sm border-r w-[120px]'>
            key
          </TableHead>
          <TableHead className='h-6 p-1.5 text-sm border-r w-[120px]'>
            value
          </TableHead>
          <TableHead className='h-6 p-1.5 text-sm w-10'></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className='[&_tr:last-child]:border-0'>
        {topFeaturePropertyList.map((row, idx) => {
          return (
            <TableRow key={idx} className='odd:bg-gray-950 even:bg-black'>
              <TableCell className='p-0.5 h-6 border-r'>
                <Input
                  className='rounded-none focus:ring-slate-800 focus-visible:ring-slate-800 h-6 p-0 border-0 w-full'
                  defaultValue={row.keyName}
                  title={row.keyName}
                  onBlur={(e) => {
                    onKeyValueUpdate(row.id, e.target.value, row.value)
                  }}
                  // onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  //   // onKeyValueUpdate(row.id, e.target.value, row.value)
                  // }}
                />
              </TableCell>
              <TableCell className='p-1.5 h-6 border-r'>
                <Input
                  className='rounded-none focus:ring-slate-800 focus-visible:ring-slate-800 h-6 p-0 border-0 w-full'
                  defaultValue={row.value}
                  title={row.value}
                  onBlur={(e) => {
                    onKeyValueUpdate(row.id, row.keyName, e.target.value)
                  }}
                />
              </TableCell>
              <TableCell className='p-1.5 h-6 w-10 text-center'>x</TableCell>
            </TableRow>
          )
        })}
      </TableBody>
      <TableFooter className=''>
        <TableRow>
          <TableCell colSpan={3} className='p-1.5'>
            <button
              className='flex items-center justify-center gap-2 w-full h-full'
              onClick={addNewRow}
            >
              <Icon icon='ph:plus' />
              <span className='cursor-pointer text-sm'>add new row</span>
            </button>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}

export default PropertiesTable
