import { inputAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, cssVar } from '@chakra-ui/styled-system'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys)

const $height = cssVar('input-height')
const $padding = cssVar('input-padding')
const $borderRadius = cssVar('input-border-radius')
// function getDefaults(props: Record<string, any>) {
//   const { focusBorderColor: fc, errorBorderColor: ec } = props
//   return {
//     focusBorderColor: fc || mode('blue.500', 'blue.300')(props),
//     errorBorderColor: ec || mode('red.500', 'red.300')(props),
//   }
// }

// const variantOutline = definePartsStyle((props) => {
//   const { theme } = props
//   const { focusBorderColor: fc, errorBorderColor: ec } = getDefaults(props)

//   return {
//     field: {
//       border: '1px solid var(--chakra-colors-chakra-border-color)',
//       bg: 'inherit',
//       _hover: {
//         borderColor: 'gray.300',
//       },
//       _invalid: {
//         borderColor: getColor(theme, ec),
//         boxShadow: 'none',
//       },
//       _focus: {
//         borderColor: getColor(theme, fc),
//         boxShadow: 'none',
//       },
//       _focusVisible: {
//         zIndex: 1,
//         borderColor: getColor(theme, fc),
//         boxShadow: 'none',
//       },
//       _dark: {
//         bg: 'gray.900',
//         borderColor: 'chakra-border-color',
//         _hover: {
//           borderColor: 'whiteAlpha.400',
//         },
//         _invalid: {
//           borderColor: getColor(theme, ec),
//         },
//         _focus: {
//           borderColor: getColor(theme, fc),
//         },
//         _focusVisible: {
//           borderColor: getColor(theme, fc),
//         },
//       },
//     },
//     addon: {
//       borderColor: 'inherit',
//       bg: 'gray.100',
//       _dark: {
//         borderColor: 'whiteAlpha.50',
//         bg: 'whiteAlpha.300',
//       },
//     },
//   }
// })

const sizes = {
  sm: definePartsStyle({
    field: {
      [$borderRadius.variable]: 'radii.sm',
      [$height.variable]: 'sizes.8',
    },
    group: {
      [$borderRadius.variable]: 'radii.sm',
      [$height.variable]: 'sizes.8',
    },
  }),
  md: definePartsStyle({
    field: {
      [$padding.variable]: 'space.3',
      [$height.variable]: 'sizes.10',
    },
    group: {
      [$padding.variable]: 'space.3',
      [$height.variable]: 'sizes.10',
    },
  }),
}

const Input = {
  sizes,
}

export default {
  Input,
  NumberInput: Input,
  PinInput: Input,
  // Textarea: {
  //   defaultProps: Input.defaultProps,
  //   variants: {
  //     outline: defineStyle((props) => variantOutline(props).field),
  //   },
  //   sizes: {
  //     sm: sizes.sm.field,
  //     md: sizes.md.field,
  //   },
  // },
  Select: Input,
}
