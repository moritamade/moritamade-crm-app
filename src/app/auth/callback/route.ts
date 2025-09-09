import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const runtime = 'nodejs';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get('code');
  const next = url.searchParams.get('next') ?? '/dashboard';

  if (code) {
    const store = await cookies();
    const supabase = createRouteHandlerClient({ cookies: () => store });
    await supabase.auth.exchangeCodeForSession(code); // sets server cookies
  }

  return NextResponse.redirect(new URL(next, url.origin));
}
