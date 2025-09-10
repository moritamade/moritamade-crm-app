import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const { event, session } = body;

  // IMPORTANT: pass the cookies function directly (do NOT await cookies())
  const supabase = createRouteHandlerClient({ cookies });

  // writes auth cookies for password sign-in / sign-up
  await supabase.auth.setSession(session);

  return NextResponse.json({ ok: true, event: event ?? null });
}
