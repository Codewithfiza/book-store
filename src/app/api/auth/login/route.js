import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import Session from '@/models/Session';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { NextResponse } from 'next/server';

export async function POST(request) {
  await dbConnect();
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  // session creation goes here 
  const sessionId = crypto.randomBytes(32).toString('hex');
  const expiresAt =  new Date(Date.now()+7*24*60*60*1000);

  await Session.create({
    sessionId,
    userId: user._id,
    role: user.role,
    expiresAt
  });

  const response = NextResponse.json({ message: 'Logged in', role: user.role });

  response.cookies.set('sessionId', sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: expiresAt,
    path: '/',
  });

  return response;
}