import type { Router } from 'next/dist/client/router'
import type { CompletePrivateRouteInfo } from 'next/dist/shared/lib/router/router'

declare module 'next/app' {
  export declare type AppProps = Pick<
    CompletePrivateRouteInfo,
    'Component' | 'err'
  > & {
    router: Router
  } & Record<string, any> & {
      Component: {
        layout?: string | JSX.Element
        isPublic?: boolean
      }
    }
}
