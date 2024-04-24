import { Th, chakra, useTableStyles } from '@chakra-ui/react'
import { Header, flexRender } from '@tanstack/react-table'

import { DataGridColumnResizer } from './data-grid-column-resizer'
import { DataGridSort } from './data-grid-sort'

export interface DataGridHeaderProps<Data extends object, TValue> {
  header: Header<Data, TValue>
  isSortable?: boolean
}
export const DataGridHeader = <Data extends object, TValue>(
  props: DataGridHeaderProps<Data, TValue>,
) => {
  const { header, isSortable, ...rest } = props

  const styles = useTableStyles()

  let titleProps = {}

  if (isSortable && header.column.getCanSort()) {
    const sorted = header.column.getIsSorted()
    titleProps = {
      userSelect: 'none',
      cursor: 'pointer',
      tabIndex: 0,
      'aria-sort': sorted
        ? sorted === 'desc'
          ? 'descending'
          : 'ascending'
        : 'none',
      onClick: header.column.getToggleSortingHandler(),
      onKeyDown: (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
          header.column.toggleSorting()
        }
      },
    }
  }

  const meta = (header.column.columnDef.meta || {}) as any

  return (
    <Th
      colSpan={header.colSpan}
      textTransform="none"
      isNumeric={meta.isNumeric}
      flex={`1 0 calc(var(--header-${header.id}-size) * 1px)`}
      width={`calc(var(--header-${header.id}-size) * 1px)`}
      minWidth={`max(var(--col-${header.id}-size) * 1px, 40px)`}
      {...meta.headerProps}
      {...rest}
    >
      <chakra.div
        __css={styles.title}
        className="saas-data-grid__title"
        {...meta.titleProps}
        {...titleProps}
      >
        {flexRender(header.column.columnDef.header, header.getContext())}
        {isSortable && header.column.getIsSorted() && (
          <DataGridSort header={header} />
        )}
      </chakra.div>
      <DataGridColumnResizer header={header} />
    </Th>
  )
}

DataGridHeader.displayName = 'DataGridHeader'
