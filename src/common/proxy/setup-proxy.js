import { bootstrap } from 'global-agent'
import { ProxyAgent, setGlobalDispatcher } from 'undici'

import { config } from '../../config/index.js'
import { createLogger } from '../logging/logger.js'

const logger = createLogger()

async function setupProxy () {
  const proxyUrl = config.get('httpProxy')

  if (proxyUrl) {
    logger.info('setting up global proxies')

    setGlobalDispatcher(new ProxyAgent(proxyUrl))

    bootstrap()
    global.GLOBAL_AGENT.HTTP_PROXY = proxyUrl
  }
}

export {
  setupProxy
}
