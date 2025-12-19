'use client'

import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ProjectCard } from './ProjectCard'
import { Button } from './ui/Button'
import { Project } from '@prisma/client'

interface CarouselProps {
  title: string
  projects: Array<
    Project & {
      categories: Array<{ category: { name: string; slug: string } }>
    }
  >
}

export function Carousel({ title, projects }: CarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  if (projects.length === 0) return null

  return (
    <div className="mb-12">
      <h2 className="mb-4 text-2xl font-bold text-white">{title}</h2>
      <div className="relative">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2 hover:bg-black/70"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2 hover:bg-black/70"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}


