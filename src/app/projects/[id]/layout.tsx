/* eslint-disable @typescript-eslint/no-explicit-any */
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { ProjectTabs } from '@/components/ProjectTabs';

export const dynamic = 'force-dynamic';

export default async function ProjectLayout({ children, params }: any) {
  const id = params?.id as string | undefined;
  if (!id) notFound();

  const project = await db.project.findUnique({ where: { id } });
  if (!project) notFound();

  return (
    <main className="p-6 space-y-4">
      <div>
        <div className="text-sm opacity-60">{project.code}</div>
        <h1 className="text-2xl font-semibold">{project.name}</h1>
        <div className="text-xs mt-1">Status: {project.status}</div>
      </div>
      <ProjectTabs id={project.id} />
      {children}
    </main>
  );
}
