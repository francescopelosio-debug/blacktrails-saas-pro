import type { StorybookConfig } from '@storybook/react-vite'
import { dirname, join } from 'path'

export default {
  stories: [
    {
      directory: '../../',
      files: '*/!(node_modules)/**/*.@(mdx|stories.@(tsx))',
    },
  ],

  core: {
    builder: '@storybook/builder-vite',
  },

  addons: [
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-toolbars'),
    getAbsolutePath('@storybook/addon-viewport'),
    getAbsolutePath('@storybook/addon-docs'),
    getAbsolutePath('@storybook/addon-controls'),
    getAbsolutePath('@storybook/addon-links'),
  ],

  staticDirs: ['./static'],

  typescript: {
    reactDocgen: false,
  },

  refs: (config, { configType }) => {
    const refs = {
      '@chakra-ui/react': {
        disable: true, // Make sure Chakra gets loaded last
      },

      chakra: {
        title: 'Chakra UI',
        url: 'https://storybook.chakra-ui.com',
      },
    }
    return {
      '@saas-ui/react': {
        title: 'Saas UI',
        url: 'https://storybook.saas-ui.dev',
      },
      ...refs,
    }
  },

  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },
} satisfies StorybookConfig

function getAbsolutePath(value: string) {
  return dirname(require.resolve(join(value, 'package.json')))
}
