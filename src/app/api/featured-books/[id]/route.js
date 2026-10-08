import dbConnect from "@/lib/mongodb";
import FeaturedBook from "@/models/FeaturedBook";
import { NextResponse } from "next/server";

// GET one featured book
export async function GET(request, { params }) {
  await dbConnect();
  const { id } = await params;

  const featuredBook = await FeaturedBook.findById(id).populate("book");
  if (!featuredBook) {
    return NextResponse.json({ error: "Featured book not found" }, { status: 404 });
  }

  return NextResponse.json(featuredBook);
}

// PUT - update order (for reordering the stack)
export async function PUT(request, { params }) {
  await dbConnect();
  const { id } = await params;
  const body = await request.json();

  try {
    const featuredBook = await FeaturedBook.findByIdAndUpdate(
      id,
      { order: body.order },
      { returnDocument: "after", runValidators: true }
    ).populate("book");

    if (!featuredBook) {
      return NextResponse.json({ error: "Featured book not found" }, { status: 404 });
    }

    return NextResponse.json(featuredBook);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// DELETE - remove a book from featured
export async function DELETE(request, { params }) {
  await dbConnect();
  const { id } = await params;

  const featuredBook = await FeaturedBook.findById(id);
  if (!featuredBook) {
    return NextResponse.json({ error: "Featured book not found" }, { status: 404 });
  }

  await FeaturedBook.findByIdAndDelete(id);

  return NextResponse.json({ message: "Book removed from featured" });
}