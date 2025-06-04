import { StatusCodes } from 'http-status-codes'

async function performHealthCheck(request, h) {
  return h.response({ message: 'success' }).code(StatusCodes.OK)
}

const health = [
  {
    method: 'GET',
    path: '/health',
    handler: performHealthCheck
  }
]

export {
  health
}
