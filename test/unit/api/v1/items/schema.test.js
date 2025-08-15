import { describe, expect, test } from 'vitest'
import { addItemSchema } from '../../../../../src/api/v1/items/schema.js'

describe('add item schema tests', () => {
  describe('title validation', () => {
    test('should pass with valid title', () => {
      // arrange
      const payload = {
        title: 'New AI Tool',
        quadrant: 'tools',
        status: 'adopt'
      }

      // act
      const { value, error } = addItemSchema.validate(payload, {
        abortEarly: false
      })

      // assert
      expect(error).toBeFalsy()
      expect(value).toEqual({
        title: 'New AI Tool',
        quadrant: 'tools',
        status: 'adopt'
      })
    })

    test('should return error if title is missing', () => {
      // arrange
      const payload = {
        quadrant: 'tools',
        status: 'adopt'
      }

      // act
      const { error } = addItemSchema.validate(payload, {
        abortEarly: false
      })

      // assert
      expect(error).toBeDefined()
      expect(error.details).toContainEqual(expect.objectContaining({
        message: '"title" is required'
      }))
    })
  })

  describe('quadrant validation', () => {
    test.each([
      'techniques',
      'tools',
      'platforms',
      'frameworks'
    ])('should accept %s as a valid quadrant', (quadrant) => {
      // arrange
      const payload = {
        title: 'New AI Tool',
        quadrant,
        status: 'adopt'
      }

      // act
      const { value, error } = addItemSchema.validate(payload, {
        abortEarly: false
      })

      // assert
      expect(error).toBeUndefined()
      expect(value).toEqual({
        title: 'New AI Tool',
        quadrant,
        status: 'adopt'
      })
    })

    test('should return error for invalid quadrant', () => {
      // arrange
      const payload = {
        title: 'New AI Tool',
        quadrant: 'invalid',
        status: 'adopt'
      }

      // act
      const { error } = addItemSchema.validate(payload, {
        abortEarly: false
      })

      // assert
      expect(error).toBeDefined()
      expect(error.details).toContainEqual(expect.objectContaining({
        message: '"quadrant" must be one of [techniques, tools, platforms, frameworks]'
      }))
    })
  })

  describe('status validaton', () => {
    test.each([
      'adopt',
      'trial',
      'assess',
      'hold'
    ])('should accept %s as a valid status', (status) => {
      // arrange
      const payload = {
        title: 'New AI tool',
        quadrant: 'tools',
        status
      }

      // act
      const { value, error } = addItemSchema.validate(payload, {
        abortEarly: false
      })

      // assert
      expect(error).toBeUndefined()
      expect(value).toEqual({
        title: 'New AI tool',
        quadrant: 'tools',
        status
      })
    })

    test('should return error for invalid status', () => {
      // arrange
      const payload = {
        title: 'New AI tool',
        quadrant: 'tools',
        status: 'Invalid'
      }

      // act
      const { error } = addItemSchema.validate(payload, {
        abortEarly: false
      })

      // assert
      expect(error).toBeDefined()
      expect(error.details).toContainEqual(expect.objectContaining({
        message: '"status" must be one of [adopt, trial, assess, hold]'
      }))
    })
  })
})
