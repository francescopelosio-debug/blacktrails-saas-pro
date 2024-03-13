import { OrganizationSettingsPage } from '@app/features/settings/pages/organization'
import { createPage } from '@app/nextjs'

const { Page, metadata } = createPage({
  title: 'Organization Settings',
  renderComponent: OrganizationSettingsPage,
})

export { metadata }
export default Page
