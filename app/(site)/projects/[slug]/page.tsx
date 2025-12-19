'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { ExternalLink, Github, ArrowLeft } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Project } from '@prisma/client'

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.98,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const contentVariants = {
  initial: {
    opacity: 0,
    y: 30,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.2,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const imageVariants = {
  initial: {
    opacity: 0,
    scale: 1.1,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export default function ProjectDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [project, setProject] = useState<
    | (Project & {
        categories: Array<{ category: { name: string; slug: string } }>
      })
    | null
  >(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProject() {
      try {
        const res = await fetch(`/api/projects/${params.slug}`)
        if (res.ok) {
          const data = await res.json()
          setProject(data)
        } else {
          router.push('/')
        }
      } catch (error) {
        console.error('Error fetching project:', error)
        router.push('/')
      } finally {
        setLoading(false)
      }
    }

    if (params.slug) {
      fetchProject()
    }
  }, [params.slug, router])

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 py-12"
      >
        <div className="flex items-center justify-center">
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-gray-400"
          >
            Loading...
          </motion.p>
        </div>
      </motion.div>
    )
  }

  if (!project) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 py-12"
      >
        <div className="flex items-center justify-center">
          <p className="text-gray-400">Project not found</p>
        </div>
      </motion.div>
    )
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={project.slug}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="min-h-screen bg-black text-white"
      >
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="mb-6"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </motion.div>

          {project.heroImageUrl && (
            <motion.div
              variants={imageVariants}
              initial="initial"
              animate="animate"
              className="relative mb-8 h-[50vh] w-full overflow-hidden rounded-lg"
            >
              <Image
                src={project.heroImageUrl}
                alt={project.title}
                fill
                priority
                className="object-cover"
              />
            </motion.div>
          )}

          <motion.div
            variants={contentVariants}
            initial="initial"
            animate="animate"
            className="mx-auto max-w-4xl"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-4 text-4xl font-bold md:text-5xl"
            >
              {project.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-6 text-2xl text-gray-400"
            >
              {project.tagline}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mb-8 text-lg text-gray-300"
            >
              {project.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mb-8"
            >
              <h2 className="mb-4 text-2xl font-semibold">Tech Stack</h2>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, idx) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.7 + idx * 0.1 }}
                    className="rounded-full bg-red-600/20 px-4 py-2 text-sm text-red-400"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {project.impactBullets.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="mb-8"
              >
                <h2 className="mb-4 text-2xl font-semibold">Features</h2>
                <ul className="list-disc space-y-2 pl-6 text-lg text-gray-300">
                  {project.impactBullets.map((bullet, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.9 + idx * 0.1 }}
                    >
                      {bullet}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}

            {project.galleryImageUrls.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.1 }}
                className="mb-8"
              >
                <h2 className="mb-6 text-2xl font-semibold">Gallery</h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {project.galleryImageUrls.map((url, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 1.2 + idx * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      className="relative h-64 w-full overflow-hidden rounded-lg"
                    >
                      <Image
                        src={url}
                        alt={`${project.title} ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.3 }}
              className="flex flex-wrap gap-4"
            >
              {project.githubUrl && (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" size="lg" asChild>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-5 w-5" />
                      GitHub
                    </a>
                  </Button>
                </motion.div>
              )}
              {project.caseStudyUrl && (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" size="lg" asChild>
                    <a href={project.caseStudyUrl} target="_blank" rel="noopener noreferrer">
                      Case Study
                    </a>
                  </Button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

