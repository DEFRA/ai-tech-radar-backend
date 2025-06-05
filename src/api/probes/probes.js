import { router as healthProbeRouter } from './health/router.js'

const probes = {
  plugin: {
    name: 'probes',
    async register (server) {
      await server.register(healthProbeRouter)
    }
  }
}

export {
  probes
}
