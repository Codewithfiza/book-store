import dbConnect from '@/lib/mongodb';
import Book from '@/models/Book';
import { NextResponse } from 'next/server';



export async function DELETE(request, {params}){
    await dbConnect();
    const {id, reviewId} = await params;

    const book = await Book.findById(id);
  if (!book) {
    return NextResponse.json({ error: 'Book not found' }, { status: 404 });
  }


  book.reviews = book.reviews.filter(
    (review) => review._id.toString() !== reviewId
  );

  await book.save();

  return NextResponse.json(book);
}