import { health } from './health.js'

const router = {
  plugin: {
    name: 'probes',
    async register (server) {
      server.route([
        ...health
      ])
    }
  }  
}

export default router
