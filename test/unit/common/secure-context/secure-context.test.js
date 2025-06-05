import { afterAll, beforeAll, describe, expect, test, vi } from 'vitest'

import { createLogger } from '../../../../src/common/logging/logger.js'

import tls from 'node:tls'

const mockTlsCreateSecureContext = {
  context: {
    addCACert: vi.fn()
  }
}

vi.mock('../../../../src/common/logging/logger.js', () => ({
  createLogger: vi.fn().mockReturnValue({
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn()
  })
}))

const mockLogger = createLogger()

describe('secure context', () => {
  const originalEnv = { ...process.env }

  let secureContext

  describe('given secure context is disabled', () => {
    beforeAll(async () => {
      vi.resetModules()

      process.env.ENABLE_SECURE_CONTEXT = 'false'

      secureContext = await import('../../../../src/common/secure-context/secure-context.js')
    })

    describe('when secure context load is attempted', () => {
      test('then getSecureContext() should return null', () => {
        expect(secureContext.getSecureContext()).toBeNull()
      })

      test('then getSecureContext() should log a disabled message', () => {
        secureContext.getSecureContext()

        expect(mockLogger.info).toHaveBeenCalledWith(
          'Custom secure context is disabled'
        )
      })
    })

    afterAll(() => {
      process.env = { ...originalEnv }

      vi.clearAllMocks()
    })
  })

  describe('given secure context is enabled', () => {
    let secureContext
    let createSecureContextSpy

    beforeAll(async () => {
      secureContext = await import('../../../../src/common/secure-context/secure-context.js')

      createSecureContextSpy = vi.spyOn(tls, 'createSecureContext')
        .mockReturnValue(mockTlsCreateSecureContext)
    })

    describe('when single TRUSTSTORE_ cert is provided', () => {
      beforeAll(async () => {
        vi.resetModules()

        process.env.ENABLE_SECURE_CONTEXT = 'true'
        process.env.TRUSTSTORE_ONE = 'LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCm1vY2stY2VydC1kb3JpcwotLS0tLUVORCBDRVJUSUZJQ0FURS0tLS0tCg=='

        secureContext = await import('../../../../src/common/secure-context/secure-context.js')
      })

      test('then addCACert should be called once', () => {
        secureContext.getSecureContext()

        expect(mockTlsCreateSecureContext.context.addCACert).toHaveBeenCalledWith('-----BEGIN CERTIFICATE-----\nmock-cert-doris\n-----END CERTIFICATE-----')
      })

      afterAll(() => {
        process.env = { ...originalEnv }
      })
    })

    describe('when multiple TRUSTSTORE_ certs are provided', () => {
      beforeAll(async () => {
        vi.resetModules()

        process.env.ENABLE_SECURE_CONTEXT = 'true'
        process.env.TRUSTSTORE_ONE = 'LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCm1vY2stY2VydC1kb3JpcwotLS0tLUVORCBDRVJUSUZJQ0FURS0tLS0tCg=='
        process.env.TRUSTSTORE_TWO = 'LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCm1vY2stY2VydC1hbGljZQotLS0tLUVORCBDRVJUSUZJQ0FURS0tLS0tCg=='

        secureContext = await import('../../../../src/common/secure-context/secure-context.js')
      })

      test('then addCACert should be called for each cert', () => {
        secureContext.getSecureContext()

        expect(mockTlsCreateSecureContext.context.addCACert).toHaveBeenCalledWith('-----BEGIN CERTIFICATE-----\nmock-cert-doris\n-----END CERTIFICATE-----')
        expect(mockTlsCreateSecureContext.context.addCACert).toHaveBeenCalledWith('-----BEGIN CERTIFICATE-----\nmock-cert-alice\n-----END CERTIFICATE-----')
      })

      afterAll(() => {
        process.env = { ...originalEnv }
      })
    })

    describe('when no TRUSTSTORE_ certs are provided', () => {
      beforeAll(async () => {
        vi.resetModules()

        process.env.ENABLE_SECURE_CONTEXT = 'true'

        secureContext = await import('../../../../src/common/secure-context/secure-context.js')
      })

      test('then getSecureContext() should log a warning', () => {
        secureContext.getSecureContext()

        expect(mockLogger.warn).toHaveBeenCalledWith(
          'Could not find any TRUSTSTORE_ certificates'
        )
      })

      afterAll(() => {
        process.env = { ...originalEnv }
      })
    })

    afterAll(() => {
      createSecureContextSpy.mockRestore()
    })
  })
})
