import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getLoggedInUser } from './actions/auth'

const protectedRoutes = ['/middleware', '/server']

export default async function middleware(request: NextRequest) {
  const user: userDetails | null = await getLoggedInUser()

  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  )

  if (!user && isProtectedRoute) {
    const absoluteURL = new URL('/sign-in', request.nextUrl.origin)
    return NextResponse.redirect(absoluteURL.toString())
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
