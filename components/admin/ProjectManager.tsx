'use client'

import { useState, useEffect } from 'react'
import { ProjectForm } from './ProjectForm'
import { Button } from '@/components/ui/Button'
import { Project } from '@prisma/client'

export function ProjectManager() {
  const [projects, setProjects] = useState<
    Array<Project & { categories: Array<{ category: { name: string; slug: string } }> }>
  >([])
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    const res = await fetch('/api/projects')
    const data = await res.json()
    setProjects(data)
  }

  const handleDelete = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return

    const res = await fetch(`/api/projects/${slug}`, {
      method: 'DELETE',
    })

    if (res.ok) {
      fetchProjects()
    }
  }

  return (
    <div>
      <div className="mb-4 flex justify-between">
        <h2 className="text-2xl font-bold">Projects</h2>
        <Button
          onClick={() => {
            setEditingProject(null)
            setIsFormOpen(true)
          }}
        >
          Add Project
        </Button>
      </div>

      {isFormOpen && (
        <ProjectForm
          project={editingProject}
          onClose={() => {
            setIsFormOpen(false)
            setEditingProject(null)
          }}
          onSuccess={() => {
            fetchProjects()
            setIsFormOpen(false)
            setEditingProject(null)
          }}
        />
      )}

      <div className="space-y-4">
        {projects.map((project) => (
          <div key={project.id} className="rounded-lg border border-gray-800 bg-gray-800 p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">{project.title}</h3>
                <p className="text-sm text-gray-400">{project.tagline}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditingProject(project)
                    setIsFormOpen(true)
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(project.slug)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}




