import { beforeEach, describe, expect, test } from 'vitest'

import { createServer } from '../../../../../src/server.js'

describe('health probe', () => {
  let server

  const setupServer = async () => {
    server = await createServer()

    await server.start()
  }

  describe('GET /health', () => {
    beforeEach(async () => {
      await setupServer()
    })

    test('when called, should return 200 OK with success message', async () => {
      const response = await server.inject({
        method: 'GET',
        url: '/health'
      })

      expect(response.statusCode).toBe(200)
      expect(response.result).toEqual({ message: 'success' })
    })
  })
})
