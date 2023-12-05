import { ChangeEvent, useEffect, useState } from 'react'
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
import { FeatureType } from '@/types'
import { Input } from '../../../../components/ui/input'

interface ValueInputProps {
  keyName: string
  value: any
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

function ValueInput({ keyName, value }: ValueInputProps) {
  console.log(3333, keyName, value)

  return (
    <Input
      className='rounded-none focus:ring-slate-800 focus-visible:ring-slate-800 h-6 p-0 border-0 w-full'
      defaultValue={value}
      title={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        // onKeyValueUpdate(row.id, e.target.value, row.value)
      }}
    />
  )
}

interface FeatureTableProps {
  feature?: FeatureType
  onPropertiesUpdate?: () => void
}

function FeatureTable({ feature }: FeatureTableProps) {
  const [propertyList, setPropertyList] = useState<
    { id: number; key: string; value: any }[]
  >([])

  useEffect(() => {
    const property = feature?.properties
      ? Object.entries(feature.properties).map(([key, value], idx) => ({
          id: idx,
          key,
          value
        }))
      : []
    setPropertyList(property)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [feature])

  const addNewRow = () => {
    if (propertyList.find((property) => !property.key)) {
      return
    }
    setPropertyList((v) => [
      ...v,
      { id: propertyList.length + 1, key: '', value: null }
    ])
  }

  const onKeyValueUpdate = (id: number, key: string, value: any) => {
    setPropertyList((prevList) =>
      prevList.map((row) => (row.id === id ? { ...row, key, value } : row))
    )
  }

  return (
    <div className=''>
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
          {propertyList.map((row, idx) => {
            return (
              <TableRow key={row.id} className='odd:bg-gray-950 even:bg-black'>
                <TableCell className='p-0.5 h-6 border-r'>
                  <Input
                    className='rounded-none focus:ring-slate-800 focus-visible:ring-slate-800 h-6 p-0 border-0 w-full'
                    defaultValue={row.key}
                    title={row.key}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      onKeyValueUpdate(row.id, e.target.value, row.value)
                    }}
                  />
                </TableCell>
                <TableCell className='p-1.5 h-6 border-r'>
                  {/* {row.value} */}
                  <ValueInput
                    keyName={row.key}
                    value={row.value}
                    onChange={() => {}}
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
    </div>
  )
}

export default FeatureTable
