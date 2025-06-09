import {
  StorageResolution,
  Unit,
  createMetricsLogger
} from 'aws-embedded-metrics'

import { config } from '../../config/index.js'
import { createLogger } from './logger.js'

async function metricsCounter (metricName, value = 1) {
  const isMetricsEnabled = config.get('isMetricsEnabled')

  if (!isMetricsEnabled) {
    return
  }

  try {
    const metricsLogger = createMetricsLogger()
    metricsLogger.putMetric(
      metricName,
      value,
      Unit.Count,
      StorageResolution.Standard
    )
    await metricsLogger.flush()
  } catch (error) {
    createLogger().error(error, error.message)
  }
}

export {
  metricsCounter
}
