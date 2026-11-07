import dbConnect from '@/lib/mongodb';
import CustomerSession from '@/models/CustomerSession';
import { NextResponse } from 'next/server';

export async function POST(request) {
  await dbConnect();

  const sessionId = request.cookies.get('customerSession')?.value;

  if (sessionId) {
    await CustomerSession.deleteOne({ sessionId });
  }

  const response = NextResponse.json({ message: 'Logged out' });

  response.cookies.set('customerSession', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: new Date(0),
    path: '/',
  });

  return response;
}