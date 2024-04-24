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
  'title',
  'resizer',
  'td',
  'caption',
)

const numericStyles: SystemStyleObject = {
  '&[data-is-numeric=true]': {
    textAlign: 'end',
    justifyContent: 'end',
  },
}

const pinnedLeftStyles: SystemStyleObject = {
  position: 'sticky',
  left: 'var(--pinned-left)',
  zIndex: 1,
  bg: 'chakra-body-bg',
  opacity: 0.95,
  '&[data-last]:after': {
    content: '""',
    position: 'absolute',
    right: '-4px',
    zIndex: 1,
    top: '-1px',
    bottom: '-1px',
    width: '4px',
    bgGradient: 'linear(to-r, blackAlpha.200, transparent)',
    pointerEvents: 'none',
  },
}

const pinnedRightStyles: SystemStyleObject = {
  position: 'sticky',
  right: 'var(--pinned-right)',
  zIndex: 1,
  bg: 'chakra-body-bg',
  opacity: 0.95,
  '&[data-last]:after': {
    content: '""',
    position: 'absolute',
    left: '-4px',
    zIndex: 1,
    top: '-1px',
    bottom: '-1px',
    width: '4px',
    bgGradient: 'linear(to-l, blackAlpha.200, transparent)',
    pointerEvents: 'none',
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
      zIndex: 2,
      bg: 'chakra-body-bg',
    },
  },
  tbody: {
    display: 'grid',
  },
  th: {
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    fontWeight: 'medium',
    textAlign: 'start',
    '&[data-pinned=left]': pinnedLeftStyles,
    '&[data-pinned=right]': pinnedRightStyles,
  },
  title: {
    display: 'flex',
    flex: 1,
    _focusVisible: {
      outline: 'none',
      boxShadow: 'inset 0 0 0 2px var(--chakra-colors-purple-400)',
    },
  },
  resizer: {
    position: 'absolute',
    right: '-8px',
    zIndex: 1,
    visibility: 'hidden',
    width: '16px',
    height: '100%',
    userSelect: 'none',
    cursor: 'col-resize',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'blackAlpha.300',
    _hover: {
      color: 'blackAlpha.500',
    },
    _dark: {
      color: 'whiteAlpha.300',
      _hover: {
        color: 'whiteAlpha.500',
      },
    },
    _before: {
      content: '""',
      display: 'block',
      width: '2px',
      height: '18px',
      cursor: 'col-resize',
      bg: 'currentColor',
    },
    'th:hover &': {
      visibility: 'visible',
    },
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
    _focus: {
      outline: 'none',
      boxShadow: 'inset 0 0 0 2px var(--chakra-colors-purple-400)',
    },
    '&[data-pinned=left]': pinnedLeftStyles,
    '&[data-pinned=right]': pinnedRightStyles,
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
    title: {
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
    title: {
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
    title: {
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
    title: {
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
