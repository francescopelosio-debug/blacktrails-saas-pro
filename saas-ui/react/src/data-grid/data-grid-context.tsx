import React from 'react'
import { ThemingProps } from '@chakra-ui/react'
import { Table as TableInstance, TableState } from '@tanstack/react-table'

interface DataGridContextValue<Data extends object>
  extends ThemingProps<'SuiDataGrid'> {
  instance: TableInstance<Data>
  icons?: DataGridIcons
  state: TableState
}

export const DataGridContext =
  React.createContext<DataGridContextValue<any> | null>(null)

export interface DataGridProviderProps<Data extends object>
  extends ThemingProps<'SuiDataGrid'> {
  instance: TableInstance<Data>
  icons?: DataGridIcons
  children: React.ReactNode
}

export const DataGridProvider = <Data extends object>(
  props: DataGridProviderProps<Data>,
) => {
  const {
    instance,
    children,
    colorScheme,
    variant,
    size,
    icons: iconsProp,
  } = props

  const icons = React.useMemo(() => iconsProp, [])

  const context: DataGridContextValue<Data> = {
    state: instance.getState(),
    instance,
    colorScheme,
    variant,
    size,
    icons,
  }

  return (
    <DataGridContext.Provider value={context}>
      {children}
    </DataGridContext.Provider>
  )
}

export interface DataGridIcons {
  sortAscending?: React.ReactElement
  sortDescending?: React.ReactElement
  rowExpanded?: React.ReactElement
  rowCollapsed?: React.ReactElement
}

export const useDataGridContext = <Data extends object>() => {
  return React.useContext(DataGridContext) as DataGridContextValue<Data>
}

export const useDataGridIcons = () => {
  const { icons } = useDataGridContext()

  return icons
}
