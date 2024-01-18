import { Table } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon
} from '@radix-ui/react-icons'

interface DataPaginationProps<TData> {
  table: Table<TData>
}

function DataPagination<TData>({ table }: DataPaginationProps<TData>) {
  return (
    <div className='flex h-9 items-end justify-between px-2'>
      <div className='flex h-8 items-center gap-3 text-muted-foreground'>
        <div>{table.getFilteredRowModel().rows.length} rows</div>
        <div className='flex w-[100px] text-sm'>
          Page {table.getState().pagination.pageIndex + 1} of{' '}
          {table.getPageCount()}
        </div>
      </div>
      <div className='flex items-center'>
        <div className='flex items-center space-x-2'>
          <Button
            variant='outline'
            className='hidden h-7 w-7 p-0 lg:flex'
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className='sr-only'>Go to first page</span>
            <DoubleArrowLeftIcon className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            className='h-7 w-7 p-0'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className='sr-only'>Go to previous page</span>
            <ChevronLeftIcon className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            className='h-7 w-7 p-0'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className='sr-only'>Go to next page</span>
            <ChevronRightIcon className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            className='hidden h-7 w-7 p-0 lg:flex'
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className='sr-only'>Go to last page</span>
            <DoubleArrowRightIcon className='h-4 w-4' />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default DataPagination
