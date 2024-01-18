import { useEffect, useState } from 'react'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import useLayers from '@/hooks/use-layers'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import DataPagination from './data-pagination'

type TableData = {
  [key: string]: any
}

const generateColumns = (data: TableData[]): ColumnDef<TableData>[] => {
  if (data.length === 0) {
    return []
  }

  const keys = ['index', ...Object.keys(data[0])]
  const columnHelper = createColumnHelper<TableData>()
  return keys.map((key) =>
    columnHelper.accessor(key, {
      header: () => (key === 'index' ? '' : key),
      cell: (info) =>
        key === 'index' ? (
          <span className='text-muted-foreground'>{info.row.index}</span>
        ) : (
          info.getValue()
        )
    })
  )
}

function DataTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [data, setData] = useState<Array<TableData>>([])
  const [columns, setColumns] = useState<ColumnDef<TableData>[]>([])
  const { selectedLayerId, getLayerData } = useLayers()

  useEffect(() => {
    const tableData = getLayerData(selectedLayerId)
    setData(tableData)
    const tableColumns = generateColumns(tableData)
    setColumns(tableColumns)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLayerId])

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 30
      }
    },
    state: {
      sorting,
      rowSelection
    }
  })

  return (
    <div className='relative h-full w-full pt-2 text-sm'>
      <ScrollArea
        className='relative h-[calc(100%-36px)] w-full border'
        type='hover'
      >
        <Table className='h-full w-full'>
          <TableHeader className='sticky top-0 z-10 w-full bg-secondary'>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className=''>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className='relative max-h-full'>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center text-muted-foreground'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
      <DataPagination table={table} />
    </div>
  )
}

export default DataTable
