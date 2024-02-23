import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'
import { anatomy } from '@chakra-ui/theme-tools'

const parts = anatomy('split-page').parts('container', 'content')

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

const baseStyle = definePartsStyle({
  container: {
    position: 'relative',
    overflow: 'hidden',
  },
  content: {
    bg: 'app-background',
    display: 'flex',
    flex: 1,
    height: '100%',
  },
})

export default defineMultiStyleConfig({
  defaultProps: {
    variant: 'default',
    colorScheme: 'gray',
  },
  baseStyle,
})
