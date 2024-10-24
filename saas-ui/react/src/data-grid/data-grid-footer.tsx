import { useMemo } from 'react'

import { Td, Tfoot, Tr } from '@chakra-ui/react'
import { runIfFn } from '@chakra-ui/utils'
import { type Table, flexRender } from '@tanstack/react-table'
import type { Virtualizer } from '@tanstack/react-virtual'

import { useColumnVirtualizerPadding } from './data-grid-virtualizer'
import type { DataGridSlotProps } from './data-grid.types'
import { escapeId } from './data-grid.utils'

export interface DataGridFooterProps<Data extends object> {
  instance: Table<Data>
  slotProps?: DataGridSlotProps<Data>
  columnVirtualizer?: Virtualizer<HTMLDivElement, HTMLTableRowElement>
}

export function DataGridFooter<Data extends object>(
  props: DataGridFooterProps<Data>,
) {
  const { instance, slotProps, columnVirtualizer } = props

  const footerGroups = instance.getFooterGroups()

  const hasFooter = useMemo(
    () =>
      footerGroups.some((footerGroup) =>
        footerGroup.headers.some(
          (header) => !header.isPlaceholder && header.column.columnDef.footer,
        ),
      ),
    [footerGroups],
  )

  if (!hasFooter) return null

  const { virtualPaddingLeft, virtualPaddingRight } =
    useColumnVirtualizerPadding(columnVirtualizer)

  const virtualColumns = columnVirtualizer?.getVirtualItems()

  return (
    <Tfoot>
      {footerGroups.map((footerGroup) => {
        const headers = virtualColumns ?? footerGroup.headers

        return (
          <Tr key={footerGroup.id}>
            {virtualPaddingLeft ? (
              <th style={{ display: 'flex', width: virtualPaddingLeft }} />
            ) : null}
            {headers.map((vc) => {
              const header = 'column' in vc ? vc : footerGroup.headers[vc.index]

              const colId = escapeId(header.id)

              const footerProps = runIfFn(slotProps?.footer, {
                header,
                table: instance,
              })

              return (
                <Td
                  key={header.id}
                  flex={`1 0 calc(var(--col-${colId}-size) * 1px)`}
                  width={`calc(var(--col-${colId}-size) * 1px)`}
                  minWidth={`max(var(--col-${colId}-size) * 1px, 40px)`}
                  {...footerProps}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext(),
                      )}
                </Td>
              )
            })}
            {virtualPaddingRight ? (
              <th style={{ display: 'flex', width: virtualPaddingRight }} />
            ) : null}
          </Tr>
        )
      })}
    </Tfoot>
  )
}
