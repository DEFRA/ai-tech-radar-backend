import {
  addRadarItem,
  getRadarItems,
  updateRadarItem
} from '~/src/repos/radar-items.js'

const radarController = {
  getHandler: async (request, h) => {
    const { db } = request

    const { quadrant } = request.params

    const items = await getRadarItems(db, { quadrant })

    if (items.length === 0) {
      return h.response().code(204)
    }

    return h.response(items).code(200)
  },
  postHandler: async (request, h) => {
    const { db } = request

    try {
      const { insertedId: id } = await addRadarItem(db, request.payload)

      return h.response({ id }).code(201)
    } catch (err) {
      if (err.type === 'CONFLICT') {
        return h.response().code(409)
      }

      throw err
    }
  },
  patchHandler: async (request, h) => {
    const { db } = request

    const { id } = request.params

    const update = request.payload

    try {
      await updateRadarItem(db, id, update)

      return h.response().code(200)
    } catch (err) {
      if (err.type === 'NOT_FOUND') {
        return h.response().code(404)
      }

      throw err
    }
  }
}

export { radarController }
