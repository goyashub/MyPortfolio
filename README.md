# DevFlix

A Netflix-style portfolio web application built with Next.js 14, TypeScript, and PostgreSQL.

## Features

- 🎬 Netflix-inspired UI with smooth animations
- 📱 Responsive design (mobile & desktop)
- 🔍 Search and filter projects
- 🔐 Admin dashboard with CRUD operations
- 📄 Resume page with PDF download
- 📧 Contact form with rate limiting
- ✅ Full test coverage (unit + E2E)

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Database**: PostgreSQL + Prisma ORM
- **Authentication**: NextAuth.js (Credentials)
- **Validation**: Zod
- **Forms**: React Hook Form
- **Testing**: Vitest (unit) + Playwright (E2E)
- **CI/CD**: GitHub Actions

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL 15+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd MyWebsite
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your values:
- `DATABASE_URL`: Your PostgreSQL connection string
- `NEXTAUTH_SECRET`: Generate with `openssl rand -base64 32`
- `NEXTAUTH_URL`: Your app URL (e.g., `http://localhost:3000`)
- `ADMIN_EMAIL`: Admin email for login
- `ADMIN_PASSWORD`: Admin password (will be hashed on seed)

4. Set up the database:
```bash
# Generate Prisma Client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Seed database
npm run prisma:seed
```

5. Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run test` - Run unit tests
- `npm run test:e2e` - Run E2E tests
- `npm run test:e2e:ui` - Run E2E tests with UI
- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:seed` - Seed database
- `npm run prisma:studio` - Open Prisma Studio

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── (admin)/           # Admin routes
│   ├── (site)/            # Public site routes
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── admin/            # Admin components
│   └── ui/               # UI components
├── lib/                  # Utilities
│   ├── auth.ts           # NextAuth config
│   ├── db.ts             # Prisma client
│   ├── validators.ts     # Zod schemas
│   └── rate-limit.ts     # Rate limiting
├── prisma/               # Prisma files
│   ├── schema.prisma     # Database schema
│   └── seed.ts           # Seed script
└── e2e/                  # Playwright tests
```

## Deployment

### Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Set up PostgreSQL (recommended: Vercel Postgres, Supabase, or Neon)
5. Deploy!

### Environment Variables for Production

Make sure to set these in your Vercel project:

- `DATABASE_URL` - Your production PostgreSQL URL
- `NEXTAUTH_URL` - Your production URL (e.g., `https://your-app.vercel.app`)
- `NEXTAUTH_SECRET` - Generate a secure secret
- `ADMIN_EMAIL` - Your admin email
- `ADMIN_PASSWORD` - Your admin password (will be hashed on first seed)

### Database Setup

For production, you can use:
- **Vercel Postgres** (recommended for Vercel deployments)
- **Supabase** (free tier available)
- **Neon** (serverless PostgreSQL)
- **Railway** (easy setup)

After setting up your database:

1. Run migrations: `npx prisma migrate deploy`
2. Seed data: `npm run prisma:seed` (or create admin manually)

## Admin Access

Default admin credentials (change after first login):
- Email: Set via `ADMIN_EMAIL` env var (default: `admin@devflix.com`)
- Password: Set via `ADMIN_PASSWORD` env var (default: `admin123`)

**Important**: Change these in production!

## Testing

### Unit Tests
```bash
npm run test
```

### E2E Tests
```bash
# Make sure dev server is running or use the Playwright config
npm run test:e2e
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

MIT



