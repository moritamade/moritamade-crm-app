import Link from 'next/link';
import { db } from '@/lib/db';
import { SignOutButton } from '@/components/SignOutButton';

export const dynamic = 'force-dynamic';

export default async function Dashboard() {
  const projects = await db.project.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Projects</h1>
        <SignOutButton />
      </div>

      <ul className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <li key={p.id} className="rounded-2xl border bg-white p-4 shadow-sm">
            <div className="text-xs text-gray-500">{p.code}</div>
            <div className="text-lg font-medium">{p.name}</div>
            <div className="mt-1 text-xs text-gray-600">Status: {p.status}</div>
            <div className="mt-3">
              <Link href={`/projects/${p.id}`} className="text-sm underline underline-offset-4">
                View details →
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
