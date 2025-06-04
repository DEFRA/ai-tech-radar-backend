import convict from 'convict'
import convictFormatWithValidator from 'convict-format-with-validator'

import { serverConfig } from './server.js'

convict.addFormats(convictFormatWithValidator)

const config = convict({
  ...serverConfig
})

config.validate({ allowed: 'strict' })

export { config }
