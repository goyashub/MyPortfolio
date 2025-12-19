'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Project } from '@prisma/client'

interface ProjectCardProps {
  project: Project & {
    categories: Array<{ category: { name: string; slug: string } }>
  }
}

export function ProjectCard({ project }: ProjectCardProps) {
  const router = useRouter()

  const handleClick = () => {
    // Smooth transition with a slight delay for visual feedback
    setTimeout(() => {
      router.push(`/projects/${project.slug}`)
    }, 100)
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="group relative h-48 w-80 cursor-pointer overflow-hidden rounded-lg"
      onClick={handleClick}
    >
      <Image
        src={project.cardImageUrl || project.heroImageUrl || '/placeholder.jpg'}
        alt={project.title}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 transition-opacity group-hover:opacity-100">
        <h3 className="text-lg font-semibold text-white">{project.title}</h3>
        <p className="text-sm text-gray-300">{project.tagline}</p>
      </div>
    </motion.div>
  )
}


