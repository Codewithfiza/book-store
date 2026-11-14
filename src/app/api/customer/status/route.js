import dbConnect from '@/lib/mongodb';
import Customer from '@/models/Customer';
import { getCustomerSessionFromRequest } from '@/lib/getCustomerSession';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const session = await getCustomerSessionFromRequest(request);
  if (!session) {
   return NextResponse.json(null);
  }

  await dbConnect();
  const customer = await Customer.findById(session.customerId).select('name email');
  if (!customer) {
     return NextResponse.json(null);
  }

  return NextResponse.json({ name: customer.name, email: customer.email });
}