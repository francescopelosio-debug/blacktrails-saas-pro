import { dirname, join } from "path";
import { mergeConfig } from 'vite'

export default {
  stories: [
    {
      directory: '../../',
      files: '*/!(node_modules)/**/*.@(stories.@(tsx))',
    },
  ],
  addons: [
    getAbsolutePath("@storybook/addon-a11y"),
    getAbsolutePath("@storybook/addon-toolbars"),
    getAbsolutePath("@storybook/addon-viewport"),
    getAbsolutePath("@storybook/addon-controls"),
    getAbsolutePath("@saas-ui/storybook-addon"),
    '@chromatic-com/storybook'
  ],
  staticDirs: ['./static'],
  typescript: {
    reactDocgen: false,
  },
  refs: () => {
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
      '@saas-ui-pro/react': {
        title: 'Saas UI Pro',
        url: 'https://storybook.saas-ui.pro/',
      },
      '@saas-ui/react': {
        title: 'Saas UI',
        url: 'https://storybook.saas-ui.dev/',
      },
      ...refs,
    }
  },
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
  },
  docs: {},
}

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, "package.json")));
}
