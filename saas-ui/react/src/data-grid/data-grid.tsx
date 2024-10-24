'use client'

import * as React from 'react'

import {
  SystemStyleObject,
  Table,
  TableRowProps,
  Tbody,
  Td,
  Thead,
  ThemingProps,
  Tr,
  chakra,
  useCallbackRef,
  useMergeRefs,
  useMultiStyleConfig,
  useTheme,
} from '@chakra-ui/react'
import { callAllHandlers, cx, dataAttr, runIfFn } from '@chakra-ui/utils'
import {
  type Cell,
  ColumnSort,
  type Header,
  Row,
  Table as TableInstance,
  TableOptions,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import {
  type VirtualItem,
  VirtualizerOptions,
  useVirtualizer,
} from '@tanstack/react-virtual'

import { DefaultDataGridCell } from './data-grid-cell'
import { getSelectionColumn } from './data-grid-checkbox'
import { DataGridIcons, DataGridProvider } from './data-grid-context'
import { getExpanderColumn } from './data-grid-expander'
import { DataGridFooter } from './data-grid-footer'
import { DataGridHeader } from './data-grid-header'
import { DataGridTranslations } from './data-grid-translations'
import {
  useColumnVirtualizerPadding,
  useRowVirtualizerPadding,
} from './data-grid-virtualizer'
import { type DataGridSlotProps, FocusChangeHandler } from './data-grid.types'
import { escapeId } from './data-grid.utils'
import { FocusMode, useFocusModel } from './focus-model'
import { NoResults } from './no-results'
import { getPinnedStyles, isGroupColumn } from './utils'

export interface DataGridProps<Data extends object>
  extends Omit<TableOptions<Data>, 'getCoreRowModel'>,
    ThemingProps<'SuiDataGrid'> {
  /**
   * The React Table instance reference
   */
  instanceRef?: React.Ref<TableInstance<Data>>
  /**
   * Enable sorting on all columns
   */
  isSortable?: boolean
  /**
   * Enable row selection
   */
  isSelectable?: boolean
  /**
   * Enable row hover styles
   */
  isHoverable?: boolean
  /**
   * Enable expandable rows
   */
  isExpandable?: boolean
  /**
   * Column resize mode
   */
  columnResizeMode?: 'onChange' | 'onEnd'
  /**
   * Column resize direction
   */
  columnResizeDirection?: 'ltr' | 'rtl'
  /**
   * Enable column resizing
   *
   * layoutMode will be set to `fixed` when columnResizeEnabled is true.
   *
   * @default false
   */
  columnResizeEnabled?: boolean
  /**
   * Triggers whenever the row selection changes.
   * @params rows The selected row id'
   */
  onSelectedRowsChange?: (rows: Array<string>) => void
  /**
   * Triggers when sort changed.
   * Use incombination with `manualSortBy` to enable remote sorting.
   */
  onSortChange?: (columns: ColumnSort[]) => void
  /**
   * Callback fired when a row or cell is focused.
   */
  onFocusChange?: FocusChangeHandler<Data>
  /**
   * Callback fired when a row is clicked.
   */
  onRowClick?: (row: Row<Data>, e: React.MouseEvent, meta?: any) => void
  /**
   * Callback fired when clear filters is clicked.
   */
  onResetFilters?: () => void
  /**
   * Use this for controlled pagination.
   */
  pageCount?: number
  /**
   * Empty state component, rendered when there is no data and no filters enabled.
   */
  emptyState?: React.FC<any>
  /**
   * No results component, rendered when filters are enabled and there are no results.
   */
  noResults?: React.FC<any>
  /**
   * Enable keyboard navigation
   * @default 'list'
   */
  focusMode?: FocusMode
  /**
   * Set the layout mode of columns.
   *
   * - `grow` will make columns grow to fill the available space.
   * - `fixed` will make columns have a fixed width.
   *
   * Defaults to `grow`, but will be set to `fixed` when columnResizeEnabled is true.
   *
   * @default 'grow'
   */
  layoutMode?: 'grow' | 'fixed'
  /**
   * The table class name attribute
   */
  className?: string
  /**
   * Grid styles
   */
  sx?: SystemStyleObject
  /**
   * Set to false to disable sticky headers
   * @default true
   */
  stickyHeader?: boolean
  /**
   * DataGrid children
   */
  children?: React.ReactNode
  /**
   * Callback fired when the grid is scrolled.
   */
  onScroll?: React.UIEventHandler<HTMLDivElement>
  /**
   * React Virtual options for the column virtualizer
   * @see https://tanstack.com/virtual/v3/docs/adapters/react-virtual
   */
  columnVirtualizerOptions?: Partial<
    VirtualizerOptions<HTMLDivElement, HTMLTableRowElement>
  > & { enabled?: boolean }
  /**
   * React Virtual options for the row virtualizer
   * @see https://tanstack.com/virtual/v3/docs/adapters/react-virtual
   */
  rowVirtualizerOptions?: Partial<
    VirtualizerOptions<HTMLDivElement, HTMLTableRowElement>
  > & { enabled?: boolean }
  /**
   * Custom icons
   * This prop is memoized and will not update after initial render.
   */
  icons?: DataGridIcons
  /**
   * Pass custom properties to child (slots) components.
   */
  slotProps?: DataGridSlotProps<Data>
  translations?: Partial<DataGridTranslations>
}

export const DataGrid = React.forwardRef(
  <Data extends object>(
    props: DataGridProps<Data>,
    ref: React.ForwardedRef<HTMLTableElement>,
  ) => {
    const {
      instanceRef,
      columns,
      data,
      initialState,
      getSubRows = (row: any) => row.subRows,
      defaultColumn,
      getRowId,
      isSortable,
      isSelectable,
      isHoverable = true,
      isExpandable,
      columnResizeMode = 'onChange',
      columnResizeEnabled = false,
      onSelectedRowsChange,
      onSortChange,
      onFocusChange,
      onRowClick,
      onResetFilters,
      onScroll,
      emptyState: EmptyStateComponent = NoResults,
      noResults: NoResultsComponent = NoResults,
      pageCount,
      focusMode = 'list',
      layoutMode = columnResizeEnabled ? 'fixed' : 'grow',
      colorScheme,
      size,
      variant,
      stickyHeader = true,
      className,
      sx,
      columnVirtualizerOptions,
      rowVirtualizerOptions,
      icons,
      slotProps,
      children,
      ...rest
    } = props

    const theme = useTheme()
    const styleConfig = theme.components?.SuiDataGrid

    const styles = useMultiStyleConfig('SuiDataGrid', {
      size,
      variant,
      colorScheme,
    })

    const instance = useReactTable<Data>({
      columns: React.useMemo(() => {
        const selectionColumn =
          columns?.[0]?.id === 'selection' ? columns[0] : undefined

        const expanderColumn = columns.find(({ id }) => id === 'expand')

        return getSelectionColumn<Data>(isSelectable, selectionColumn)
          .concat(getExpanderColumn(isExpandable, expanderColumn))
          .concat(
            columns
              ?.filter(({ id }) => id !== 'selection')
              .map((column: any) => {
                if (!column.accessorKey && column.id) {
                  column.accessorKey = column.id
                }

                if (!column.cell) {
                  column.cell = DefaultDataGridCell
                }

                column.enableResizing = columnResizeEnabled
                  ? column.enableResizing
                  : false

                return column
              }),
          )
      }, [columns, columnResizeEnabled]),
      data,
      initialState: React.useMemo(() => initialState, []),
      defaultColumn,
      getSubRows,
      getRowId,
      manualPagination: pageCount !== undefined,
      pageCount,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getExpandedRowModel: getExpandedRowModel(),
      columnResizeMode,
      ...rest,
    })

    const focusModel = useFocusModel({
      mode: focusMode,
      table: instance,
      onFocusChange,
    })

    // This exposes the useTable api through the tableRef
    React.useImperativeHandle(instanceRef, () => instance, [instanceRef])

    const state = instance.getState()
    const rows = instance.getRowModel().rows
    const visibleColumns = instance.getVisibleLeafColumns()

    const scrollRef = React.useRef<HTMLDivElement>(null)

    const columnVirtualizer = useVirtualizer({
      count: visibleColumns.length,
      estimateSize: (index) => visibleColumns[index].getSize(),
      getScrollElement: () => scrollRef.current,
      horizontal: true,
      overscan: 2,
      ...columnVirtualizerOptions,
    })

    const rowVirtualizer = useVirtualizer({
      getScrollElement: () => scrollRef.current,
      estimateSize: () => {
        switch (size) {
          case 'xl':
            return 65
          case 'lg':
            return 53
          case 'sm':
            return 33
          case 'md':
          default:
            return 41
        }
      },
      count: rows.length,
      indexAttribute: 'data-row',
      overscan: 5,
      ...rowVirtualizerOptions,
    })
    const rowVirtualizationEnabled = rowVirtualizerOptions?.enabled ?? true
    const columnVirtualizationEnabled =
      columnVirtualizerOptions?.enabled ?? true

    const virtualColumns = columnVirtualizationEnabled
      ? columnVirtualizer.getVirtualItems()
      : undefined
    const virtualRows = rowVirtualizationEnabled
      ? rowVirtualizer.getVirtualItems()
      : undefined

    const _onSelectedRowsChange = useCallbackRef(onSelectedRowsChange)

    React.useEffect(() => {
      _onSelectedRowsChange?.(Object.keys(state.rowSelection))
    }, [_onSelectedRowsChange, state.rowSelection, instance])

    const _onSortChange = useCallbackRef(onSortChange)

    React.useEffect(() => {
      _onSortChange?.(state.sorting)
    }, [_onSortChange, state.sorting])

    const noResults =
      !rows.length &&
      (state.columnFilters.length || state.globalFilter ? (
        <NoResultsComponent onReset={onResetFilters} />
      ) : (
        <EmptyStateComponent />
      ))

    const innerStyles = {
      ...styles.inner,
      ...(noResults ? { display: 'flex', alignItems: 'center' } : {}),
    }

    const { virtualPaddingLeft, virtualPaddingRight } =
      useColumnVirtualizerPadding(columnVirtualizer)

    const { columnSizing, columnSizingInfo, columnVisibility } = state

    const columnSizeVars = React.useMemo(() => {
      const headers = instance.getFlatHeaders()
      const colSizes: { [key: string]: number } = {
        '--column-grow': layoutMode === 'grow' ? 1 : 0,
      }
      for (let i = 0; i < headers.length; i++) {
        const header = headers[i]!
        colSizes[`--header-${escapeId(header.id)}-size`] = header.getSize()
        colSizes[`--col-${escapeId(header.column.id)}-size`] =
          header.column.getSize()
      }
      return colSizes
    }, [
      instance,
      columns,
      columnSizing,
      columnSizingInfo,
      columnVisibility,
      layoutMode,
    ])

    const expandedDepth = instance.getExpandedDepth()

    const expandedVars: { [key: string]: number } =
      isExpandable && expandedDepth
        ? {
            '--expanded-depth': expandedDepth,
          }
        : {}

    const tableProps = runIfFn(slotProps?.table, { table: instance })

    const table = (
      <Table
        ref={useMergeRefs(ref, focusModel.tableRef)}
        {...tableProps}
        className={cx('sui-data-grid', tableProps?.className)}
        styleConfig={styleConfig}
        colorScheme={colorScheme}
        size={size}
        variant={variant}
        sx={sx}
        style={{
          ...columnSizeVars,
          ...expandedVars,
          ...tableProps?.style,
        }}
      >
        <Thead data-sticky={dataAttr(stickyHeader)}>
          {instance.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {virtualPaddingLeft ? (
                <th style={{ display: 'flex', width: virtualPaddingLeft }} />
              ) : null}
              {(virtualColumns ?? headerGroup.headers).map(
                (headerOrVirtualColumn, index) => {
                  let header = headerOrVirtualColumn as unknown as Header<
                    Data,
                    unknown
                  >
                  if (columnVirtualizer) {
                    header = headerGroup.headers[headerOrVirtualColumn.index]
                    index = headerOrVirtualColumn.index
                  }

                  const headerProps = runIfFn(slotProps?.header, {
                    header,
                    table: instance,
                  })

                  const key = `${header.id}-${index}`

                  return (
                    <DataGridHeader
                      key={key}
                      header={header}
                      isSortable={isSortable}
                      {...headerProps}
                    />
                  )
                },
              )}
              {virtualPaddingRight ? (
                <th style={{ display: 'flex', width: virtualPaddingRight }} />
              ) : null}
            </Tr>
          ))}
        </Thead>
        <Tbody
          style={
            rowVirtualizationEnabled
              ? {
                  position: 'relative',
                  height: rowVirtualizer.getTotalSize(),
                }
              : {}
          }
        >
          {(virtualRows ?? rows).map((rowOrVirtualRow, rowIndex) => {
            let row = rowOrVirtualRow as unknown as Row<Data>
            let virtualRow: VirtualItem | undefined
            if (rowVirtualizationEnabled) {
              row = rows[rowOrVirtualRow.index]
              virtualRow = rowOrVirtualRow as VirtualItem
              rowIndex = rowOrVirtualRow.index
            }
            const visibleCells = row.getVisibleCells()
            const virtualColumns = columnVirtualizer?.getVirtualItems()

            const columns = columnVirtualizationEnabled
              ? virtualColumns
              : visibleCells

            const onClick = (e: React.MouseEvent) => onRowClick?.(row, e)

            const ariaProps: TableRowProps = {}
            if (isExpandable) {
              ariaProps['aria-expanded'] = row.getIsExpanded()
            }
            if (isSelectable) {
              ariaProps['aria-selected'] = row.getIsSelected()
            }

            const rowProps = runIfFn(slotProps?.row, { row, table: instance })

            const virtualStyles = rowVirtualizationEnabled
              ? {
                  position: 'absolute',
                  top: 0,
                  transform: `translateY(${virtualRow?.start}px)`,
                }
              : {}

            const key = `${row.id}-${rowIndex}`

            return (
              <Tr
                key={key}
                {...rowProps}
                ref={rowVirtualizer.measureElement}
                onClick={callAllHandlers(onClick, rowProps?.onClick)}
                data-row={rowIndex}
                data-selected={dataAttr(row.getIsSelected())}
                data-interactive={dataAttr(isHoverable)}
                {...ariaProps}
                {...focusModel.getRowProps(row)}
                style={
                  {
                    '--depth': row.depth,
                    ...virtualStyles,
                  } as Record<string, string | number>
                }
              >
                {virtualPaddingLeft ? (
                  <td style={{ display: 'flex', width: virtualPaddingLeft }} />
                ) : null}
                {columns.map((cellOrVirtual, index) => {
                  let cell = cellOrVirtual as unknown as Cell<Data, unknown>

                  if (columnVirtualizationEnabled && 'index' in cellOrVirtual) {
                    cell = visibleCells[cellOrVirtual.index]
                    index = cellOrVirtual.index
                  }

                  const column = cell.column
                  const meta = column.columnDef.meta ?? {}

                  const colId = escapeId(column.id)

                  const cellProps = runIfFn(slotProps?.cell, {
                    cell,
                    table: instance,
                  })

                  const isColumnPinned =
                    !isGroupColumn(column) && column.getIsPinned()

                  const pinnedStyles = getPinnedStyles(column)

                  const isLast = column.getIsLastColumn(isColumnPinned)

                  const key = `${cell.id}-${rowIndex}`

                  return (
                    <Td
                      key={key}
                      isNumeric={meta.isNumeric}
                      data-col={index}
                      data-pinned={isColumnPinned ? isColumnPinned : undefined}
                      data-last={dataAttr(isLast)}
                      flexBasis={`calc(var(--col-${colId}-size) * 1px)`}
                      flexShrink={0}
                      flexGrow="var(--column-grow, 1)"
                      width={`calc(var(--col-${colId}-size) * 1px)`}
                      minWidth={`max(var(--col-${colId}-size) * 1px, 40px)`}
                      {...focusModel.getCellProps(cell)}
                      {...meta.cellProps}
                      {...cellProps}
                      style={pinnedStyles as Record<string, string | number>}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </Td>
                  )
                })}
                {virtualPaddingRight ? (
                  <td style={{ display: 'flex', width: virtualPaddingRight }} />
                ) : null}
              </Tr>
            )
          })}
        </Tbody>
        <DataGridFooter
          instance={instance}
          slotProps={slotProps}
          columnVirtualizer={columnVirtualizer}
        />
      </Table>
    )

    const containerProps = runIfFn(slotProps?.container, { table: instance })
    const innerProps = runIfFn(slotProps?.inner, { table: instance })

    return (
      <DataGridProvider<Data>
        instance={instance}
        slotProps={slotProps}
        virtualizer={{
          row:
            rowVirtualizerOptions?.enabled === false
              ? undefined
              : rowVirtualizer,
          column:
            columnVirtualizerOptions?.enabled === false
              ? undefined
              : columnVirtualizer,
        }}
        colorScheme={colorScheme}
        variant={variant}
        size={size}
        icons={icons}
      >
        <chakra.div
          {...containerProps}
          className={cx('sui-data-grid', className, containerProps?.className)}
          __css={styles.container}
        >
          <chakra.div
            {...innerProps}
            ref={scrollRef}
            className={cx('sui-data-grid__inner', innerProps?.className)}
            __css={innerStyles}
            onScroll={onScroll}
          >
            {noResults || table}
          </chakra.div>
          {children}
        </chakra.div>
      </DataGridProvider>
    )
  },
) as (<Data extends object>(
  props: DataGridProps<Data> & {
    ref?: React.ForwardedRef<HTMLTableElement>
  },
) => React.ReactElement) & { displayName?: string }

DataGrid.displayName = 'DataGrid'
