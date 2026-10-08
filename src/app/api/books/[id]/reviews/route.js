import dbConnect from '@/lib/mongodb';
import Book from '@/models/Book';
import { NextResponse } from 'next/server';

//post a review to add



export async function POST(request, {params}){
    await dbConnect();
    const {id} = await params;
    const body = await request.json();

    try{
        const book = await Book.findById(id);
        if(!book){
            return NextResponse.json({error: 'book not found'}, {status: 404});
        }

        book.reviews.push({
            name: body.name,
            rating: body.rating,
            comment: body.comment,
        });
        await book.save();

        return NextResponse.json(book, { status: 201 });

    }catch(error){
return NextResponse.json({ error: error.message }, { status: 400 });


    }
}