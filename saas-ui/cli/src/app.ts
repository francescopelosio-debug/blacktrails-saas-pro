import {
  buildInstallCommand,
  buildUninstallCommand,
} from '@stricli/auto-complete'
import { buildApplication, buildRouteMap } from '@stricli/core'

import { description, name, version } from '../package.json'
import { loginCommand } from './commands/login/commands'

const routes = buildRouteMap({
  routes: {
    login: loginCommand,
    install: buildInstallCommand('cli', { bash: '__cli_bash_complete' }),
    uninstall: buildUninstallCommand('cli', { bash: true }),
  },
  docs: {
    brief: description,
    hideRoute: {
      install: true,
      uninstall: true,
    },
  },
})

export const app = buildApplication(routes, {
  name,
  versionInfo: {
    currentVersion: version,
  },
})
