import { ProxyAgent, getGlobalDispatcher } from 'undici'
import { afterEach, beforeAll, describe, expect, test } from 'vitest'

import { setupProxy } from '../../../../src/common/proxy/setup-proxy.js'
import { config } from '../../../../src/config/index.js'

describe('setupProxy', () => {
  afterEach(() => {
    config.set('httpProxy', null)
  })

  describe('given the proxy environment variable is not set', () => {
    describe('when proxy setup is attempted', () => {
      beforeAll(() => {
        config.set('httpProxy', null)
      })

      test('then GLOBAL_AGENT.HTTP_PROXY should be undefined', () => {
        setupProxy()

        expect(global?.GLOBAL_AGENT?.HTTP_PROXY).toBeUndefined()
      })

      test('then undici dispatcher should not be an instance of ProxyAgent', () => {
        const undiciDispatcher = getGlobalDispatcher()
        expect(undiciDispatcher).not.toBeInstanceOf(ProxyAgent)
      })
    })
  })

  describe('given the proxy environment variable is set', () => {
    describe('when proxy setup is attempted', () => {
      beforeAll(() => {
        config.set('httpProxy', 'http://localhost:8080')
      })

      test('then GLOBAL_AGENT.HTTP_PROXY should be set to the proxy URL', () => {
        setupProxy()

        expect(global?.GLOBAL_AGENT?.HTTP_PROXY).toBe('http://localhost:8080')
      })

      test('then undici dispatcher should be an instance of ProxyAgent', () => {
        setupProxy()

        const undiciDispatcher = getGlobalDispatcher()
        expect(undiciDispatcher).toBeInstanceOf(ProxyAgent)
      })
    })
  })
})
