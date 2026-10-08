import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';
import Book from '@/models/Book';
import { getSessionFromRequest } from '@/lib/getSession';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  await dbConnect();

   
  const { id } = await params;

  const order = await Order.findById(id);
  if (!order) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }

  return NextResponse.json(order);
}

export async function PATCH(request, { params }) {
  await dbConnect();
   const session = await getSessionFromRequest(request);
    if (!session || session.role !== 'admin') {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
  const { id } = await params;
  const body = await request.json();

  try {
    const existingOrder = await Order.findById(id);
    if (!existingOrder) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    const oldStatus = existingOrder.status;
    const newStatus = body.status;

    // restore stock only on a genuine transition into cancelled
    if (newStatus === 'cancelled' && oldStatus !== 'cancelled' && oldStatus !== 'delivered') {
      for (const item of existingOrder.items) {
        await Book.findByIdAndUpdate(item.id, { $inc: { stock: item.quantity } });
      }
    }

    existingOrder.status = newStatus;
    await existingOrder.save();

    return NextResponse.json(existingOrder);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}