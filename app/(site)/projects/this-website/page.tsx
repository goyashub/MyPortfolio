'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Github, ArrowLeft, Code, Database, Palette, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'

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

const techStack = [
  'Next.js 14',
  'TypeScript',
  'PostgreSQL',
  'Prisma ORM',
  'NextAuth.js',
  'Tailwind CSS',
  'Framer Motion',
  'Zod',
  'React Hook Form',
]

const features = [
  'Netflix-inspired UI with smooth animations and transitions',
  'Full-stack application with server-side rendering',
  'Admin dashboard for managing projects and categories',
  'Contact form with rate limiting and spam protection',
  'Search functionality with real-time filtering',
  'Responsive design optimized for all devices',
  'Type-safe development with TypeScript',
  'Comprehensive testing with Vitest and Playwright',
  'CI/CD pipeline with GitHub Actions',
  'Production-ready deployment configuration',
]

export default function ThisWebsitePage() {
  const router = useRouter()

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      className="min-h-screen bg-black text-white"
    >
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Button variant="ghost" onClick={() => router.back()} className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </motion.div>

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
            Shubham's Portfolio
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-6 text-2xl text-gray-400"
          >
            A Netflix-style portfolio showcasing projects and experience
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mb-8 text-lg text-gray-300"
          >
            A full-stack portfolio web application built from scratch using Next.js 14 and modern
            web technologies. The platform features a Netflix-inspired UI with smooth animations,
            dynamic project carousels, and a fully responsive design. It includes a secure admin
            dashboard for managing projects and categories, server-side rendering for performance,
            and a scalable backend with PostgreSQL and Prisma ORM. The project demonstrates strong
            expertise in full-stack development, authentication, API design, and modern React
            architecture.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mb-8"
          >
            <h2 className="mb-4 text-2xl font-semibold">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech, idx) => (
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mb-8"
          >
            <h2 className="mb-4 text-2xl font-semibold">Features</h2>
            <ul className="list-disc space-y-2 pl-6 text-lg text-gray-300">
              {features.map((feature, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.9 + idx * 0.1 }}
                >
                  {feature}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.3 }}
            className="mb-8 rounded-lg border border-gray-800 bg-gray-900/50 p-6"
          >
            <h2 className="mb-4 text-2xl font-semibold">Key Highlights</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex items-start gap-3">
                <Code className="mt-1 h-5 w-5 text-red-500" />
                <div>
                  <h3 className="font-semibold">Modern Architecture</h3>
                  <p className="text-sm text-gray-400">
                    Built with Next.js 14 App Router, server components, and API routes
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Database className="mt-1 h-5 w-5 text-red-500" />
                <div>
                  <h3 className="font-semibold">Database Design</h3>
                  <p className="text-sm text-gray-400">
                    PostgreSQL with Prisma ORM for type-safe database operations
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Palette className="mt-1 h-5 w-5 text-red-500" />
                <div>
                  <h3 className="font-semibold">Beautiful UI</h3>
                  <p className="text-sm text-gray-400">
                    Netflix-inspired design with Framer Motion animations
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Zap className="mt-1 h-5 w-5 text-red-500" />
                <div>
                  <h3 className="font-semibold">Performance</h3>
                  <p className="text-sm text-gray-400">
                    Optimized for speed with server-side rendering and image optimization
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.4 }}
            className="flex flex-wrap gap-4"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="lg" asChild>
                <a
                  href="https://github.com/shubhamgoyalz/devflix"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-2 h-5 w-5" />
                  View Source Code
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}
