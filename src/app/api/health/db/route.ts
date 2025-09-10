import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    // Lazy import so Prisma only loads if this route is hit
    const { db } = await import('@/lib/db');
    const count = await db.project.count();
    return NextResponse.json({ ok: true, projects: count });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Database not reachable or not migrated';
    const name = err instanceof Error ? err.name : 'DBError';
    // Never throw during build/runtime; just report status
    return NextResponse.json({ ok: false, error: name, message }, { status: 200 });
  }
}
