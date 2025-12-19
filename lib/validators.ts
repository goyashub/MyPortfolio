import { z } from 'zod'

export const projectSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  tagline: z.string().min(1),
  description: z.string().min(1),
  heroImageUrl: z.string().url().optional().nullable(),
  cardImageUrl: z.string().url().optional().nullable(),
  galleryImageUrls: z.array(z.string().url()).default([]),
  techStack: z.array(z.string()).default([]),
  role: z.string().default(''),
  impactBullets: z.array(z.string()).default([]),
  githubUrl: z.string().url().optional().nullable(),
  liveUrl: z.string().url().optional().nullable(),
  caseStudyUrl: z.string().url().optional().nullable(),
  featured: z.boolean().default(false),
  categoryIds: z.array(z.string()).default([]),
})

export const categorySchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  sortOrder: z.number().int().default(0),
})

export const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(10),
  honeypot: z.string().max(0).optional(), // Spam protection
})



