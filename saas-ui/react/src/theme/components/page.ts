import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'
import { anatomy, mode } from '@chakra-ui/theme-tools'

const parts = anatomy('page').parts(
  'container',
  'headerContainer',
  'header',
  'heading',
  'headerFooter',
  'title',
  'description',
  'body',
)

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

const baseStyle = definePartsStyle({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    minH: 0,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'stretch',
    px: 4,
    minH: 14,
  },
  headerFooter: {
    py: 2,
    px: 4,
  },
  title: {
    fontWeight: 'semibold',
    fontSize: 'md',
  },
  description: {
    color: 'muted',
    fontSize: 'sm',
  },
  body: {
    flex: 1,
    overflowY: 'auto',
    p: 4,
    '& > div': {
      margin: '0 auto',
      minHeight: '100%',
      height: '1px', // hack to make sure the Loader 100% height is working
    },
  },
})

const variantDefault = definePartsStyle({
  header: {
    ps: 4,
    borderBottomWidth: '1px',
  },
  headerFooter: {
    borderBottomWidth: '1px',
  },
  title: {
    me: 4,
  },
})

const variantDefaultSidebar = definePartsStyle({
  header: {
    ps: { base: 14, lg: 4 },
    borderBottomWidth: '1px',
  },
  headerFooter: {
    borderBottomWidth: '1px',
  },
  title: {
    me: 4,
  },
})

const variantPlain = definePartsStyle({
  header: {
    ps: 4,
  },
  title: {
    me: 4,
    fontSize: 'xl',
  },
})

const variantHero = definePartsStyle((props) => {
  const { colorScheme: c } = props
  return {
    headerContainer: {
      bg: mode(`${c}.500`, `${c}.500`)(props),
    },
    header: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      borderBottomWidth: 0,
      maxW: 'container.xl',
      margin: '0 auto',
      p: { base: 8, lg: 14 },
    },
    title: {
      fontSize: '2xl',
      color: 'white',
    },
    description: {
      fontSize: 'lg',
      color: 'whiteAlpha.700',
      mb: 4,
    },
    body: {
      p: { base: 8, lg: 14 },
    },
  }
})

const variantSettings = definePartsStyle({
  container: {
    overflowY: 'auto',
    px: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    maxW: 'container.xl',
    margin: '0 auto',
    mb: 8,
    minH: 24,
    p: 0,
  },

  heading: {
    py: 8,
  },
  title: {
    fontSize: '2xl',
  },
  description: {
    fontSize: 'md',
  },
  body: {
    overflow: 'visible',
  },
})

export default defineMultiStyleConfig({
  defaultProps: {
    variant: 'default',
    colorScheme: 'gray',
  },
  baseStyle,
  variants: {
    default: variantDefault,
    'default-sidebar': variantDefaultSidebar,
    hero: variantHero,
    settings: variantSettings,
    plain: variantPlain,
  },
})
