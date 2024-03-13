import { MembersSettingsPage } from '@app/features/settings/pages/members'
import { createPage } from '@app/nextjs'

const { Page, metadata } = createPage({
  title: 'Members',
  renderComponent: MembersSettingsPage,
})

export { metadata }
export default Page
