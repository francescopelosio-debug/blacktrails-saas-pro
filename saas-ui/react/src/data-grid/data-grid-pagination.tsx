'use client'

import * as React from 'react'

import {
  HTMLChakraProps,
  IconButton,
  SystemStyleObject,
  chakra,
  useMultiStyleConfig,
} from '@chakra-ui/react'
import { ButtonGroup, FormControl, FormLabel, Input } from '@chakra-ui/react'
import { cx } from '@chakra-ui/utils'

import { ChevronLeftIcon, ChevronRightIcon } from '../icons'
import { formatMessage } from '../utils/format-message'
import { useDataGridContext } from './data-grid-context'

export interface DataGridPaginationTranslations {
  /**
   * @default 'Page'
   */
  page: string
  /**
   * @default 'of {pageCount}'
   */
  of: string
  /**
   * @default 'Next page'
   */
  nextPage: string
  /**
   * @default 'Previous page'
   */
  previousPage: string
}

export interface DataGridPaginationProps
  extends Omit<HTMLChakraProps<'div'>, 'onChange'> {
  onChange?(props: { pageIndex: number; pageSize: number }): void
  translations?: DataGridPaginationTranslations
}

const defaultTranslations: DataGridPaginationTranslations = {
  page: 'Page',
  of: 'of {pageCount}',
  nextPage: 'Next page',
  previousPage: 'Previous page',
}

export const DataGridPagination: React.FC<DataGridPaginationProps> = (
  props,
) => {
  const { className, onChange, translations, ...rest } = props
  const { instance } = useDataGridContext()

  const state = instance.getState()

  const {
    pagination: { pageIndex, pageSize },
  } = state

  const styles = useMultiStyleConfig('SuiDataGridPagination', props) as Record<
    string,
    SystemStyleObject
  >

  const { nextPage, previousPage } = instance

  const pageCount = instance.getPageCount()

  const containerStyles = {
    px: 4,
    py: 2,
    display: 'flex',
    flexDirection: 'row',
    ...styles.container,
  }

  React.useEffect(() => {
    onChange?.({ pageIndex, pageSize })
  }, [pageIndex, pageSize])

  const messages = { ...defaultTranslations, ...translations }

  return (
    <chakra.div
      className={cx('sui-data-grid__pagination', className)}
      __css={containerStyles}
      {...rest}
    >
      <FormControl display="flex" flexDirection="row" alignItems="center">
        <FormLabel mb="0">{messages.page}</FormLabel>
        <Input
          type="number"
          value={pageIndex + 1}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0
            instance.setPageIndex(page)
          }}
          onFocus={(e) => e.target.select()}
          w="20"
          size="sm"
          isDisabled={pageCount === 0}
        />
        <chakra.span ms="2">
          {' '}
          {formatMessage(messages.of, { pageCount })}
        </chakra.span>
      </FormControl>

      <ButtonGroup ms="2">
        <IconButton
          onClick={previousPage}
          isDisabled={!instance.getCanPreviousPage()}
          icon={<ChevronLeftIcon />}
          aria-label={messages.previousPage}
        />
        <IconButton
          onClick={nextPage}
          isDisabled={!instance.getCanNextPage()}
          icon={<ChevronRightIcon />}
          aria-label={messages.nextPage}
        />
      </ButtonGroup>
    </chakra.div>
  )
}
