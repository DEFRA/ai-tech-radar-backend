import { afterEach, beforeEach, describe, expect, test } from 'vitest'

import { startServer } from '../../../../../../src/api/server.js'

describe('items v1 api', () => {
  let server

  beforeEach(async () => {
    server = await startServer()
  })

  afterEach(async () => {
    await server.stop()
  })

  describe('given POST /v1/radar/items is called', () => {
    describe('when the request is valid', () => {
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
    })

    describe('when the request is invalid', () => {
      test('then return 400 bad request with error', async () => {
        const payload = {
          title: '',
          quadrant: '',
          status: '',
        }

        const response = await server.inject({
          method: 'POST',
          url: '/v1/radar/items',
          payload
        })

        expect(response.statusCode).toBe(400)
        expect(response.result.message).toBe('"title" is not allowed to be empty, "quadrant" must be one of [techniques, tools, platforms, frameworks], "quadrant" is not allowed to be empty, "status" must be one of [adopt, trial, assess, hold], "status" is not allowed to be empty')
      })
    })
  })
})
