import { PlansPage } from '@app/features/settings/pages/plans'
import { createPage } from '@app/nextjs'

const { Page, metadata } = createPage({
  title: 'Plans',
  renderComponent: PlansPage,
})

export { metadata }
export default Page
