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
import { useFeatures } from '@/hooks/use-features'
import { useRef, useState } from 'react'

function PropertiesTable() {
  const { topFeaturePropertyList, updateTopFeature } = useFeatures()

  const [newRowOn, setNewRowOn] = useState<boolean>(false)
  const newKeyRef = useRef<HTMLInputElement>(null)
  const newValueRef = useRef<HTMLInputElement>(null)

  const onKeyValueUpdate = (
    id: number | string,
    keyName: string,
    value: any
  ) => {
    const newPropertyList = topFeaturePropertyList.map((row) =>
      row.id === id ? { ...row, keyName, value } : row
    )

    const propsObj = newPropertyList.reduce(
      (acc: { [key: string]: any }, current) => {
        acc[current.keyName] = current.value
        return acc
      },
      {}
    )

    updateTopFeature(propsObj)
  }

  const handleNewKeyValueUpdate = () => {
    const newKeyName = newKeyRef.current?.value
    const newValue = newValueRef.current?.value || ''
    if (newKeyName && newValue) {
      const propList = [
        ...topFeaturePropertyList,
        { id: newKeyName, keyName: newKeyName, value: newValue }
      ]
      const propsObj = propList.reduce(
        (acc: { [key: string]: any }, current) => {
          acc[current.keyName] = current.value
          return acc
        },
        {}
      )
      updateTopFeature(propsObj)
      setNewRowOn(false)
    }
  }

  const addNewKeyValue = () => {
    if (newRowOn) {
      const newKeyName = newKeyRef.current?.value
      const newValue = newValueRef.current?.value
      if (!newKeyName) {
        newKeyRef.current?.focus()
        return
      }
      if (!newValue) {
        newValueRef.current?.focus()
        return
      }
      setNewRowOn(false)
    } else {
      setNewRowOn(true)
    }
  }

  return (
    <Table className='w-full'>
      <TableHeader>
        <TableRow className='border-t'>
          <TableHead className='h-6 w-[120px] border-r p-1.5 text-sm'>
            key
          </TableHead>
          <TableHead className='h-6 w-[120px] border-r p-1.5 text-sm'>
            value
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className='[&_tr:last-child]:border-0'>
        {topFeaturePropertyList.map((row, idx) => {
          return (
            <TableRow key={idx} className=''>
              <TableCell className='h-6 border-r p-0.5'>
                <Input
                  className='h-6 w-full rounded-none border-0 p-0 focus:ring-slate-800 focus-visible:ring-slate-800'
                  defaultValue={row.keyName}
                  title={row.keyName}
                  onBlur={(e) => {
                    onKeyValueUpdate(row.id, e.target.value, row.value)
                  }}
                />
              </TableCell>
              <TableCell className='h-6 border-r p-1.5'>
                <Input
                  className='h-6 w-full rounded-none border-0 p-0 focus:ring-slate-800 focus-visible:ring-slate-800'
                  value={row.value}
                  title={row.value}
                  onChange={(e) => {
                    onKeyValueUpdate(row.id, row.keyName, e.target.value)
                  }}
                />
              </TableCell>
            </TableRow>
          )
        })}
        {newRowOn && (
          <TableRow>
            <TableCell className='h-6 border-r p-0.5'>
              <Input
                className='h-6 w-full rounded-none border-0 p-0 focus:ring-slate-800 focus-visible:ring-slate-800'
                ref={newKeyRef}
                onBlur={handleNewKeyValueUpdate}
              />
            </TableCell>
            <TableCell className='h-6 border-r p-1.5'>
              <Input
                className='h-6 w-full rounded-none border-0 p-0 focus:ring-slate-800 focus-visible:ring-slate-800'
                ref={newValueRef}
                onBlur={handleNewKeyValueUpdate}
              />
            </TableCell>
          </TableRow>
        )}
      </TableBody>
      <TableFooter className=''>
        <TableRow>
          <TableCell colSpan={3} className='p-1.5'>
            <button
              className='flex h-full w-full items-center justify-center gap-2'
              onClick={addNewKeyValue}
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
