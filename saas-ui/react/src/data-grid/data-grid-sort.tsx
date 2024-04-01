import { chakra } from '@chakra-ui/react'
import { Header } from '@tanstack/react-table'

import { ChevronDownIcon, ChevronUpIcon } from '../icons'
import { useDataGridContext, useDataGridIcons } from './data-grid-context'

export interface DataGridSortProps<Data extends object, TValue> {
  header: Header<Data, TValue>
}
export const DataGridSort = <Data extends object, TValue>(
  props: DataGridSortProps<Data, TValue>,
) => {
  const { header, ...rest } = props

  const sorterStyles = {
    _focusVisible: {
      outline: 'none',
      boxShadow: 'outline',
    },
    ms: 2,
  }

  const { icons, translations } = useDataGridContext()

  const sortDescendingIcon = icons?.sortDescending ?? <ChevronDownIcon />
  const sortAscendingIcon = icons?.sortAscending ?? <ChevronUpIcon />

  if (header.id === 'selection') {
    return null
  }

  const sorted = header.column.getIsSorted()

  if (!sorted) {
    return null
  }

  const isDesc = sorted === 'desc'

  return (
    <chakra.button
      aria-label={
        isDesc ? translations.sortAscending : translations.sortDescending
      }
      tabIndex={-1}
      __css={sorterStyles}
      {...rest}
    >
      {sorted ? (isDesc ? sortDescendingIcon : sortAscendingIcon) : ''}
    </chakra.button>
  )
}

DataGridSort.displayName = 'DataGridSort'
