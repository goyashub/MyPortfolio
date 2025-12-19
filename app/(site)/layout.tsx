import Link from 'next/link'
import { Linkedin } from 'lucide-react'
import { SearchBar } from '@/components/ui/SearchBar'
import { Button } from '@/components/ui/Button'

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="sticky top-0 z-40 border-b border-gray-800 bg-black/80 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <Link href="/" className="text-2xl font-bold text-red-600">
            Shubham&apos;s Portfolio
          </Link>
          <div className="flex items-center gap-4">
            <SearchBar />
            <Link href="/resume">
              <Button variant="ghost">Resume</Button>
            </Link>
            <Link href="/contact">
              <Button variant="ghost">Contact</Button>
            </Link>
            <Button variant="ghost" asChild>
              <a
                href="https://www.linkedin.com/in/shubhamgoyalz"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
            </Button>
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  )
}



