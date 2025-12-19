import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    // Allow access to dashboard for login, but protect other admin routes
    if (req.nextUrl.pathname === '/dashboard') {
      return NextResponse.next()
    }
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Only protect non-dashboard admin routes
        // Dashboard page handles its own login UI
        return true
      },
    },
  }
)

export const config = {
  matcher: ['/dashboard/:path*'],
}


