import { MongoClient } from 'mongodb'

import { config } from '../../config/index.js'
import { createLogger } from '../logging/logger.js'
import { getSecureContext } from '../secure-context/secure-context.js'

const logger = createLogger()

const secureContext = getSecureContext()

const client = await MongoClient.connect(
  config.get('mongo.uri'),
  {
    connectTimeoutMS: 10000,
    retryWrites: false,
    readPreference: 'secondary',
    ...(secureContext && { secureContext })
  }
)

const databaseClient = client.db(
  config.get('mongo.databaseName')
)

logger.info('connected to mongodb')

export { databaseClient }
