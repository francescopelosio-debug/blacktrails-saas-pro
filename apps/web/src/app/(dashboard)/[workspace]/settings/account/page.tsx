import { AccountProfilePage } from '@app/features/settings/pages/account/index'
import { createPage } from '@app/nextjs'

const { Page, metadata } = createPage({
  title: 'Account Settings',
  renderComponent: () => <AccountProfilePage />,
})

export { metadata }
export default Page
