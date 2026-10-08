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
    { $unwind: '$items' },
    {
      $group: {
        _id: null,
        offerRevenue: {
          $sum: {
            $cond: ['$items.wasOnOffer', { $multiply: ['$items.price', '$items.quantity'] }, 0],
          },
        },
        regularRevenue: {
          $sum: {
            $cond: ['$items.wasOnOffer', 0, { $multiply: ['$items.price', '$items.quantity'] }],
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        offerRevenue: { $round: ['$offerRevenue', 2] },
        regularRevenue: { $round: ['$regularRevenue', 2] },
      },
    },
  ]);

  return NextResponse.json(result[0] || { offerRevenue: 0, regularRevenue: 0 });
}