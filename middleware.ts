import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  // Check for NextAuth session cookie (adjust name if needed)
  const hasSession = req.cookies.get('next-auth.session-token') || req.cookies.get('__Secure-next-auth.session-token');
  if (!hasSession && req.nextUrl.pathname.startsWith('/dashboard')) {
    const newUrl = new URL('/login', req.nextUrl.origin);
    return NextResponse.redirect(newUrl);
  }
  return NextResponse.next();
}

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}; 