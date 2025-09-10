// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */

import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

// minimal index for /projects/[id] – just send to overview
export default function ProjectIndex({ params }: any) {
  redirect(`/projects/${params.id}/overview`);
}
