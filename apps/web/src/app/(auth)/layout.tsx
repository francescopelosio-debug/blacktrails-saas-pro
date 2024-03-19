'use client'

import React from 'react'

import { useAuth } from '@saas-ui/auth'

import { AuthLayout as BaseAuthLayout } from '@app/features/common/layouts/auth-layout'
import { useRouter } from '@app/nextjs'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  React.useEffect(() => {
    if (isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated])

  return <BaseAuthLayout>{children}</BaseAuthLayout>
}
