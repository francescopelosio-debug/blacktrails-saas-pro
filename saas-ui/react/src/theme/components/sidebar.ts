import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'
import { anatomy } from '@chakra-ui/theme-tools'

const parts = anatomy('sidebar').parts('container', 'section')

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

const baseStyle = definePartsStyle((props) => {
  const { colorScheme: c } = props

  const bg = c ? `${c}.500` : 'sidebar-background'

  return {
    container: {
      bg,
      color: 'sidebar-text',
      '&, & *, & *::before, & &::after': {
        borderColor: 'sidebar-border-color',
      },
      _dark: {
        bg,
      },
    },
  }
})

export default defineMultiStyleConfig({
  baseStyle,
})
