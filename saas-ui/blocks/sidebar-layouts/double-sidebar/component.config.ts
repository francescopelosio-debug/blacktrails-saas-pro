import { RegistryEntry } from '@saas-ui/registry'

export default {
  private: false,
  name: 'double-sidebar',
  description: 'Double sidebar layout.',
  version: '1.1.0',
  category: 'Application',
  subcategory: 'Layouts',
  type: 'registry:block',
  dependencies: [
    '@chakra-ui/react',
    '@chakra-ui/utils',
    '@saas-ui/react',
    'react-icons',
  ],
  files: [
    {
      path: 'blocks/settings/workspace-members-settings/workspace-members-settings.tsx',
      type: 'registry:component',
    },
    {
      path: 'blocks/settings/workspace-members-settings/workspace-members-settings.stories.tsx',
      type: 'registry:story',
    },
  ],
  canvas: {
    center: true,
  },
} satisfies RegistryEntry
