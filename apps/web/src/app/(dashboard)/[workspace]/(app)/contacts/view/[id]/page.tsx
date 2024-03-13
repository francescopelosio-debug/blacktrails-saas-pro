import { ContactsViewPage } from '@app/features/contacts/pages/view'
import { createPage } from '@app/nextjs'

const { Page, metadata } = createPage({
  title: 'Contact',
  renderComponent: ContactsViewPage,
})

export { metadata }
export default Page
