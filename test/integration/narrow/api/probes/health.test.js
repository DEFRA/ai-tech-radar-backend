import { afterEach, beforeEach, describe, expect, test } from 'vitest'

import { startServer } from '../../../../../src/api/server.js'

describe('health probe', () => {
  let server

  const setupServer = async () => {
    server = await startServer()

    await server.start()
  }

  describe('GET /health', () => {
    describe('given the service is healthy', () => {
      beforeEach(async () => {
        await setupServer()
      })

      test('should return 200 OK with success message', async () => {
        const response = await server.inject({
          method: 'GET',
          url: '/health'
        })

        expect(response.statusCode).toBe(200)
        expect(response.result).toEqual({ message: 'success' })
      })

      afterEach(async () => {
        await server.stop()
      })
    })
  })
})
