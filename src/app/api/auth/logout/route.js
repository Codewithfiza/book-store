import dbConnect from '@/lib/mongodb';
import Session from '@/models/Session';
import { NextResponse } from 'next/server';

export async function POST(request) {
  await dbConnect();

  const sessionId = request.cookies.get('sessionId')?.value;

  if (sessionId) {
    await Session.deleteOne({ sessionId });
  }

  const response = NextResponse.json({ message: 'Logged out' });

  response.cookies.set('sessionId', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: new Date(0),
    path: '/',
  });

  return response;
}