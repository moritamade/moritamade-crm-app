import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // Refresh cookies / make the server aware of your session
  await supabase.auth.getSession();

  const path = req.nextUrl.pathname;
  const isProtected = path.startsWith('/dashboard') || path.startsWith('/projects');
  if (isProtected) {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      const url = new URL('/login', req.url);
      url.searchParams.set('redirectedFrom', path);
      return NextResponse.redirect(url);
    }
  }
  return res;
}

export const config = { matcher: ['/dashboard/:path*', '/projects/:path*'] };
