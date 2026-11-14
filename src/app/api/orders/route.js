import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';
import Book from '@/models/Book';
import { getSessionFromRequest } from '@/lib/getSession';
import { NextResponse } from 'next/server';
import { getCustomerSessionFromRequest } from '@/lib/getCustomerSession';

export async function GET(request) {
  await dbConnect();

  const session = await getSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  
  const orders = await Order.find().sort({ createdAt: -1 });
  return NextResponse.json(orders);
}

export async function POST(request) {
  await dbConnect();


  const customerSession = await getCustomerSessionFromRequest(request);
  if (!customerSession) {
    return NextResponse.json(
      { error: 'Please log in to place an order.' },
      { status: 401 }
    );
  }
  
  const body = await request.json();

  if (!Array.isArray(body.items) || body.items.length === 0) {
  return NextResponse.json({ error: 'Cart is empty.' }, { status: 400 });
}

for (const item of body.items) {
  if (!Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 20) {
    return NextResponse.json({ error: 'Invalid quantity.' }, { status: 400 });
  }
}

  const succeeded = []; // track { bookId, quantity } for rollback if needed

  try {
    // Step 1: check + decrement stock for every item, atomically, one by one
    for (const item of body.items) {
      const updatedBook = await Book.findOneAndUpdate(
        { _id: item.id, stock: { $gte: item.quantity } },
        { $inc: { stock: -item.quantity } },
        { new: true }
      );

      if (!updatedBook) {
        // this item failed — roll back everything that succeeded before it
        for (const s of succeeded) {
          await Book.findByIdAndUpdate(s.bookId, { $inc: { stock: s.quantity } });
        }
        return NextResponse.json(
          { error: `"${item.title}" is no longer available in that quantity.` },
          { status: 409 }
        );
      }

      // snapshot whether this book was on offer at the moment of purchase
      item.wasOnOffer = updatedBook.onOffer;
      succeeded.push({ bookId: item.id, quantity: item.quantity });
    }

    // Step 2: all items succeeded — now create the order
    const orderNumber = `ORD-${Date.now()}`;
    const order = await Order.create({ ...body, orderNumber });
    return NextResponse.json(order, { status: 201 });

  } catch (error) {
    // something failed after some decrements succeeded — roll back
    for (const s of succeeded) {
      await Book.findByIdAndUpdate(s.bookId, { $inc: { stock: s.quantity } });
    }
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}