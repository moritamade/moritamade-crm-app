import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// IMPORTANT: don't crash the build if DB isn't reachable.
// Try to query, but swallow errors and return ok:false.
export async function GET() {
  try {
    // Lazy import so Prisma isn't even loaded unless we hit the route
    const { db } = await import('@/lib/db');
    const count = await db.project.count();
    return NextResponse.json({ ok: true, projects: count });
  } catch (err: any) {
    return NextResponse.json(
      {
        ok: false,
        error: err?.name || 'DBError',
        message: err?.message || 'Database not reachable or not migrated',
      },
      { status: 200 }
    );
  }
}
