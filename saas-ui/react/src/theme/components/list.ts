import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'
import { anatomy } from '@chakra-ui/theme-tools'

const parts = anatomy('list').parts(
  'list',
  'item',
  'button',
  'header',
  'primary',
  'secondary',
  'tertiary',
  'action',
)

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

const baseStyle = definePartsStyle({
  button: {
    transitionProperty: 'common',
    transitionDuration: 'normal',
    _hover: {
      bg: 'blackAlpha.100',
      _dark: {
        bg: 'whiteAlpha.200',
      },
    },
  },
})

const variantSettings = definePartsStyle({
  item: {
    borderBottomWidth: '1px',
    '&:last-of-type': {
      borderBottomWidth: 0,
    },
  },
  primary: {
    fontWeight: 'medium',
  },
  tertiary: {
    color: 'muted',
    fontSize: 'sm',
  },
  action: {
    color: 'muted',
    fontSize: 'xl',
  },
})

export default defineMultiStyleConfig({
  baseStyle: baseStyle,
  variants: {
    settings: variantSettings,
  },
  sizes: {
    condensed: {
      item: {
        py: 1,
      },
      label: {
        p: 0,
      },
    },
  },
})
