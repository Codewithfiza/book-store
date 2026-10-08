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
        avgOrderValue: { $avg: '$subtotal' },
        totalDelivered: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        avgOrderValue: { $round: ['$avgOrderValue', 2] },
        totalDelivered: 1,
      },
    },
  ]);

  return NextResponse.json(result[0] || { avgOrderValue: 0, totalDelivered: 0 });
}