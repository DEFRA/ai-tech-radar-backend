import tls from 'node:tls'

import { config } from '../../config/index.js'
import { createLogger } from '../logging/logger.js'

const logger = createLogger()

let secureContext = null

function getTrustStoreCerts () {
  const certs = []

  for (const [key, value] of Object.entries(process.env)) {
    if (key.startsWith('TRUSTSTORE_') && value) {
      const cert = Buffer.from(value, 'base64').toString().trim()

      certs.push(cert)
    }
  }

  return certs
}

function createCustomSecureContext (options = {}) {
  const trustStoreCerts = getTrustStoreCerts()

  if (!trustStoreCerts.length) {
    logger.warn('Could not find any TRUSTSTORE_ certificates')
  }

  const secureContext = tls.createSecureContext(options)

  for (const cert of trustStoreCerts) {
    secureContext.context.addCACert(cert)
  }

  return secureContext
}

function getSecureContext () {
  if (!config.get('isSecureContextEnabled')) {
    logger.info('Custom secure context is disabled')
    return null
  }

  if (!secureContext) {
    secureContext = createCustomSecureContext()
  }

  return secureContext
}

export {
  getSecureContext
}
