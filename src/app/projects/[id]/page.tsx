/* eslint-disable @typescript-eslint/no-explicit-any */
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

// Minimal index for /projects/[id] – redirect to overview
export default function ProjectIndex({ params }: any) {
  const id = params?.id as string | undefined;
  if (!id) return null;
  redirect(`/projects/${id}/overview`);
}
