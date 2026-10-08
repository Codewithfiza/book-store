import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';
import { getSessionFromRequest } from '@/lib/getSession';
import { NextResponse } from 'next/server';

export async function GET(request) {
  await dbConnect();

  const session = await getSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }


  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

  const agingOrders = await Order.find({
    status: 'pending',
    createdAt: { $lte: threeDaysAgo },
  }).sort({ createdAt: 1 });

  return NextResponse.json({
    count: agingOrders.length,
    orders: agingOrders,
  });
}