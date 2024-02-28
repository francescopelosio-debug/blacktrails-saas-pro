import { Header, flexRender } from '@tanstack/react-table'
import { DataGridSort } from './data-grid-sort'
import { Th } from '@chakra-ui/react'

export interface DataGridHeaderProps<Data extends object, TValue> {
  header: Header<Data, TValue>
  isSortable?: boolean
}
export const DataGridHeader = <Data extends object, TValue>(
  props: DataGridHeaderProps<Data, TValue>,
) => {
  const { header, isSortable, ...rest } = props

  let headerProps = {}

  if (isSortable && header.column.getCanSort()) {
    const sorted = header.column.getIsSorted()
    headerProps = {
      className: 'saas-data-grid__sortable',
      userSelect: 'none',
      cursor: 'pointer',
      'aria-sort': sorted
        ? sorted === 'desc'
          ? 'descending'
          : 'ascending'
        : 'none',
      onClick: header.column.getToggleSortingHandler(),
    }
  }

  const meta = (header.column.columnDef.meta || {}) as any

  return (
    <Th
      colSpan={header.colSpan}
      textTransform="none"
      isNumeric={meta.isNumeric}
      flex={`var(--col-${header.id}-size) 0 auto`}
      width={`calc(var(--header-${header.id}-size) * 1px)`}
      minWidth={`max(var(--col-${header.id}-size) * 1px, 40px)`}
      {...meta.headerProps}
      {...headerProps}
      {...rest}
    >
      {flexRender(header.column.columnDef.header, header.getContext())}
      {isSortable && header.column.getIsSorted() && (
        <DataGridSort header={header} />
      )}
    </Th>
  )
}

DataGridHeader.displayName = 'DataGridHeader'
