'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Project } from '@prisma/client'
import { Button } from './ui/Button'

interface HeroBannerProps {
  project: Project & {
    categories: Array<{ category: { name: string; slug: string } }>
  }
}

export function HeroBanner({ project }: HeroBannerProps) {
  const router = useRouter()

  const handleLearnMore = () => {
    router.push(`/projects/${project.slug}`)
  }

  return (
    <div className="relative h-[60vh] w-full overflow-hidden">
      <Image
        src={project.heroImageUrl || project.cardImageUrl || '/placeholder.jpg'}
        alt={project.title}
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 top-0 flex flex-col justify-center p-12 md:p-24">
        <h1 className="mb-4 text-4xl font-bold text-white md:text-6xl">{project.title}</h1>
        <p className="mb-6 max-w-md text-lg text-gray-300">{project.description}</p>
        <div className="flex gap-4">
          <Button onClick={handleLearnMore} size="lg">
            Learn More
          </Button>
        </div>
      </div>
    </div>
  )
}


