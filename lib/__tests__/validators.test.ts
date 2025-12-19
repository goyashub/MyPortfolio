import { describe, it, expect } from 'vitest'
import { projectSchema, categorySchema, contactSchema } from '../validators'

describe('Validators', () => {
  describe('projectSchema', () => {
    it('should validate a valid project', () => {
      const validProject = {
        title: 'Test Project',
        slug: 'test-project',
        tagline: 'A test project',
        description: 'This is a test project description',
        role: 'Developer',
        techStack: ['React', 'TypeScript'],
        impactBullets: ['Impact 1'],
        categoryIds: [],
      }

      const result = projectSchema.safeParse(validProject)
      expect(result.success).toBe(true)
    })

    it('should reject project without required fields', () => {
      const invalidProject = {
        title: 'Test Project',
        // missing slug, tagline, etc.
      }

      const result = projectSchema.safeParse(invalidProject)
      expect(result.success).toBe(false)
    })
  })

  describe('categorySchema', () => {
    it('should validate a valid category', () => {
      const validCategory = {
        name: 'Featured',
        slug: 'featured',
        sortOrder: 1,
      }

      const result = categorySchema.safeParse(validCategory)
      expect(result.success).toBe(true)
    })
  })

  describe('contactSchema', () => {
    it('should validate a valid contact form', () => {
      const validContact = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'This is a test message',
      }

      const result = contactSchema.safeParse(validContact)
      expect(result.success).toBe(true)
    })

    it('should reject invalid email', () => {
      const invalidContact = {
        name: 'John Doe',
        email: 'invalid-email',
        message: 'This is a test message',
      }

      const result = contactSchema.safeParse(invalidContact)
      expect(result.success).toBe(false)
    })
  })
})



