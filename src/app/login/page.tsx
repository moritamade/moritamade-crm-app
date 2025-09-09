'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const after = params.get('redirectedFrom') || '/dashboard';

  useEffect(() => {
    let mounted = true;

    // If already signed in, go straight to destination
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (mounted && data.session) router.replace(after);
    })();

    // On ANY auth state change, set server cookies and redirect
    const { data: sub } = supabase.auth.onAuthStateChange(async (event, session) => {
      // Tell the server to set cookies for password sign-in/sign-up
      await fetch('/auth/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event, session }),
      });

      if (event === 'SIGNED_IN') router.replace(after);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, [after, router]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-semibold mb-4">Sign in</h1>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={[]}
          magicLink
          // Magic link returns to our callback which sets cookies, then forwards to `after`
          redirectTo={
            typeof window !== 'undefined'
              ? `${window.location.origin}/auth/callback?next=${encodeURIComponent(after)}`
              : undefined
          }
        />
      </div>
    </div>
  );
}
