import { chakra } from '@chakra-ui/react'
import { Header } from '@tanstack/react-table'
import { useDataGridIcons } from './data-grid-context'
import { ChevronDownIcon, ChevronUpIcon } from '../icons'

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

  const icons = useDataGridIcons()

  const sortDescendingIcon = icons?.sortDescending ?? <ChevronDownIcon />
  const sortAscendingIcon = icons?.sortAscending ?? <ChevronUpIcon />

  if (header.id === 'selection') {
    return null
  }

  const sorted = header.column.getIsSorted()

  if (!sorted) {
    return null
  }

  return (
    <chakra.button
      aria-label="Sort"
      tabIndex={-1}
      __css={sorterStyles}
      {...rest}
    >
      {sorted
        ? sorted === 'desc'
          ? sortDescendingIcon
          : sortAscendingIcon
        : ''}
    </chakra.button>
  )
}

DataGridSort.displayName = 'DataGridSort'
