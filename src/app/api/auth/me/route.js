import { getSessionFromRequest } from '@/lib/getSession';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const session = await getSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ error: 'Not logged in' }, { status: 401 });
  }
  return NextResponse.json({ role: session.role });
}