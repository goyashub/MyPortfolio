'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { HeroBanner } from '@/components/HeroBanner'
import { Carousel } from '@/components/Carousel'
import { Button } from '@/components/ui/Button'
import { Project } from '@prisma/client'

interface Category {
  id: string
  name: string
  slug: string
  sortOrder: number
}

export default function HomePage() {
  const router = useRouter()
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
      // Fetch featured project from "All" category
      const allProjectsRes = await fetch('/api/projects?category=all')
      const allProjects = await allProjectsRes.json()
      if (allProjects.length > 0) {
        // Get the first featured project, or first project if none are featured
        const featured = allProjects.find((p: any) => p.featured) || allProjects[0]
        setFeaturedProject(featured)
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

        {/* This Website Card */}
        <div className="mt-12">
          <h2 className="mb-4 text-2xl font-bold text-white">About This Website</h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="group relative overflow-hidden rounded-lg border-2 border-red-600/50 bg-gradient-to-br from-red-600/10 to-gray-900 p-8 transition-all hover:border-red-600 hover:shadow-2xl hover:shadow-red-600/20"
          >
            <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex-1">
                <h3 className="mb-2 text-2xl font-bold text-white">Shubham&apos;s Portfolio Website</h3>
                <p className="mb-4 text-gray-300">
                  A Netflix-style portfolio built with Next.js 14, TypeScript, and PostgreSQL.
                  Features smooth animations, admin dashboard, and full-stack functionality.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Next.js', 'TypeScript', 'PostgreSQL', 'Tailwind CSS'].map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-red-600/20 px-3 py-1 text-xs text-red-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <Button
                size="lg"
                onClick={() => router.push('/projects/this-website')}
                className="group-hover:scale-105 transition-transform"
              >
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}


