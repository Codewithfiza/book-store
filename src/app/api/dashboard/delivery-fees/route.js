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

  const result = await Order.aggregate([
    { $match: { status: 'delivered' } },
    {
      $group: {
        _id: null,
        totalDeliveryFees: { $sum: '$deliveryFee' },
      },
    },
  ]);

  return NextResponse.json(result[0] || { totalDeliveryFees: 0 });
}