import { LoginPage } from '@app/features/auth/pages/login'
import { createPage } from '@app/nextjs'

const { Page, metadata } = createPage({
  title: 'Login',
  renderComponent: () => {
    return <LoginPage />
  },
})

export { metadata }

export default Page
