import { vi, describe, test, expect, beforeAll } from 'vitest'

import { config } from '../../../../../src/config/index.js'
import { createLogger } from '../../../../../src/logging/logger.js'
import { createServer } from '../../../../../src/server.js'
import { startServer } from '../../../../../src/api/common/helpers/start-server.js'

vi.mock('../../../../../src/logging/logger.js', () => ({
  createLogger: vi.fn().mockReturnValue({
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn()
  })
}))

vi.mock('../../../../../src/server.js', () => ({
  createServer: vi.fn()
}))

const mockLogger = createLogger()

const mockServer = {
  start: vi.fn(),
  stop: vi.fn(),
  logger: mockLogger
}

describe('#startServer', () => {
  beforeAll(async () => {
    config.set('port', 3098)

    createServer.mockResolvedValue(mockServer)
  })

  describe('When server starts', () => {
    test('Should start up server as expected', async () => {
      await startServer()

      expect(createServer).toHaveBeenCalled()

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
    beforeAll(() => {
      createServer.mockRejectedValue(Error('Server failed to start'))
    })

    test('Should log failed startup message', async () => {
      await startServer()

      expect(mockLogger.info).toHaveBeenCalledWith('Server failed to start :(')
      expect(mockLogger.error).toHaveBeenCalledWith(
        Error('Server failed to start')
      )
    })
  })
})