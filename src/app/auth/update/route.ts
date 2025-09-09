import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  // Expecting { event, session }
  const { event, session } = body || {};

  const store = await cookies();
  const supabase = createRouteHandlerClient({ cookies: () => store });

  // This writes the auth cookies for password sign-in / sign-up flows
  await supabase.auth.setSession(session);

  return NextResponse.json({ ok: true, event: event ?? null });
}
