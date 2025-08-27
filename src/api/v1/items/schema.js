import Joi from 'joi'

const addItemSchema = Joi.object({
  title: Joi.string().required(),
  quadrant: Joi.string()
    .valid('techniques', 'tools', 'platforms', 'frameworks')
    .required(),
  status: Joi.string()
    .valid('adopt', 'trial', 'assess', 'hold')
    .required()
}).label('body')
  .required()
  .messages({
    'object.base': '"{#label}" must be of type object'
  })

export {
  addItemSchema
}
