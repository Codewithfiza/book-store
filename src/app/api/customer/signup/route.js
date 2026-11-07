import dbConnect from '@/lib/mongodb';
import Customer from '@/models/Customer';
import CustomerSession from '@/models/CustomerSession';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { NextResponse } from 'next/server';

export async function POST(request) {
  await dbConnect();
  const { name, email, password } = await request.json();

  if (!name || !email || !password) {
    return NextResponse.json({ error: 'Name, email and password required' }, { status: 400 });
  }
  if (password.length < 8) {
    return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 });
  }

  const existing = await Customer.findOne({ email: email.toLowerCase().trim() });
  if (existing) {
    return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
  }

  // 1) create the account, with a hashed password
  const hashedPassword = await bcrypt.hash(password, 10);
  const customer = await Customer.create({ name, email, password: hashedPassword });

  // 2) log them in straight away: same steps as your admin login
  const sessionId = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  await CustomerSession.create({
    sessionId,
    customerId: customer._id,
    expiresAt,
  });

  const response = NextResponse.json(
    { message: 'Account created', customer: { name: customer.name, email: customer.email } },
    { status: 201 }
  );

  response.cookies.set('customerSession', sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: expiresAt,
    path: '/',
  });

  return response;
}