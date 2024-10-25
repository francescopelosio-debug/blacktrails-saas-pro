import { useCallback, useMemo } from 'react'

import type { Column, Row } from '@tanstack/react-table'
import {
  type Range,
  type Virtualizer,
  type VirtualizerOptions,
  defaultRangeExtractor,
  useVirtualizer,
} from '@tanstack/react-virtual'

export type DataGridColumnVirtualizer = Virtualizer<
  HTMLDivElement,
  HTMLTableRowElement
> & {
  virtualPaddingLeft?: number
  virtualPaddingRight?: number
}

export type DataGridRowVirtualizer = Virtualizer<
  HTMLDivElement,
  HTMLTableRowElement
>

export interface DataGridVirtualizer {
  row?: DataGridRowVirtualizer | null
  column?: DataGridColumnVirtualizer | null
}

export function useColumnVirtualizerPadding(
  columnVirtualizer?: Virtualizer<HTMLDivElement, HTMLTableRowElement>,
) {
  let virtualPaddingLeft: number | undefined
  let virtualPaddingRight: number | undefined

  const virtualColumns = columnVirtualizer?.getVirtualItems()

  if (columnVirtualizer && virtualColumns?.length) {
    virtualPaddingLeft = virtualColumns[0]?.start ?? 0
    virtualPaddingRight =
      columnVirtualizer.getTotalSize() -
      (virtualColumns[virtualColumns.length - 1]?.end ?? 0)
  }

  return {
    virtualPaddingLeft,
    virtualPaddingRight,
  }
}

export function useRowVirtualizerPadding(
  rowVirtualizer?: Virtualizer<HTMLDivElement, HTMLTableRowElement>,
) {
  const virtualRows = rowVirtualizer?.getVirtualItems()

  let virtualPaddingTop: number = 0
  let virtualPaddingBottom: number = 0

  if (rowVirtualizer && virtualRows?.length) {
    const totalSize = rowVirtualizer?.getTotalSize()

    virtualPaddingTop =
      virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0
    virtualPaddingBottom =
      virtualRows.length > 0
        ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
        : 0
  }

  return {
    virtualPaddingTop,
    virtualPaddingBottom,
  }
}

export interface UseColumnVirtualizerOptions
  extends Partial<VirtualizerOptions<HTMLDivElement, HTMLTableRowElement>> {
  enabled?: boolean
  getScrollElement: () => HTMLDivElement | null
}

export function useColumnVirtualizer<Data extends object>(
  columns: Column<Data>[],
  options: UseColumnVirtualizerOptions,
): DataGridColumnVirtualizer | null {
  if (options.enabled === false) return null

  const columnVirtualizer = useVirtualizer({
    count: columns.length,
    estimateSize: (index) => columns[index].getSize(),
    horizontal: true,
    overscan: 3,
    indexAttribute: 'data-col',
    rangeExtractor: useCallback((range: Range) => {
      return extraIndexRangeExtractor(range)
    }, []),
    ...options,
  })

  const { virtualPaddingLeft, virtualPaddingRight } =
    useColumnVirtualizerPadding(columnVirtualizer)

  return {
    ...columnVirtualizer,
    virtualPaddingLeft,
    virtualPaddingRight,
  } as any
}

export interface UseRowVirtualizerOptions
  extends Partial<VirtualizerOptions<HTMLDivElement, HTMLTableRowElement>> {
  enabled?: boolean
  estimateSize: (index: number) => number
  getScrollElement: () => HTMLDivElement | null
}

export function useRowVirtualizer<Data extends object>(
  rows: Row<Data>[],
  options: UseRowVirtualizerOptions,
) {
  if (options.enabled === false) return null

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    indexAttribute: 'data-row',
    overscan: 5,
    ...options,
  })

  return rowVirtualizer
}

export const extraIndexRangeExtractor = (
  range: Range,
  draggingIndex?: number,
) => {
  const newIndexes = defaultRangeExtractor(range)
  if (draggingIndex === undefined) return newIndexes
  if (
    draggingIndex >= 0 &&
    draggingIndex < Math.max(range.startIndex - range.overscan, 0)
  ) {
    newIndexes.unshift(draggingIndex)
  }
  if (draggingIndex >= 0 && draggingIndex > range.endIndex + range.overscan) {
    newIndexes.push(draggingIndex)
  }
  return newIndexes
}
