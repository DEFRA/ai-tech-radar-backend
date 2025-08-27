import { router as itemsRouter } from './items/router.js'

const v1 = {
  plugin: {
    name: 'v1',
    async register (server) {
      await server.register(itemsRouter)
    }
  }
}

export {
  v1
}
