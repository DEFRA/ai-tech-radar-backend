import hapi from '@hapi/hapi'
import path from 'path'

import { createLogger } from '../common/logging/logger.js'
import { config } from '../config/index.js'
import { pulse } from './plugins/pulse.js'
import { requestLogger } from './plugins/request-logger.js'
import { requestTracing } from './plugins/request-tracing.js'

import { probes as probesRouter } from './probes/probes.js'

async function createServer () {
  const server = hapi.server({
    port: config.get('port'),
    routes: {
      validate: {
        options: {
          abortEarly: false
        }
      },
      files: {
        relativeTo: path.resolve(config.get('root'), '.public')
      },
      security: {
        hsts: {
          maxAge: 31536000,
          includeSubDomains: true,
          preload: false
        },
        xss: 'enabled',
        noSniff: true,
        xframe: true
      }
    },
    router: {
      stripTrailingSlash: true
    }
  })

  await server.register([
    requestLogger,
    requestTracing,
    pulse,
    probesRouter
  ])

  return server
}

async function startServer () {
  let server

  try {
    server = await createServer()
    await server.start()

    server.logger.info('Server started successfully')
    server.logger.info(
      `Access your backend on http://localhost:${config.get('port')}`
    )
  } catch (error) {
    const logger = createLogger()
    logger.info('Server failed to start :(')
    logger.error(error)
  }

  return server
}

export {
  startServer
}
