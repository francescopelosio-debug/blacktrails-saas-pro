import { Cell, Row, RowData, Table } from '@tanstack/react-table'
import React from 'react'

interface FocusState {
  row: number
  column: number
}

// https://github.com/cityofasheville/accessible-react-table/blob/master/src/index.js

// https://codepen.io/pen
// https://w3c.github.io/aria-practices/examples/grid/dataGrids.html

export interface FocusModelProps<TData extends RowData> {
  mode?: 'cell' | 'row' | 'none'
  table: Table<TData>
  rootRef?: React.RefObject<HTMLDivElement | HTMLTableElement>
}

export interface FocusModelOptions<TData extends RowData> {
  mode?: 'cell' | 'row' | 'none'
  table: Table<TData>
  onFocusChange?: (focus: FocusState) => void
}

const GRID_SELECTORS = 'table, [role="grid"]'
const ROW_SELECTORS = 'tr, [role="row"]'
const CELL_SELECTORS = 'td, [role="gridcell"]'
const FOCUSABLE_SELECTORS = 'a, button, input, textarea, select, [tabindex]'

const closest = (target: HTMLElement | EventTarget, selector: string) => {
  const el = target as HTMLElement
  if (el.matches(selector)) {
    return el
  }
  return el.closest(selector)
}

const matches = (target: HTMLElement | EventTarget, selector: string) => {
  const el = target as HTMLElement
  return el.matches(selector)
}

class FocusModel<TData extends RowData> {
  #focusedRow = 0
  #focusedCol = 0

  #initialSelectedRow: number | null = null

  constructor(
    public gridEl: HTMLElement,
    private options: FocusModelOptions<TData>,
  ) {
    this.gridEl?.addEventListener('click', this.handleClick)
    this.gridEl?.addEventListener('keydown', this.handleKeyDown)
  }

  handleClick = (e: MouseEvent) => {
    const target = e.target as EventTarget

    const mode = this.options.mode

    const row = closest(target, ROW_SELECTORS) as HTMLTableRowElement

    if (!row || row.dataset.row === undefined) {
      return
    }

    const rowIndex = Number.parseInt(row.dataset.row)

    if (mode === 'row') {
      row.focus()
      this.setFocusedRow(rowIndex)
    } else if (mode === 'cell') {
      const cell = closest(target, CELL_SELECTORS) as HTMLTableCellElement

      if (!cell) {
        return
      }

      const colIndex = Array.from(row.querySelectorAll(CELL_SELECTORS)).indexOf(
        cell,
      )

      cell.focus()
      this.setFocusedCol(rowIndex, colIndex)
    }
  }

