import * as React from 'react'

import type { Meta } from '@storybook/react'

import { RolesMenu } from './roles-menu.js'

export default {
  title: 'Blocks/Menus/RolesMenu',
} as Meta

export const Default = () => <RolesMenu defaultValue="user" />
