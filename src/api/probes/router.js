import { health } from './endpoints/health.js'

const router = {
  plugin: {
    name: 'probes',
    register: async (server) => {
      server.route([
        ...health
      ])
    }
  }  
}

export default router
