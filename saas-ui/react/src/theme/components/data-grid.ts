import { anatomy, mode, transparentize } from '@chakra-ui/theme-tools'
import type {
  PartsStyleFunction,
  PartsStyleObject,
  SystemStyleObject,
} from '@chakra-ui/theme-tools'

const parts = anatomy('data-grid').parts(
  'container',
  'inner',
  'table',
  'thead',
  'tbody',
  'tfoot',
  'tr',
  'th',
  'td',
  'caption',
)

const numericStyles: SystemStyleObject = {
  '&[data-is-numeric=true]': {
    textAlign: 'end',
    justifyContent: 'end',
  },
}

const baseStyle: PartsStyleObject<typeof parts> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    height: '100%',
    maxWidth: '100%',
    position: 'relative',
  },
  inner: {
    flex: 1,
    maxWidth: '100%',
    overflow: 'auto',
  },
  table: {
    display: 'grid',
    fontVariantNumeric: 'lining-nums tabular-nums',
    borderCollapse: 'collapse',
    tableLayout: 'fixed',
  },
  thead: {
    display: 'grid',
    '&[data-sticky]': {
      position: 'sticky',
      top: 0,
      zIndex: 1,
      bg: 'chakra-body-bg',
    },
  },
  tbody: {
    display: 'grid',
  },
  th: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'medium',
    textAlign: 'start',
  },
  tr: {
    display: 'flex',
    width: 'full',
    _focusVisible: {
      outline: 'none',
      boxShadow: 'inset 0 0 0 2px var(--chakra-colors-purple-400)',
    },
  },
  td: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'start',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    _focus: {
      outline: 'none',
      boxShadow: 'inset 0 0 0 2px var(--chakra-colors-purple-400)',
    },
  },
  caption: {
    mt: 4,
    fontFamily: 'heading',
    textAlign: 'center',
    fontWeight: 'medium',
  },
}

const variantSimple: PartsStyleFunction<typeof parts> = (props) => {
  const { colorScheme: c, theme } = props

  return {
    th: {
      color: 'gray.600',
      borderBottom: '1px',
      borderColor: 'blackAlpha.200',
      _dark: {
        color: 'gray.400',
        borderColor: 'whiteAlpha.100',
      },
      ...numericStyles,
    },
    td: {
      ...numericStyles,
    },
    caption: {
      color: 'gray.600',
      _dark: {
        color: 'gray.400',
      },
    },
    tbody: {
      tr: {
        borderBottom: '1px',
        borderColor: 'blackAlpha.200',
        _dark: {
          borderColor: 'whiteAlpha.100',
        },
      },
      'tr[data-hover]:hover': {
        background: 'gray.50',
        _dark: {
          background: 'whiteAlpha.50',
        },
      },
      'tr[data-selected]': {
        background: `${c}.50`,
        borderColor: `${c}.100`,
        _dark: {
          background: transparentize(`${c}.500`, 0.1)(theme),
          borderColor: transparentize(`${c}.500`, 0.2)(theme),
        },
        '&[data-hover]:hover': {
          background: `${c}.100`,
          _dark: {
            background: transparentize(`${c}.500`, 0.2)(theme),
          },
        },
      },
      'tr:last-of-type': {
        border: 0,
      },
    },
    tfoot: {
      tr: {
        '&:last-of-type': {
          th: { borderBottomWidth: 0 },
        },
      },
    },
  }
}

const variantStriped: PartsStyleFunction<typeof parts> = (props) => {
  const { colorScheme: c, theme } = props

  const styles = variantSimple(props)

  return {
    ...styles,
    tbody: {
      'tr:nth-of-type(odd)': {
        'th, td': {
          borderBottomWidth: '1px',
          borderColor: 'blackAlpha.200',
          _dark: {
            borderColor: 'whiteAlpha.100',
          },
        },
        td: {
          background: `${c}.100`,
          _dark: {
            background: transparentize(`${c}.500`, 0.02)(theme),
          },
        },
      },
      ...styles.tbody,
    },
  }
}

const variants = {
  simple: variantSimple,
  striped: variantStriped,
  unstyled: {},
}

const sizes: Record<string, PartsStyleObject<typeof parts>> = {
  sm: {
    th: {
      px: '3',
      py: '2',
      lineHeight: '4',
      fontSize: 'xs',
    },
    td: {
      px: '3',
      py: '2',
      fontSize: 'sm',
      lineHeight: '4',
    },
    caption: {
      px: '3',
      py: '2',
      fontSize: 'xs',
    },
  },
  md: {
    th: {
      px: '4',
      py: '3',
      lineHeight: '4',
      fontSize: 'xs',
    },
    td: {
      px: '4',
      py: '3',
      lineHeight: '4',
    },
    caption: {
      px: '4',
      py: '2',
      fontSize: 'sm',
    },
  },
  lg: {
    th: {
      px: '6',
      py: '4',
      lineHeight: '4',
      fontSize: 'xs',
    },
    td: {
      px: '6',
      py: '4',
      lineHeight: '5',
    },
    caption: {
      px: '6',
      py: '2',
      fontSize: 'sm',
    },
  },
  xl: {
    th: {
      px: '8',
      py: '5',
      lineHeight: '5',
      fontSize: 'sm',
    },
    td: {
      px: '8',
      py: '5',
      lineHeight: '6',
    },
    caption: {
      px: '6',
      py: '2',
      fontSize: 'md',
    },
  },
}

const defaultProps = {
  variant: 'simple',
  size: 'md',
  colorScheme: 'primary',
}

export default {
  parts: parts.keys,
  baseStyle,
  sizes,
  variants,
  defaultProps,
}
