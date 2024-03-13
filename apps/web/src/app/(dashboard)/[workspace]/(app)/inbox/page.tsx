import { InboxListPage } from '@app/features/contacts/pages/inbox'
import { createPage } from '@app/nextjs'

const { Page, metadata } = createPage({
  title: 'Inbox',
  renderComponent: InboxListPage,
})

export { metadata }
export default Page
