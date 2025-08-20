import { afterEach, beforeEach, describe, expect, test } from 'vitest'

import { startServer } from '../../../../../../src/api/server.js'

describe('items v1 api', () => {
  let server

  const setupServer = async () => {
    server = await startServer()

    await server.start()
  }

  describe('given POST /v1/radar/items is called', () => {
    describe('when the request is valid', () => {
      beforeEach(async () => {
        await setupServer()
      })

      test('then return 201 created with the created item', async () => {
        const payload = {
          title: 'New AI Tool',
          quadrant: 'tools',
          status: 'adopt'
        }

        const response = await server.inject({
          method: 'POST',
          url: '/v1/radar/items',
          payload
        })

        expect(response.statusCode).toBe(201)
        expect(response.result).toHaveProperty('id')
        expect(response.result.title).toBe(payload.title)
        expect(response.result.quadrant).toBe(payload.quadrant)
        expect(response.result.status).toBe(payload.status)
      })

      afterEach(async () => {
        await server.stop()
      })
    })
  })
})
