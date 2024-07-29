import { health } from '~/src/api/health/index.js'
import { radar } from './radar/index.js'

const router = {
  plugin: {
    name: 'Router',
    register: async (server) => {
      // Health-check route. Used by platform to check if service is running, do not remove!
      await server.register([health])

      await server.register([radar])
    }
  }
}

export { router }
