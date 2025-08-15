import Joi from 'joi'

const addItemSchema = Joi.object({
  title: Joi.string().required(),
  quadrant: Joi.string()
    .valid('techniques', 'tools', 'platforms', 'frameworks')
    .required()
    .messages({
      'any.only': 'quadrant must be one of: Techniques, Tools, Platforms, Frameworks'
    }),
  status: Joi.string()
    .valid('adopt', 'trial', 'assess', 'hold')
    .required()
    .messages({
      'any.only': 'status must be one of: ADOPT, TRIAL, ASSESS, HOLD'
    })
}).label('body')
  .required()
  .messages({
    'object.base': '"{#label}" must be of type object'
  })

export {
  addItemSchema
}
