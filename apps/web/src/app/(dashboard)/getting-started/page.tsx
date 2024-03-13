import { GettingStartedPage } from '@app/features/organizations/pages/getting-started'
import { createPage } from '@app/nextjs'

const { Page, metadata } = createPage({
  title: 'Getting started',
  renderComponent: () => {
    return <GettingStartedPage />
  },
})

export { metadata }
export default Page
