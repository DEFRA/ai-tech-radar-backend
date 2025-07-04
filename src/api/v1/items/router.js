import { StatusCodes } from "http-status-codes"
import { addItemSchema } from "./schema.js"

function addRadarItem (request, h) {
  return h.response({ message:'Radar item added successfully.' })
    .code(StatusCodes.CREATED)
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
            failAction (request, h, err){
              const errors = err.details.map(e => {
                return e.message
              })
              const message = errors.join(', ')
              return h.response({message}).code(StatusCodes.BAD_REQUEST).takeover()
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
