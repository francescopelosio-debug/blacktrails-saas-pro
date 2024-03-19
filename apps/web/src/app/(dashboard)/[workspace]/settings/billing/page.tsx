import { BillingPage } from '@app/features/settings/pages/billing'
import { createPage } from '@app/nextjs'

const { Page, metadata } = createPage({
  title: 'Billing',
  renderComponent: BillingPage,
})

export { metadata }
export default Page
