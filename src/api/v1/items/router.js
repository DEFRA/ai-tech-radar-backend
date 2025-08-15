import { StatusCodes } from 'http-status-codes'
import { addItemSchema } from './schema.js'

function addRadarItem (request, h) {
  try {
    const createdItem = {
      id: `item-${Date.now()}`,
      ...request.payload
    }

    return h.response(createdItem)
      .code(StatusCodes.CREATED)
  } catch (error) {
    console.error('Error adding radar item:', error)
    return h.response({
      message: 'An internal server error occurred',
      error: error.message
    }).code(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const router = {
  plugin: {
    name: 'items',
    register (server) {
      server.route({
        method: 'POST',
        path: '/v1/radar/items',
        options: {
          validate: {
            failAction (_request, h, err) {
              const errors = err.details.map(e => {
                return e.message
              })
              const message = errors.join(', ')
              return h.response({ message }).code(StatusCodes.BAD_REQUEST).takeover()
            },
            payload: addItemSchema
          }
        },
        handler: addRadarItem
      })
    }
  }
}

export {
  router
}
