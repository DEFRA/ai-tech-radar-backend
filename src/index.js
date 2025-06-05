import process from 'node:process'

import { startServer } from './api/server.js'
import { createLogger } from './common/logging/logger.js'
import { setupProxy } from './common/proxy/setup-proxy.js'

setupProxy()

await startServer()

process.on('unhandledRejection', (error) => {
  const logger = createLogger()
  logger.info('Unhandled rejection')
  logger.error(error)
  process.exitCode = 1
})
