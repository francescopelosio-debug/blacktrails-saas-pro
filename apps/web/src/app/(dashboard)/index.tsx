'use client'

import { Center, Spinner } from '@chakra-ui/react'
import { useAuth } from '@saas-ui/auth'
import { HomePage as MarketingHomePage } from 'marketing/pages/home'

import { HomePage } from '@app/features/organizations/pages/home'

export const IndexPage = () => {
  const { isAuthenticated, isLoggingIn } = useAuth()

  if (isLoggingIn) {
    return (
      <Center h="$100vh">
        <Spinner />
      </Center>
    )
  }

  if (isAuthenticated) {
    return <HomePage />
  }

  return <MarketingHomePage />
}
