import React from 'react'

import {
  Checkbox,
  CheckboxProps,
  VisuallyHidden,
  chakra,
  forwardRef,
} from '@chakra-ui/react'
import { ColumnDef } from '@tanstack/react-table'

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
            />
          ),
          cell: ({ row }) => (
            <DataGridCheckbox
              isChecked={row.getIsSelected()}
              isIndeterminate={row.getIsSomeSelected()}
              isDisabled={!row.getCanSelect()}
              onChange={row.getToggleSelectedHandler()}
              isRow
            />
          ),
          ...columnDef,
        } as ColumnDef<Data>,
      ]
    : []
}

export const DataGridCheckbox = forwardRef<
  CheckboxProps & { isRow?: boolean },
  'input'
>((props, ref) => {
  const { isRow, ...rest } = props

  const onClick = React.useCallback(
    (e: React.MouseEvent) => e.stopPropagation(),
    [],
  )

  const { colorScheme, translations } = useDataGridContext()

  let label = props.isChecked
    ? translations.deselectRow
    : translations.selectRow
  if (!isRow) {
    label = props.isChecked
      ? translations.deselectAllRows
      : translations.selectAllRows
  }

  return (
    <chakra.div onClick={onClick}>
      <Checkbox ref={ref} colorScheme={colorScheme} {...rest}>
        <VisuallyHidden>{label}</VisuallyHidden>
      </Checkbox>
    </chakra.div>
  )
})
