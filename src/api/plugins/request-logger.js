import hapiPino from 'hapi-pino'

import { loggerOptions } from '../../common/logging/logger-options.js'

const requestLogger = {
  plugin: hapiPino,
  options: loggerOptions
}

export {
  requestLogger
}
