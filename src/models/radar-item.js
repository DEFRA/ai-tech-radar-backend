function sortHistory(a, b) {
  return b.updatedAt - a.updatedAt
}

class RadarHistoryItem {
  constructor(description, quadrant, ring, updatedAt) {
    this.description = description
    this.quadrant = quadrant
    this.ring = ring,
    this.updatedAt = updatedAt
  }

  static fromObject(obj) {
    const {
      description,
      quadrant,
      ring,
      updatedAt
    } = obj

    return new RadarHistoryItem(description, quadrant, ring, updatedAt)
  }
}

class RadarItem {
  constructor(id, name, description, quadrant, ring, createdAt, updatedAt, history = []) {
    this.id = id
    this.name = name
    this.description = description
    this.quadrant = quadrant
    this.ring = ring
    this.createdAt = createdAt
    this.updatedAt = updatedAt
    this.history = history.sort(sortHistory)
    this.movement = this.history.length ? 'no-change' : 'new'
  }

  static fromObject(obj) {
    const {
      id,
      name,
      description,
      quadrant,
      ring,
      createdAt,
      updatedAt,
      history
    } = obj

    return new RadarItem(id, name, description, quadrant, ring, createdAt, updatedAt, history)
  }
}

export { RadarItem, RadarHistoryItem }
