import { buildCommand, buildRouteMap } from '@stricli/core'

export const loginCommand = buildCommand({
  loader: async () => {
    const { login } = await import('./impl')
    return login
  },
  parameters: {
    positional: {
      kind: 'tuple',
      parameters: [],
    },
  },
  docs: {
    brief: 'Nested foo command',
  },
})
