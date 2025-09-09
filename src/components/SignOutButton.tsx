'use client';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export function SignOutButton() {
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        await supabase.auth.signOut();
        router.push('/login');
      }}
      className="border px-3 py-1 rounded"
    >
      Sign out
    </button>
  );
}
