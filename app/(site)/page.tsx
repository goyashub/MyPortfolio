'use client'

import { useEffect, useState } from 'react'
import { HeroBanner } from '@/components/HeroBanner'
import { Carousel } from '@/components/Carousel'
import { Project } from '@prisma/client'

interface Category {
  id: string
  name: string
  slug: string
  sortOrder: number
}

export default function HomePage() {
  const [featuredProject, setFeaturedProject] = useState<
    | (Project & {
        categories: Array<{ category: { name: string; slug: string } }>
      })
    | null
  >(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [projectsByCategory, setProjectsByCategory] = useState<
    Record<
      string,
      Array<Project & { categories: Array<{ category: { name: string; slug: string } }> }>
    >
  >({})

  useEffect(() => {
    async function fetchData() {
      // Fetch featured project
      const featuredRes = await fetch('/api/projects?featured=true')
      const featuredProjects = await featuredRes.json()
      if (featuredProjects.length > 0) {
        setFeaturedProject(featuredProjects[0])
      }

      // Fetch categories
      const categoriesRes = await fetch('/api/categories')
      const categoriesData = await categoriesRes.json()
      setCategories(categoriesData.sort((a: Category, b: Category) => a.sortOrder - b.sortOrder))

      // Fetch projects for each category
      const projectsMap: Record<string, any[]> = {}
      for (const category of categoriesData) {
        const projectsRes = await fetch(`/api/projects?category=${category.slug}`)
        const projects = await projectsRes.json()
        projectsMap[category.slug] = projects
      }
      setProjectsByCategory(projectsMap)
    }

    fetchData()
  }, [])

  return (
    <div>
      {featuredProject && <HeroBanner project={featuredProject} />}
      <div className="container mx-auto px-4 py-8">
        {categories.map((category) => {
          const projects = projectsByCategory[category.slug] || []
          if (projects.length === 0) return null
          return (
            <Carousel key={category.id} title={category.name} projects={projects} />
          )
        })}
      </div>
    </div>
  )
}


