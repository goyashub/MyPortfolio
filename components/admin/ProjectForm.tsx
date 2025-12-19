'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { projectSchema } from '@/lib/validators'
import { z } from 'zod'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Project } from '@prisma/client'

type ProjectFormData = z.infer<typeof projectSchema>

interface ProjectFormProps {
  project?: Project | null
  onClose: () => void
  onSuccess: () => void
}

export function ProjectForm({ project, onClose, onSuccess }: ProjectFormProps) {
  const [categories, setCategories] = useState<Array<{ id: string; name: string }>>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: project
      ? {
          ...project,
          categoryIds: (project as any).categories?.map((pc: any) => pc.category.id) || [],
        }
      : {
          techStack: [],
          impactBullets: [],
          galleryImageUrls: [],
          categoryIds: [],
        },
  })

  useEffect(() => {
    fetchCategories()
    if (project && (project as any).categories) {
      setSelectedCategories((project as any).categories.map((pc: any) => pc.category.id))
    }
  }, [project])

  const fetchCategories = async () => {
    const res = await fetch('/api/categories')
    const data = await res.json()
    setCategories(data)
  }

  const onSubmit = async (data: ProjectFormData) => {
    const url = project ? `/api/projects/${(project as any).slug}` : '/api/projects'
    const method = project ? 'PUT' : 'POST'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, categoryIds: selectedCategories }),
    })

    if (res.ok) {
      onSuccess()
    }
  }

  const techStack = watch('techStack') || []
  const impactBullets = watch('impactBullets') || []

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg bg-gray-900 p-6">
        <h2 className="mb-4 text-2xl font-bold">
          {project ? 'Edit Project' : 'Add Project'}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium">Title</label>
            <Input {...register('title')} />
            {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Slug</label>
            <Input {...register('slug')} />
            {errors.slug && <p className="mt-1 text-sm text-red-500">{errors.slug.message}</p>}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Tagline</label>
            <Input {...register('tagline')} />
            {errors.tagline && <p className="mt-1 text-sm text-red-500">{errors.tagline.message}</p>}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Description</label>
            <textarea
              {...register('description')}
              rows={4}
              className="flex w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-100"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Hero Image URL</label>
            <Input {...register('heroImageUrl')} type="url" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Card Image URL</label>
            <Input {...register('cardImageUrl')} type="url" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Categories</label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <label key={cat.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedCategories([...selectedCategories, cat.id])
                      } else {
                        setSelectedCategories(selectedCategories.filter((id) => id !== cat.id))
                      }
                    }}
                  />
                  <span>{cat.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Tech Stack (comma-separated)</label>
            <Input
              value={techStack.join(', ')}
              onChange={(e) => {
                const stack = e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                setValue('techStack', stack)
              }}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Features (one per line)</label>
            <textarea
              value={impactBullets.join('\n')}
              onChange={(e) => {
                const bullets = e.target.value.split('\n').filter(Boolean)
                setValue('impactBullets', bullets)
              }}
              rows={4}
              className="flex w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">GitHub URL</label>
            <Input {...register('githubUrl')} type="url" />
          </div>

          <div className="flex gap-4">
            <Button type="submit">{project ? 'Update' : 'Create'}</Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}



