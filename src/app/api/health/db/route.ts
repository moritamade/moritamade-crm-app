import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const runtime = 'nodejs';

export async function GET() {
  const count = await db.project.count();
  return NextResponse.json({ ok: true, projects: count });
}
