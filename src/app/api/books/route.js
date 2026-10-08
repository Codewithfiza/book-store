import dbConnect from "@/lib/mongodb";
import Genre from "@/models/Genre";
import Book from "@/models/Book";
import { getSessionFromRequest } from '@/lib/getSession';
import { NextResponse } from "next/server";


//get to get data of books
export async function GET(request){
    await dbConnect();

    const {searchParams} = new URL(request.url);
    const genreSlug = searchParams.get('genre');
    let query = {};
    
    if(genreSlug){
        const genre = await Genre.findOne({slug: genreSlug});
        if(!genre){
            return NextResponse.json([]);
        }
        query.genre = genre._id;
    }

    if(searchParams.get('onOffer') === 'true'){
        query.onOffer = true;
    }


    const books = await Book.find(query).populate('genre').sort({createdAt: -1});
    return NextResponse.json(books);
}


//post
export async function POST(request){
    await dbConnect();

     const session = await getSessionFromRequest(request);
    if (!session || session.role !== 'admin') {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }


    const body = await request.json();

    try{
        const book = await Book.create(body);
        return NextResponse.json(book, {status: 201});

    }catch(error){
        return NextResponse.json({error: error.message}, {status: 400});

    }
}