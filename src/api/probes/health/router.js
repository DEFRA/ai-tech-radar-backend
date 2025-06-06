import { StatusCodes } from 'http-status-codes'

async function getHealthStatus (_request, h) {
  return h.response({ message: 'success' }).code(StatusCodes.OK)
}

const router = {
  plugin: {
    name: 'health-probe',
    register (server) {
      server.route({
        method: 'GET',
        path: '/health',
        handler: getHealthStatus
      })
    }
  }
}

export {
  router
}
