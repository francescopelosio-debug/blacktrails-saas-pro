import { SettingsOverviewPage } from '@app/features/settings/pages/overview'
import { createPage } from '@app/nextjs'

const { Page, metadata } = createPage({
  title: 'Organization Settings',
  renderComponent: SettingsOverviewPage,
})

export { metadata }
export default Page
