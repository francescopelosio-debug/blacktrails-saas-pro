import { TableCellProps, TableColumnHeaderProps } from '@chakra-ui/react'
import type { Cell, Row } from '@tanstack/react-table'

import { DataGridExpanderProps } from './data-grid-expander'

export type {
  Table as TableInstance,
  ColumnDef,
  Row,
  SortingState,
  RowSelectionState,
  PaginationState,
  ColumnFiltersState,
  FilterFn,
  SortingFn,
  OnChangeFn,
} from '@tanstack/react-table'

/* eslint-disable-next-line  */
export interface DataGridColumnMeta<TData, TValue> {
  /**
   * Will render a link with the href value in the cell.
   */
  href?: (row: TData) => string
  /**
   * Enables numeric cell styles.
   */
  isNumeric?: boolean
  /**
   * Enables text overflow.
   * @default true
   */
  isTruncated?: boolean
  /**
   * Custom header props
   */
  headerProps?: TableColumnHeaderProps
  /**
   * Custom cell props
   */
  cellProps?: TableCellProps
  /**
   * Custom expander props
   */
  expanderProps?: DataGridExpanderProps
}

export type FocusChangeHandler<Data extends object = object> = (details: {
  row: Row<Data>
  cell: Cell<Data, unknown>
}) => void
