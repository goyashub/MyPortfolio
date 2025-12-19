'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { categorySchema } from '@/lib/validators'
import { z } from 'zod'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

type CategoryFormData = z.infer<typeof categorySchema>

export function CategoryManager() {
  const [categories, setCategories] = useState<
    Array<{ id: string; name: string; slug: string; sortOrder: number }>
  >([])
  const [editingCategory, setEditingCategory] = useState<{
    id: string
    name: string
    slug: string
    sortOrder: number
  } | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
  })

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    if (editingCategory) {
      reset(editingCategory)
    } else {
      reset({ name: '', slug: '', sortOrder: 0 })
    }
  }, [editingCategory, reset])

  const fetchCategories = async () => {
    const res = await fetch('/api/categories')
    const data = await res.json()
    setCategories(data)
  }

  const onSubmit = async (data: CategoryFormData) => {
    const url = editingCategory ? `/api/categories/${editingCategory.id}` : '/api/categories'
    const method = editingCategory ? 'PUT' : 'POST'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (res.ok) {
      fetchCategories()
      setEditingCategory(null)
      reset()
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return

    const res = await fetch(`/api/categories/${id}`, {
      method: 'DELETE',
    })

    if (res.ok) {
      fetchCategories()
    }
  }

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">Categories</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mb-6 space-y-4 rounded-lg border border-gray-800 bg-gray-800 p-4"
      >
        <div>
          <label className="mb-2 block text-sm font-medium">Name</label>
          <Input {...register('name')} />
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Slug</label>
          <Input {...register('slug')} />
          {errors.slug && <p className="mt-1 text-sm text-red-500">{errors.slug.message}</p>}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Sort Order</label>
          <Input {...register('sortOrder', { valueAsNumber: true })} type="number" />
          {errors.sortOrder && (
            <p className="mt-1 text-sm text-red-500">{errors.sortOrder.message}</p>
          )}
        </div>

        <div className="flex gap-4">
          <Button type="submit">{editingCategory ? 'Update' : 'Create'}</Button>
          {editingCategory && (
            <Button type="button" variant="outline" onClick={() => setEditingCategory(null)}>
              Cancel
            </Button>
          )}
        </div>
      </form>

      <div className="space-y-2">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex items-center justify-between rounded-lg border border-gray-800 bg-gray-800 p-4"
          >
            <div>
              <h3 className="font-semibold">{category.name}</h3>
              <p className="text-sm text-gray-400">
                Slug: {category.slug} • Order: {category.sortOrder}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setEditingCategory(category)}>
                Edit
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleDelete(category.id)}>
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}



