import { describe, it, expect, beforeEach, vi } from 'vitest'
import { GET, POST } from '../projects/route'
import { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'

vi.mock('next-auth')
vi.mock('@/lib/db', () => ({
  prisma: {
    project: {
      findMany: vi.fn(),
      create: vi.fn(),
    },
  },
}))

describe('/api/projects', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('GET', () => {
    it('should return projects', async () => {
      const mockProjects = [
        {
          id: '1',
          title: 'Test Project',
          slug: 'test-project',
          categories: [],
        },
      ]

      const { prisma } = await import('@/lib/db')
      vi.mocked(prisma.project.findMany).mockResolvedValue(mockProjects as any)

      const request = new NextRequest('http://localhost:3000/api/projects')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data).toEqual(mockProjects)
    })
  })

  describe('POST', () => {
    it('should create a project when authenticated', async () => {
      vi.mocked(getServerSession).mockResolvedValue({
        user: { id: '1', email: 'admin@example.com' },
      } as any)

      const mockProject = {
        id: '1',
        title: 'New Project',
        slug: 'new-project',
        categories: [],
      }

      const { prisma } = await import('@/lib/db')
      vi.mocked(prisma.project.create).mockResolvedValue(mockProject as any)

      const request = new NextRequest('http://localhost:3000/api/projects', {
        method: 'POST',
        body: JSON.stringify({
          title: 'New Project',
          slug: 'new-project',
          tagline: 'A new project',
          description: 'Description',
          role: 'Developer',
          categoryIds: [],
        }),
      })

      const response = await POST(request)
      expect(response.status).toBe(201)
    })

    it('should return 401 when not authenticated', async () => {
      vi.mocked(getServerSession).mockResolvedValue(null)

      const request = new NextRequest('http://localhost:3000/api/projects', {
        method: 'POST',
        body: JSON.stringify({}),
      })

      const response = await POST(request)
      expect(response.status).toBe(401)
    })
  })
})



