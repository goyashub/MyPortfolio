'use client'

import Image from 'next/image'
import { ExternalLink, Github } from 'lucide-react'
import { Modal } from './ui/Modal'
import { Button } from './ui/Button'
import { Project } from '@prisma/client'

interface ProjectModalProps {
  project: Project & {
    categories: Array<{ category: { name: string; slug: string } }>
  } | null
  isOpen: boolean
  onClose: () => void
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  if (!project) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="max-h-[80vh] overflow-y-auto">
        {project.heroImageUrl && (
          <div className="relative mb-6 h-64 w-full overflow-hidden rounded-lg">
            <Image
              src={project.heroImageUrl}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        <h2 className="mb-2 text-3xl font-bold text-white">{project.title}</h2>
        <p className="mb-4 text-xl text-gray-400">{project.tagline}</p>
        <p className="mb-6 text-gray-300">{project.description}</p>

        <div className="mb-6">
          <h3 className="mb-2 text-lg font-semibold text-white">Tech Stack</h3>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-red-600/20 px-3 py-1 text-sm text-red-400"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {project.impactBullets.length > 0 && (
          <div className="mb-6">
            <h3 className="mb-2 text-lg font-semibold text-white">Features</h3>
            <ul className="list-disc pl-6 text-gray-300">
              {project.impactBullets.map((bullet, idx) => (
                <li key={idx}>{bullet}</li>
              ))}
            </ul>
          </div>
        )}

        {project.galleryImageUrls.length > 0 && (
          <div className="mb-6">
            <h3 className="mb-4 text-lg font-semibold text-white">Gallery</h3>
            <div className="grid grid-cols-2 gap-4">
              {project.galleryImageUrls.map((url, idx) => (
                <div key={idx} className="relative h-48 w-full overflow-hidden rounded-lg">
                  <Image src={url} alt={`${project.title} ${idx + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-4">
          {project.githubUrl && (
            <Button variant="outline" asChild>
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </a>
            </Button>
          )}
          {project.caseStudyUrl && (
            <Button variant="outline" asChild>
              <a href={project.caseStudyUrl} target="_blank" rel="noopener noreferrer">
                Case Study
              </a>
            </Button>
          )}
        </div>
      </div>
    </Modal>
  )
}



