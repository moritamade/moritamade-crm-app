import { redirect } from 'next/navigation';
import { createServerSupabase } from '@/lib/supabaseServer';

export default async function Home() {
  const supabase = await createServerSupabase();
  const { data: { session } } = await supabase.auth.getSession();
  redirect(session ? '/dashboard' : '/login');
}
