import Joi from 'joi'

import { radarController } from '~/src/api/radar/controller.js'

const radar = {
  plugin: {
    name: 'radar',
    register: async (server) => {
      server.route([
        {
          method: 'GET',
          path: '/radar/item/{quadrant?}',
          handler: radarController.getHandler
        },
        {
          method: 'POST',
          path: '/radar/item',
          options: {
            validate: {
              payload: Joi.object({
                name: Joi.string().required(),
                description: Joi.string().required(),
                quadrant: Joi.string()
                  .valid(
                    'techniques',
                    'tools',
                    'platforms',
                    'languages-and-frameworks'
                  )
                  .required(),
                ring: Joi.string()
                  .valid('adopt', 'trial', 'assess', 'hold')
                  .required()
              })
            }
          },
          handler: radarController.postHandler
        },
        {
          method: 'PATCH',
          path: '/radar/item/{id}',
          options: {
            validate: {
              payload: Joi.object({
                description: Joi.string().required(),
                quadrant: Joi.string().valid(
                  'techniques',
                  'tools',
                  'platforms',
                  'languages-and-frameworks'
                ),
                ring: Joi.string().valid('adopt', 'trial', 'assess', 'hold')
              })
            }
          },
          handler: radarController.patchHandler
        }
      ])
    }
  }
}

export { radar }
