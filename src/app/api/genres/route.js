import dbConnect from "@/lib/mongodb";
import Genre from '@/models/Genre';
import Book from '@/models/Book';
import { getSessionFromRequest } from '@/lib/getSession';
import { NextResponse } from "next/server";


//Get function
export async function GET() {
  try {
    await dbConnect();

    const genres = await Genre.find().sort({ name: 1 }).lean();

    const genresWithCount = await Promise.all(
      genres.map(async (genre) => {
        const bookCount = await Book.countDocuments({ genre: genre._id });
        return { ...genre, bookCount };
      })
    );

    return NextResponse.json(genresWithCount);
  } catch (error) {
    console.error("GET /api/genres failed:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


//post function
export async function POST(request){
    await dbConnect();
    const session = await getSessionFromRequest(request);
    if (!session || session.role !== 'admin') {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();

    try{
        const genre = await Genre.create(body);
        return NextResponse.json(genre, {status: 201});

    }catch(error){
        return NextResponse.json({error: error.message}, {status: 400})

    }

}