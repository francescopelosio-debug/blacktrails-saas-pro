import { IconButton, IconButtonProps, forwardRef } from '@chakra-ui/react'
import { ColumnDef } from '@tanstack/react-table'

import { ChevronDownIcon, ChevronUpIcon } from '../icons'
import { useDataGridContext } from './data-grid-context'

export interface DataGridExpanderProps
  extends Omit<IconButtonProps, 'aria-label'> {
  isExpanded: boolean
  onToggle: (event: unknown) => void
  'aria-label'?: string
}

export const DataGridExpander = forwardRef<DataGridExpanderProps, 'button'>(
  (props, ref) => {
    const { isExpanded, onToggle, ...rest } = props
    const { instance, icons, translations } = useDataGridContext()

    if (!instance.getCanSomeRowsExpand()) {
      return null
    }

    const expandedIcon = icons?.rowExpanded ?? <ChevronDownIcon />
    const collapsedIcon = icons?.rowCollapsed ?? <ChevronUpIcon />

    return (
      <IconButton
        ref={ref}
        size="xs"
        variant="ghost"
        fontSize="1.2em"
        {...rest}
        aria-label={
          isExpanded ? translations.collapseRows : translations.expandRows
        }
        icon={isExpanded ? expandedIcon : collapsedIcon}
        onClick={onToggle}
      />
    )
  },
)

export const getExpanderColumn = <Data extends object>(
  enabled?: boolean,
  columnDef?: ColumnDef<Data>,
) => {
  return enabled
    ? [
        {
          id: 'expand',
          header: ({ table, column }) => {
            const meta = (column.columnDef.meta || {}) as any
            return (
              <DataGridExpander
                {...meta.expanderProps}
                isExpanded={table.getIsAllRowsExpanded()}
                onToggle={table.getToggleAllRowsExpandedHandler()}
              />
            )
          },
          size: 38,
          enableSorting: false,
          meta: {
            headerProps: {
              px: 2,
            },
            cellProps: {
              px: 2,
              textOverflow: 'initial',
              ps: 'calc(calc(var(--data-grid-row-depth) + 1) * 0.5rem)',
            },
          },
          cell: ({ row, column }) => {
            const meta = (column.columnDef.meta || {}) as any
            return row.getCanExpand() ? (
              <DataGridExpander
                {...meta.expanderProps}
                isExpanded={row.getIsExpanded()}
                onToggle={row.getToggleExpandedHandler()}
              />
            ) : null
          },
          ...columnDef,
        } as ColumnDef<Data>,
      ]
    : []
}
