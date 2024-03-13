import { AccountSecurityPage } from '@app/features/settings/pages/account/security'
import { createPage } from '@app/nextjs'

const { Page, metadata } = createPage({
  title: 'Security',
  renderComponent: AccountSecurityPage,
})

export { metadata }
export default Page
