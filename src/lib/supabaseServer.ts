import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

// Next.js 15: cookies() is async
export async function createServerSupabase() {
  const cookieStore = await cookies();
  return createServerComponentClient({ cookies: () => cookieStore });
}
