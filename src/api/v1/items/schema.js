import Joi from 'joi'

const addItemSchema = Joi.object({
  title: Joi.string().min(1).max(255).required(),
  quadrant: Joi.string().min(1).max(255).required(),
  status: Joi.string().min(1).max(55).required()
}).required()

export {
  addItemSchema
}
