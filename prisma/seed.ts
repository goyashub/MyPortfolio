import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || 'admin@devflix.com' },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || 'admin@devflix.com',
      passwordHash,
    },
  })

  console.log('Created admin user:', admin.email)

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'featured' },
      update: {},
      create: {
        name: 'Featured',
        slug: 'featured',
        sortOrder: 1,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'ios-swiftui' },
      update: {},
      create: {
        name: 'iOS / SwiftUI',
        slug: 'ios-swiftui',
        sortOrder: 2,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'backend-apis' },
      update: {},
      create: {
        name: 'Backend / APIs',
        slug: 'backend-apis',
        sortOrder: 3,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'devops-cloud' },
      update: {},
      create: {
        name: 'DevOps / Cloud',
        slug: 'devops-cloud',
        sortOrder: 4,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'case-studies' },
      update: {},
      create: {
        name: 'Case Studies',
        slug: 'case-studies',
        sortOrder: 5,
      },
    }),
  ])

  console.log('Created categories:', categories.length)

  // Sample projects
  const projects = [
    {
      title: 'E-Commerce Mobile App',
      slug: 'ecommerce-mobile-app',
      tagline: 'SwiftUI-powered shopping experience',
      description: 'A modern e-commerce mobile application built with SwiftUI, featuring real-time inventory updates, secure payment processing, and seamless user experience.',
      heroImageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200',
      cardImageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400',
      galleryImageUrls: [
        'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
        'https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800',
      ],
      techStack: ['SwiftUI', 'Swift', 'Combine', 'Core Data'],
      role: 'Lead iOS Developer',
      impactBullets: [
        'Increased user engagement by 40%',
        'Reduced app crash rate by 60%',
        'Achieved 4.8+ App Store rating',
      ],
      githubUrl: 'https://github.com/example/ecommerce-app',
      liveUrl: 'https://apps.apple.com/example',
      featured: true,
      categorySlugs: ['featured', 'ios-swiftui'],
    },
    {
      title: 'RESTful API Platform',
      slug: 'restful-api-platform',
      tagline: 'Scalable Node.js backend',
      description: 'A high-performance RESTful API platform built with Node.js and Express, handling millions of requests per day with microservices architecture.',
      heroImageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200',
      cardImageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400',
      galleryImageUrls: ['https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800'],
      techStack: ['Node.js', 'Express', 'PostgreSQL', 'Redis', 'Docker'],
      role: 'Backend Architect',
      impactBullets: [
        'Handled 10M+ requests/day',
        '99.9% uptime SLA',
        'Reduced response time by 50%',
      ],
      githubUrl: 'https://github.com/example/api-platform',
      liveUrl: 'https://api.example.com',
      featured: true,
      categorySlugs: ['featured', 'backend-apis'],
    },
    {
      title: 'Cloud Infrastructure Setup',
      slug: 'cloud-infrastructure-setup',
      tagline: 'AWS multi-region deployment',
      description: 'Designed and implemented a scalable cloud infrastructure on AWS with CI/CD pipelines, auto-scaling, and disaster recovery.',
      heroImageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200',
      cardImageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400',
      galleryImageUrls: ['https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800'],
      techStack: ['AWS', 'Terraform', 'Kubernetes', 'Docker', 'GitHub Actions'],
      role: 'DevOps Engineer',
      impactBullets: [
        'Reduced deployment time by 80%',
        'Achieved zero-downtime deployments',
        'Cut infrastructure costs by 30%',
      ],
      githubUrl: 'https://github.com/example/infrastructure',
      featured: false,
      categorySlugs: ['devops-cloud'],
    },
    {
      title: 'Social Media Dashboard',
      slug: 'social-media-dashboard',
      tagline: 'Real-time analytics platform',
      description: 'A comprehensive social media management dashboard with real-time analytics, scheduling, and multi-platform support.',
      heroImageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200',
      cardImageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
      galleryImageUrls: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800'],
      techStack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'WebSockets'],
      role: 'Full-Stack Developer',
      impactBullets: [
        'Processed 1M+ posts daily',
        'Real-time updates < 100ms latency',
        'Increased user productivity by 45%',
      ],
      githubUrl: 'https://github.com/example/social-dashboard',
      liveUrl: 'https://dashboard.example.com',
      featured: false,
      categorySlugs: ['backend-apis'],
    },
    {
      title: 'Fitness Tracking App',
      slug: 'fitness-tracking-app',
      tagline: 'iOS health & wellness companion',
      description: 'An iOS app for tracking workouts, nutrition, and health metrics with beautiful visualizations and Apple Health integration.',
      heroImageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200',
      cardImageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
      galleryImageUrls: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800'],
      techStack: ['SwiftUI', 'HealthKit', 'Core Data', 'Charts'],
      role: 'iOS Developer',
      impactBullets: [
        '100K+ downloads in first month',
        '4.9 App Store rating',
        'Featured in App Store',
      ],
      githubUrl: 'https://github.com/example/fitness-app',
      liveUrl: 'https://apps.apple.com/fitness',
      featured: false,
      categorySlugs: ['ios-swiftui'],
    },
    {
      title: 'Microservices Architecture',
      slug: 'microservices-architecture',
      tagline: 'Scalable distributed system',
      description: 'Designed and implemented a microservices architecture with service mesh, API gateway, and distributed tracing.',
      heroImageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200',
      cardImageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400',
      galleryImageUrls: ['https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800'],
      techStack: ['Kubernetes', 'Docker', 'gRPC', 'Istio', 'Prometheus'],
      role: 'Platform Engineer',
      impactBullets: [
        '50+ microservices orchestrated',
        '99.99% availability',
        'Horizontal scaling to 1000+ pods',
      ],
      githubUrl: 'https://github.com/example/microservices',
      featured: false,
      categorySlugs: ['devops-cloud', 'backend-apis'],
    },
    {
      title: 'Payment Processing System',
      slug: 'payment-processing-system',
      tagline: 'Secure transaction handling',
      description: 'Built a secure payment processing system with PCI compliance, fraud detection, and multi-currency support.',
      heroImageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200',
      cardImageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400',
      galleryImageUrls: ['https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800'],
      techStack: ['Node.js', 'PostgreSQL', 'Stripe API', 'Redis', 'Jest'],
      role: 'Backend Developer',
      impactBullets: [
        'Processed $10M+ in transactions',
        'Zero security incidents',
        '99.95% transaction success rate',
      ],
      githubUrl: 'https://github.com/example/payments',
      featured: false,
      categorySlugs: ['backend-apis'],
    },
    {
      title: 'AR Shopping Experience',
      slug: 'ar-shopping-experience',
      tagline: 'Augmented reality retail',
      description: 'An iOS app using ARKit to let users visualize products in their space before purchasing.',
      heroImageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200',
      cardImageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
      galleryImageUrls: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800'],
      techStack: ['SwiftUI', 'ARKit', 'RealityKit', 'Core ML'],
      role: 'iOS AR Developer',
      impactBullets: [
        '30% increase in conversion rate',
        'Featured in WWDC',
        '5-star user reviews',
      ],
      githubUrl: 'https://github.com/example/ar-shopping',
      liveUrl: 'https://apps.apple.com/ar-shopping',
      featured: false,
      categorySlugs: ['ios-swiftui'],
    },
    {
      title: 'CI/CD Pipeline Automation',
      slug: 'cicd-pipeline-automation',
      tagline: 'GitHub Actions workflow',
      description: 'Automated CI/CD pipelines with GitHub Actions, including testing, security scanning, and multi-environment deployments.',
      heroImageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200',
      cardImageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400',
      galleryImageUrls: ['https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800'],
      techStack: ['GitHub Actions', 'Docker', 'Kubernetes', 'Terraform'],
      role: 'DevOps Engineer',
      impactBullets: [
        'Deployment time: 2 hours → 5 minutes',
        'Zero manual deployments',
        '100% test coverage enforcement',
      ],
      githubUrl: 'https://github.com/example/cicd',
      featured: false,
      categorySlugs: ['devops-cloud'],
    },
    {
      title: 'E-Commerce Case Study',
      slug: 'ecommerce-case-study',
      tagline: 'Complete platform redesign',
      description: 'A comprehensive case study documenting the complete redesign and migration of a legacy e-commerce platform to modern architecture.',
      heroImageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200',
      cardImageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400',
      galleryImageUrls: ['https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800'],
      techStack: ['Next.js', 'PostgreSQL', 'AWS', 'Docker'],
      role: 'Technical Lead',
      impactBullets: [
        '300% increase in page load speed',
        '50% reduction in server costs',
        'Zero downtime migration',
      ],
      caseStudyUrl: 'https://example.com/case-study',
      featured: true,
      categorySlugs: ['case-studies', 'featured'],
    },
  ]

  for (const projectData of projects) {
    const { categorySlugs, ...projectFields } = projectData
    const project = await prisma.project.upsert({
      where: { slug: projectData.slug },
      update: {},
      create: projectFields,
    })

    // Associate with categories
    for (const slug of categorySlugs) {
      const category = categories.find((c) => c.slug === slug)
      if (category) {
        await prisma.projectCategory.upsert({
          where: {
            projectId_categoryId: {
              projectId: project.id,
              categoryId: category.id,
            },
          },
          update: {},
          create: {
            projectId: project.id,
            categoryId: category.id,
          },
        })
      }
    }
  }

  console.log('Created projects:', projects.length)

  // Create profile
  const existingProfile = await prisma.profile.findFirst()
  if (!existingProfile) {
    await prisma.profile.create({
      data: {
        headline: 'Senior Full-Stack Engineer',
        about: 'Passionate about building scalable applications and beautiful user experiences.',
        location: 'San Francisco, CA',
        email: 'contact@devflix.com',
        githubUrl: 'https://github.com/example',
        linkedinUrl: 'https://linkedin.com/in/example',
      },
    })
  }

  console.log('Seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

