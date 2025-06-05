import { StorageResolution, Unit, createMetricsLogger } from 'aws-embedded-metrics'
import { beforeEach, describe, expect, test, vi } from 'vitest'

import { createLogger } from '../../../../src/common/logging/logger.js'
import { metricsCounter } from '../../../../src/common/logging/metrics.js'
import { config } from '../../../../src/config/index.js'

vi.mock('aws-embedded-metrics', async (originalImport) => {
  const actual = await originalImport()

  return {
    ...actual,
    createMetricsLogger: vi.fn().mockReturnValue({
      putMetric: vi.fn(),
      flush: vi.fn()
    })
  }
})

vi.mock('../../../../src/common/logging/logger.js', () => ({
  createLogger: vi.fn().mockReturnValue({
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn()
  })
}))

const mockLogger = createLogger()
const mockMetricsLogger = createMetricsLogger()

const mockMetricsName = 'mock-metrics-name'
const defaultMetricsValue = 1
const mockValue = 200

describe('metrics', () => {
  describe('given metrics is not enabled', () => {
    beforeEach(() => {
      config.set('isMetricsEnabled', false)
    })

    describe('when metricsCounter() is called', () => {
      beforeEach(async () => {
        vi.clearAllMocks()
      })

      test('createMetricsLogger should not be called', async () => {
        await metricsCounter(mockMetricsName, mockValue)

        expect(createMetricsLogger).not.toHaveBeenCalled()
      })

      test('then logger should not be called', async () => {
        await metricsCounter(mockMetricsName, mockValue)

        expect(mockLogger.error).not.toHaveBeenCalled()
      })
    })
  })

  describe('given metrics is enabled', () => {
    beforeEach(() => {
      config.set('isMetricsEnabled', true)
    })

    describe('when metricsCounter() is called without value', () => {
      beforeEach(() => {
        vi.clearAllMocks()
      })

      test('then metric should be sent with default value', async () => {
        await metricsCounter(mockMetricsName)

        expect(mockMetricsLogger.putMetric).toHaveBeenCalledWith(
          mockMetricsName,
          defaultMetricsValue,
          Unit.Count,
          StorageResolution.Standard
        )
      })
    })

    describe('when metricsCounter() is called with value', () => {
      beforeEach(() => {
        vi.clearAllMocks()
      })

      test('then metric should be sent with provided value', async () => {
        await metricsCounter(mockMetricsName, mockValue)

        expect(mockMetricsLogger.putMetric).toHaveBeenCalledWith(
          mockMetricsName,
          mockValue,
          Unit.Count,
          StorageResolution.Standard
        )
      })
    })

    describe('when metricsCounter() throws', () => {
      const mockError = 'mock-metrics-put-error'

      beforeEach(() => {
        vi.clearAllMocks()
        mockMetricsLogger.putMetric.mockImplementation(() => {
          throw new Error(mockError)
        })
      })

      test('then logger should log the error', async () => {
        await metricsCounter(mockMetricsName, mockValue)

        expect(mockLogger.error).toHaveBeenCalledWith(Error(mockError), mockError)
      })
    })
  })
})
