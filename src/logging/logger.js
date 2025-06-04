import { pino } from 'pino'

import { loggerOptions } from './logger-options.js'

const logger = pino(loggerOptions)

const createLogger = () => {
  return logger
}

export { createLogger }
