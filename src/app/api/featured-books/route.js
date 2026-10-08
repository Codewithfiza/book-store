import dbConnect from "@/lib/mongodb";
import FeaturedBook from "@/models/FeaturedBook";
import Book from "@/models/Book";
import { NextResponse } from "next/server";

const MAX_FEATURED = 5;


export async function GET(){
    try{
          await dbConnect();

           const featured = await FeaturedBook.find()
      .sort({ order: 1 })
      .populate("book")
      .lean();

      return NextResponse.json(featured);

    }catch(error){
console.error("GET /api/featured-books failed:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });

    }
}


export async function POST(request){
     await dbConnect();
  const body = await request.json();

  try {
    const count = await FeaturedBook.countDocuments();
    if (count >= MAX_FEATURED) {
      return NextResponse.json(
        { error: `You can only feature up to ${MAX_FEATURED} books. Remove one first.` },
        { status: 400 }
      );
    }
 const bookExists = await Book.findById(body.book);
    if (!bookExists) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    const order = body.order ?? count; // append to end by default

    const featuredBook = await FeaturedBook.create({ book: body.book, order });
    await featuredBook.populate("book");

    return NextResponse.json(featuredBook, { status: 201 });
  } catch (error) {
    if (error.code === 11000) {
      return NextResponse.json(
        { error: "This book is already featured" },
        { status: 400 }
      );
    }
     return NextResponse.json({ error: error.message }, { status: 400 });
  }

}