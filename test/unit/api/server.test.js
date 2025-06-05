import { beforeEach, describe, expect, test, vi } from 'vitest'

import { createLogger } from '../../../src/common/logging/logger.js'
import { config } from '../../../src/config/index.js'

import hapi from '@hapi/hapi'

import { startServer } from '../../../src/api/server.js'

vi.mock('../../../src/common/logging/logger.js', () => ({
  createLogger: vi.fn().mockReturnValue({
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn()
  })
}))

vi.mock('@hapi/hapi', () => {
  return {
    default: {
      server: vi.fn()
    }
  }
})

const mockLogger = createLogger()

const mockServer = {
  start: vi.fn(),
  stop: vi.fn(),
  register: vi.fn(),
  logger: mockLogger
}

describe('startServer', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    config.set('port', 3098)

    hapi.server.mockReturnValue(mockServer)
  })

  describe('When server starts', () => {
    test('Should start up server as expected', async () => {
      await startServer()

      expect(mockLogger.info).toHaveBeenNthCalledWith(
        1,
        'Server started successfully'
      )
      expect(mockLogger.info).toHaveBeenNthCalledWith(
        2,
        'Access your backend on http://localhost:3098'
      )
    })
  })

  describe('When server start fails', () => {
    test('Should log failed startup message', async () => {
      mockServer.start.mockRejectedValue(
        new Error('Server failed to start')
      )

      await startServer()

      expect(mockLogger.info).toHaveBeenCalledWith('Server failed to start :(')
      expect(mockLogger.error).toHaveBeenCalledWith(
        new Error('Server failed to start')
      )
    })
  })
})
