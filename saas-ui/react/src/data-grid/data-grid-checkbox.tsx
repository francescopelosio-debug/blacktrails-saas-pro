import { chakra, Checkbox, CheckboxProps, forwardRef } from '@chakra-ui/react'
import { ColumnDef } from '@tanstack/react-table'
import React from 'react'
import { useDataGridContext } from './data-grid-context'

export const getSelectionColumn = <Data extends object>(
  enabled?: boolean,
  columnDef?: ColumnDef<Data>,
) => {
  return enabled
    ? [
        {
          id: 'selection',
          size: 1,
          enableHiding: false,
          enableSorting: false,
          header: ({ table }) => (
            <DataGridCheckbox
              isChecked={table.getIsAllRowsSelected()}
              isIndeterminate={table.getIsSomeRowsSelected()}
              onChange={table.getToggleAllRowsSelectedHandler()}
              aria-label={
                table.getIsAllRowsSelected()
                  ? 'Deselect all rows'
                  : 'Select all rows'
              }
            />
          ),
          cell: ({ row }) => (
            <DataGridCheckbox
              isChecked={row.getIsSelected()}
              isIndeterminate={row.getIsSomeSelected()}
              isDisabled={!row.getCanSelect()}
              onChange={row.getToggleSelectedHandler()}
              aria-label={row.getIsSelected() ? 'Deselect row' : 'Select row'}
            />
          ),
          ...columnDef,
        } as ColumnDef<Data>,
      ]
    : []
}

export const DataGridCheckbox = forwardRef<CheckboxProps, 'input'>(
  (props, ref) => {
    const onClick = React.useCallback(
      (e: React.MouseEvent) => e.stopPropagation(),
      [],
    )

    const context = useDataGridContext()

    return (
      <chakra.div onClick={onClick}>
        <Checkbox ref={ref} colorScheme={context?.colorScheme} {...props} />
      </chakra.div>
    )
  },
)
