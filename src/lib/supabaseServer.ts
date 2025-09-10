import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

// Keep async so existing `await createServerSupabase()` calls still work
export async function createServerSupabase() {
  // pass the cookies function directly
  return createServerComponentClient({ cookies });
}
