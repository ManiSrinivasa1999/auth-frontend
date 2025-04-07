import { MiddlewareConfig, NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { validateAuth } from './app/lib/validateAuth'

export const middleware = async (req: NextRequest) => {
  const cookieStore = await cookies()
  const authData = await validateAuth()
  if (
    !cookieStore.get('refresh_token') ||
    !authData ||
    !authData.success
  ) {
    const url = req.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

export const config: MiddlewareConfig = {
  matcher: '/profile',
}
