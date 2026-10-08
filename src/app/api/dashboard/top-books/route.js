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


  const topBooks = await Order.aggregate([
    { $match: { status: 'delivered' } },
    { $unwind: '$items' },
    { $match: { 'items.wasOnOffer': false } },
    {
      $group: {
        _id: '$items.id',
        title: { $first: '$items.title' },
        totalSold: { $sum: '$items.quantity' },
      },
    },
    { $sort: { totalSold: -1 } },
    { $limit: 10 },
  ]);

  return NextResponse.json(topBooks);
}