  handleKeyDown = (e: KeyboardEvent) => {
    const target = e.target as HTMLElement
    let focusedRow = this.#focusedRow
    let focusedCol = this.#focusedCol

    const mode = this.options.mode
    const table = this.options.table

    const keyMap: Record<KeyboardEvent['key'], () => void> = {
      ArrowDown: () => {
        if (!this.isValidRow(focusedRow + 1)) {
          return
        }

        if (e.shiftKey) {
          console.log(table.getState().rowSelection)
          if (!this.hasSelectedRows()) {
            this.#initialSelectedRow = focusedRow
            table.getRowModel().rows[focusedRow].toggleSelected(true)
            console.log('selecting row', focusedRow)
            return
          }

          this.selectRows(this.#initialSelectedRow!, focusedRow + 1)
        }

        focusedRow += 1
      },
      ArrowUp: () => {
        if (!this.isValidRow(focusedRow - 1)) {
          return
        }

        if (e.shiftKey) {
          if (!this.hasSelectedRows()) {
            this.#initialSelectedRow = focusedRow
            table.getRowModel().rows[focusedRow].toggleSelected(true)
            console.log('selecting row', focusedRow)
            return
          }

          this.selectRows(this.#initialSelectedRow!, focusedRow + 1)
        }

        focusedRow -= 1
      },
      Tab: () => {
        if (e.shiftKey) {
          if (mode === 'cell' && this.isValidCell(focusedRow, focusedCol - 1)) {
            focusedCol -= 1
          } else if (this.isValidRow(focusedRow - 1)) {
            focusedRow -= 1
          }
        } else {
          if (mode === 'cell' && this.isValidCell(focusedRow, focusedCol + 1)) {
            focusedCol += 1
          } else if (this.isValidRow(focusedRow + 1)) {
            focusedRow += 1
          }
        }
      },
      ArrowRight: () => {
        if (mode === 'cell' && this.isValidCell(focusedRow, focusedCol + 1)) {
          focusedCol += 1
        } else if (mode === 'row') {
          table.getRowModel().rows[focusedRow].toggleExpanded(true)
        }
      },
      ArrowLeft: () => {
        if (mode === 'cell' && this.isValidCell(focusedRow, focusedCol - 1)) {
          focusedCol -= 1
        } else if (mode === 'row') {
          this.options.table
            .getRowModel()
            .rows[focusedRow].toggleExpanded(false)
        }
      },
      Home: () => {
        if (mode === 'cell') {
          focusedCol = 0
        }

        if (e.ctrlKey || mode === 'row') {
          focusedRow = 0
        }
      },
      // space
      ' ': () => {
        const row = table.getRowModel().rows[focusedRow]
        if (row.getCanSelect()) {
          row.toggleSelected(!row.getIsSelected())
        }
      },
      Enter: () => {
        const el =
          target.querySelector<HTMLElement>(FOCUSABLE_SELECTORS) ?? target
        el?.click()
      },
    }

    keyMap[e.key]?.()

    mode === 'cell'
      ? this.setFocusedCol(focusedRow, focusedCol)
      : this.setFocusedRow(focusedRow)

    e.preventDefault() // prevent scrolling
  }

  setFocusedRow(row: number) {
    this.gridEl
      ?.querySelector<HTMLTableRowElement>(`[data-row="${row}"]`)
      ?.focus()

    this.#focusedRow = row

    this.options.onFocusChange?.({ row, column: 0 })
  }

  setFocusedCol(row: number, col: number) {
    this.gridEl
      ?.querySelector<HTMLTableCellElement>(
        `[data-row="${this.#focusedRow}"] > [data-col="${col}"]`,
      )
      ?.focus()

    this.#focusedRow = row
    this.#focusedCol = col

    this.options.onFocusChange?.({ row, column: 0 })
  }

  isValidRow(row: number) {
    return !!this.gridEl?.querySelector<HTMLTableRowElement>(
      `[data-row="${row}"]`,
    )
  }

  isValidCell(row: number, col: number) {
    return !!this.gridEl?.querySelector<HTMLTableCellElement>(
      `[data-row="${row}"] > [data-col="${col}"]`,
    )
  }

  hasSelectedRows() {
    return !!Object.keys(this.options.table.getState().rowSelection).length
  }

  selectRows(start: number, end?: number) {
    const rows = this.options.table.getRowModel().rows

    if (!end) {
      rows[start].toggleSelected(true)
      return
    }

    const selectIds = rows
      .slice(start, end + 1)
      .map((row) => row.id)
      .filter(Boolean)

    const deselectedIds = rows
      .slice(start, end + 1)
      .map((row) => row.id)
      .filter(Boolean)

    this.options.table.setRowSelection((selections) => {
      for (const id of selectIds) {
        selections[id] = true
      }

      for (const id of deselectedIds) {
        delete selections[id]
      }

      return selections
    })
  }

  get focusedRow() {
    return this.#focusedRow
  }

  get focusedCol() {
    return this.#focusedCol
  }

  destroy() {
    this.gridEl?.removeEventListener('click', this.handleClick)
    this.gridEl?.removeEventListener('keydown', this.handleKeyDown)
  }
}

export const useFocusModel = <TData extends RowData>(
  props: FocusModelProps<TData>,
) => {
  const { mode = 'row', table } = props

  const gridRef = React.useRef<HTMLTableElement | HTMLDivElement>(null)

  const [focus, setFocus] = React.useState<FocusState>({
    row: 0,
    column: 0,
  })

  React.useEffect(() => {
    if (!gridRef.current) {
      return
    }

    const focusModel = new FocusModel(gridRef.current, {
      mode,
      table,
      onFocusChange: (state) => {
        console.log('setFocus', state)
        setFocus(state)
      },
    })
    return () => {
      focusModel?.destroy()
    }
  }, [])

  const getCellProps = React.useCallback((cell: Cell<TData, any>) => {
    console.log('render cell')
    if (mode !== 'cell') {
      return
    }

    const visibleColumns = table.getVisibleFlatColumns()
    const columnIndex = visibleColumns.findIndex(
      (col) => col.id === cell.column.id,
    )

    const isFocused = (row: number, column: number) =>
      row === focus.row && column === focus.column

    return {
      tabIndex: isFocused(cell.row.index, columnIndex) ? 0 : -1,
      ['data-col']: columnIndex,
    }
  }, [])

  const getRowProps = React.useCallback((row: Row<TData>) => {
    const rowIndex = table.getRowModel().rows.indexOf(row)

    if (mode === 'cell') {
      return {
        'data-row': rowIndex,
      }
    } else if (mode !== 'row') {
      return
    }

    return {
      tabIndex: rowIndex === focus.row ? 0 : -1,
      ['data-row']: rowIndex,
    }
  }, [])

  return {
    getCellProps,
    getRowProps,
    gridRef,
  }
}
