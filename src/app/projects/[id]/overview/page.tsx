/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function Overview(props: any) {
  const id = props?.params?.id as string | undefined;
  if (!id) return null;

  const p = await db.project.findUnique({ where: { id } });

  return (
    <section className="space-y-3">
      <div className="grid md:grid-cols-3 gap-4">
        <div className="border rounded-xl p-4">
          <div className="text-xs opacity-60">Code</div>
          <div className="text-lg font-medium">{p?.code}</div>
        </div>
        <div className="border rounded-xl p-4">
          <div className="text-xs opacity-60">Name</div>
          <div className="text-lg font-medium">{p?.name}</div>
        </div>
        <div className="border rounded-xl p-4">
          <div className="text-xs opacity-60">Status</div>
          <div className="text-lg font-medium">{p?.status}</div>
        </div>
      </div>
      <div className="text-sm opacity-70">
        Created: {p?.createdAt?.toISOString?.().slice(0, 10)} · Updated:{' '}
        {p?.updatedAt?.toISOString?.().slice(0, 10)}
      </div>
    </section>
  );
}
