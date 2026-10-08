import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Session from '@/models/Session';

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  const sessionId = request.cookies.get('sessionId')?.value;

  if (!sessionId) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  await dbConnect();
  const session = await Session.findOne({ sessionId, expiresAt: { $gt: new Date() } });

  if (!session) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};