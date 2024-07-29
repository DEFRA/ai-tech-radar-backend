import { ObjectId } from 'mongodb'
import { RadarHistoryItem, RadarItem } from '../models/radar-item.js'

const radarCollection = 'radar-items'

function createInsert(item) {
  const now = new Date()

  return {
    ...item,
    createdAt: item.createdAt ?? now,
    updatedAt: now,
    history: []
  }
}

async function addRadarItem(db, item) {
  const radar = db.collection(radarCollection)

  const enriched = createInsert(item)

  try {
    const result = await radar.insertOne(enriched)

    return result
  } catch (err) {
    const error = new Error('Failed to add radar item: ', err)

    if (err.code === 11000) {
      error.type = 'CONFLICT'
    }

    throw error
  }
}

async function getRadarItemById(db, id) {
  const radar = db.collection(radarCollection)

  const query = {
    _id: new ObjectId.createFromHexString(id)
  }

  let item

  try {
    item = await radar.findOne(query)
  } catch (err) {
    throw new Error('Failed to get radar item: ', err)
  }

  if (!item) {
    const error = new Error('Radar item not found')

    error.type = 'NOT_FOUND'

    throw error
  }

  item.id = item._id

  return RadarItem.fromObject(item)
}

async function getRadarItems(db, query) {
  const radar = db.collection(radarCollection)

  try {
    const result = await radar.find(query).toArray()

    const items = result.map((item) => new RadarItem.fromObject(item))

    return items
  } catch (err) {
    throw new Error('Failed to get radar items: ', err)
  }
}

async function updateRadarItem(db, id, update) {
  const curr = await getRadarItemById(db, id)

  const fields = ['description', 'quadrant', 'ring']

  const unchanged = fields.every((f) => {
    return !update[f] || curr[f] === update[f]
  })

  if (unchanged) {
    return
  }

  const updatedAt = new Date()

  const item = new RadarHistoryItem(
    curr.description,
    curr.quadrant,
    curr.ring,
    updatedAt
  )

  const updateQuery = {
    $set: {
      ...update,
      updatedAt
    },
    $push: {
      history: {
        ...item
      }
    }
  }

  try {
    const radar = db.collection(radarCollection)

    const query = {
      _id: new ObjectId.createFromHexString(id)
    }

    const result = await radar.updateOne(query, updateQuery)

    return result
  } catch (err) {
    throw new Error('Failed to update radar item: ', err)
  }
}

export { addRadarItem, getRadarItems, updateRadarItem }
