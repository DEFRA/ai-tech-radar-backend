import Joi from 'joi'

const addItemSchema = Joi.object({
  title: Joi.string().required(),
  //Added additional validation on Quadrant and Status so that both fields only accept one of the four options.
  quadrant: Joi.string() // This creates a string validation that only accepts the specified values
    .valid('Techniques', 'Tools', 'Platforms', 'Frameworks')
    .required() //Ensures the field must be present
    .messages({ //Provides a custom error message when validation fails
      'any.only': 'quadrant must be one of: Techniques, Tools, Platforms, Frameworks'
    }),
  status: Joi.string()
    .valid('ADOPT', 'TRIAL', 'ASSESS', 'HOLD')
    .required()
    .messages({
      'any.only': 'status must be one of: ADOPT, TRIAL, ASSESS, HOLD'
    })
})

export { addItemSchema }

export { addItemSchema }