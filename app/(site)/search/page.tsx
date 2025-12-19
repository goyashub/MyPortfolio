'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { ProjectCard } from '@/components/ProjectCard'
import { Project } from '@prisma/client'

function SearchContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [projects, setProjects] = useState<
    Array<Project & { categories: Array<{ category: { name: string; slug: string } }> }>
  >([])

  useEffect(() => {
    async function searchProjects() {
      const res = await fetch('/api/projects')
      const allProjects = await res.json()
      const filtered = allProjects.filter((project: Project) => {
        const searchLower = query.toLowerCase()
        return (
          project.title.toLowerCase().includes(searchLower) ||
          project.description.toLowerCase().includes(searchLower) ||
          project.tagline.toLowerCase().includes(searchLower) ||
          project.techStack.some((tech) => tech.toLowerCase().includes(searchLower))
        )
      })
      setProjects(filtered)
    }

    if (query) {
      searchProjects()
    } else {
      setProjects([])
    }
  }, [query])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">
        {query ? `Search results for "${query}"` : 'Search Projects'}
      </h1>
      {projects.length === 0 ? (
        <p className="text-gray-400">No projects found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-8">Loading...</div>}>
      <SearchContent />
    </Suspense>
  )
}


