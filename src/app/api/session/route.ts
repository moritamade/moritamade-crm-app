import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
export const runtime = 'nodejs';

export async function GET() {
  const supabase = createRouteHandlerClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();
  return NextResponse.json({
    hasSession: !!session,
    user: session?.user?.email ?? null,
  });
}
