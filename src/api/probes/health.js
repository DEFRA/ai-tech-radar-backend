import { StatusCodes } from 'http-status-codes'

const health = [
  {
    method: 'GET',
    path: '/health',
    handler: async (request, h) => {
      return h.response({ message: 'success' }).code(StatusCodes.OK)
    }
  }
]

export {
  health
}
