import { SignupPage } from '@app/features/auth/pages/signup'
import { createPage } from '@app/nextjs'

const { Page, metadata } = createPage({
  title: 'Signup',
  renderComponent: () => {
    return <SignupPage />
  },
})

export { metadata }
export default Page
