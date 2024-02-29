import { Meta, StoryObj } from '@storybook/react'
import { Breadcrumbs, BreadCrumbsProps } from './breadcrumbs'

export default {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
} as Meta

type Story = StoryObj<BreadCrumbsProps>

export const Default: Story = {
  args: {
    items: [
      {
        title: 'Home',
        href: '/',
      },
      {
        title: 'Settings',
        href: '/settings',
      },
      {
        title: 'Profile',
      },
    ],
  },
}
