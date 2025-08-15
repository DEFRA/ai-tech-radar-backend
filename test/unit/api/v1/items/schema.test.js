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
        message: 'quadrant must be one of: Techniques, Tools, Platforms, Frameworks'
      }))
    })
  })
})
