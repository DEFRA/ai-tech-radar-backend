import { StatusCodes } from 'http-status-codes'
import { addItemSchema } from './schema.js'

function addRadarItem (request, h) {
  try {
    // Create item with generated ID (since MongoDB persistence is out of scope)
    const createdItem = { // Receives a request containing the radar item data (title, quadrant, status)
      id: `item-${Date.now()}`, // Generates a simple ID using the current timestamp
      ...request.payload // Creates a complete item by spreading the request payload and adding the ID
    }
    
    return h.response(createdItem) // Returns the newly created item with a 201 Created status code
      .code(StatusCodes.CREATED)
  } catch (error) {
    console.error('Error adding radar item:', error)
    return h.response({
      message: 'An internal server error occurred',
      error: error.message // Returns a 500 Internal Server Error response with error details
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
           failAction (request, h, err) {
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
