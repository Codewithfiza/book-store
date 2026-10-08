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
    {
      $group: {
        _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
        totalOrders: { $sum: 1 },
        cancelledOrders: {
          $sum: { $cond: [{ $eq: ['$status', 'cancelled'] }, 1, 0] },
        },
      },
    },
    {
      $project: {
        _id: 1,
        totalOrders: 1,
        cancelledOrders: 1,
        cancellationRate: {
          $round: [{ $multiply: [{ $divide: ['$cancelledOrders', '$totalOrders'] }, 100] }, 1],
        },
      },
    },
    { $sort: { '_id.year': 1, '_id.month': 1 } },
  ]);

  return NextResponse.json(result);
}