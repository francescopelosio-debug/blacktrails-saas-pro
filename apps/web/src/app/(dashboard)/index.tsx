'use client'

import { useAuth } from '@saas-ui/auth'
import { LoadingOverlay, LoadingSpinner } from '@saas-ui/react'
import { HomePage as MarketingHomePage } from 'marketing/pages/home'

import { HomePage } from '@app/features/organizations/pages/home'

export const IndexPage = () => {
  const { isAuthenticated, isLoggingIn } = useAuth()

  if (isLoggingIn) {
    return (
      <LoadingOverlay variant="fullscreen">
        <LoadingSpinner />
      </LoadingOverlay>
    )
  }

  if (isAuthenticated) {
    return <HomePage />
  }

  return <MarketingHomePage />
}
