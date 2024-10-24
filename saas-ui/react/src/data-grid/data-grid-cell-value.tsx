import { Link } from '@saas-ui/react'
import { Cell, ColumnDef } from '@tanstack/react-table'

import { getResult } from './data-grid.utils'

export type DataGridCell<Data extends object> = ColumnDef<Data>['cell']

export const DataGridCellValue = <Data extends object, TValue>(
  props: Cell<Data, TValue>,
) => {
  const { column, row, getValue } = props

  const meta = column.columnDef.meta || {}

  let content = getValue<React.ReactNode>()

  if (meta.href) {
    const href = getResult(meta.href, row.original)
    content = <Link href={href}>{content}</Link>
  }

  return content
}

DataGridCellValue.displayName = 'DataGridCellValue'

/**
 * @deprecated use DataGridCellValue instead
 */
export const DefaultDataGridCell = DataGridCellValue
