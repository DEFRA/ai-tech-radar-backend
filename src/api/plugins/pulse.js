import { createLogger } from '../../common/logging/logger.js'

import hapiPulse from 'hapi-pulse'

const tenSeconds = 10 * 1000

const pulse = {
  plugin: hapiPulse,
  options: {
    logger: createLogger(),
    timeout: tenSeconds
  }
}

export {
  pulse
}
