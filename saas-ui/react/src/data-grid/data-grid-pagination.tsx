'use client'

import * as React from 'react'

import {
  HTMLChakraProps,
  IconButton,
  IconButtonProps,
  InputProps,
  ResponsiveValue,
  ThemingProps,
  chakra,
  useMultiStyleConfig,
} from '@chakra-ui/react'
import { ButtonGroup, FormControl, FormLabel, Input } from '@chakra-ui/react'
import { callAllHandlers, cx } from '@chakra-ui/utils'

import { ChevronLeftIcon, ChevronRightIcon } from '../icons'
import { formatMessage } from '../utils/format-message'
import { useDataGridContext } from './data-grid-context'

export interface DataGridPaginationProps
  extends Omit<HTMLChakraProps<'div'>, 'onChange'>,
    Pick<ThemingProps<'SuiDataGridPagination'>, 'size'> {
  /**
   * Variant is applied to buttons
   */
  variant?: ResponsiveValue<string>
  /**
   * Callback when page index or page size changes
   */
  onChange?(props: { pageIndex: number; pageSize: number }): void
  /**
   * Child components
   */
  children?: React.ReactNode
}

export const DataGridPagination: React.FC<DataGridPaginationProps> = (
  props,
) => {
  const { className, onChange, children, size = 'sm', variant, ...rest } = props
  const { instance } = useDataGridContext()

  const state = instance.getState()

  const {
    pagination: { pageIndex, pageSize },
  } = state

  const styles = useMultiStyleConfig('SuiDataGridPagination', {
    size,
  })

  React.useEffect(() => {
    onChange?.({ pageIndex, pageSize })
  }, [pageIndex, pageSize])

  return (
    <chakra.div
      className={cx('sui-data-grid__pagination', className)}
      __css={styles.container}
      {...rest}
    >
      <DataGridPaginationPageControl size={size} />

      {children}

      <ButtonGroup ms="2" size={size} variant={variant}>
        <DataGridPaginationPreviousButton />
        <DataGridPaginationNextButton />
      </ButtonGroup>
    </chakra.div>
  )
}

export const DataGridPaginationPageControl: React.FC<Partial<InputProps>> = (
  props,
) => {
  const { instance, translations } = useDataGridContext()

  const state = instance.getState()
  const pageCount = instance.getPageCount()

  const {
    pagination: { pageIndex },
  } = state

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const page = e.target.value ? Number(e.target.value) - 1 : 0
    instance.setPageIndex(page)
  }

  return (
    <FormControl display="flex" flexDirection="row" alignItems="center">
      <FormLabel mb="0">{translations.page}</FormLabel>
      <Input
        type="number"
        value={props.value ?? pageIndex + 1}
        onChange={callAllHandlers(props.onChange, handleChange)}
        onFocus={(e) => e.target.select()}
        w="20"
        {...props}
        isDisabled={props.isDisabled ?? pageCount === 0}
      />
      <chakra.span ms="2">
        {formatMessage(translations.of, { pageCount })}
      </chakra.span>
    </FormControl>
  )
}

export const DataGridPaginationNextButton: React.FC<
  Partial<IconButtonProps>
> = (props) => {
  const { instance, translations } = useDataGridContext()
  const { nextPage } = instance

  return (
    <IconButton
      {...props}
      onClick={callAllHandlers(props.onClick, nextPage)}
      isDisabled={!instance.getCanNextPage()}
      icon={<ChevronRightIcon />}
      aria-label={translations.nextPage}
    />
  )
}

export const DataGridPaginationPreviousButton: React.FC<
  Partial<IconButtonProps>
> = (props) => {
  const { instance, translations } = useDataGridContext()
  const { previousPage } = instance

  return (
    <IconButton
      {...props}
      onClick={callAllHandlers(props.onClick, previousPage)}
      isDisabled={!instance.getCanPreviousPage()}
      icon={<ChevronLeftIcon />}
      aria-label={translations.previousPage}
    />
  )
}
