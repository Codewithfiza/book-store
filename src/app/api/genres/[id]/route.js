//handles one genre
import mongoose from "mongoose";
import Genre from '@/models/Genre';
import Book from '@/models/Book';
import { getSessionFromRequest } from '@/lib/getSession';
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";


//get call  to get the one genre

export async function GET(request, {params}){
    await dbConnect();
    const {id} = await params;

    const genre = await Genre.findById(id);
    if(!genre){
        return NextResponse.json({error: 'Genre not found'}, {status: 404});
    }

    const bookCount = await Book.countDocuments({genre: id});
    return NextResponse.json({...genre.toObject(), bookCount});

}

//update function
export async function PUT(request, {params}){
    await dbConnect();

    const session = await getSessionFromRequest(request);
    if (!session || session.role !== 'admin') {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const {id} =await  params;
    const body =  await request.json();

    try{
        const genre = await Genre.findByIdAndUpdate(id,body, {
          returnDocument: 'after',
            runValidators: true,
        });

        if(!genre){
            return NextResponse.json({error: 'Genre not found'}, {status: 404});
        }
return NextResponse.json(genre);
    }catch(error){
        return NextResponse.json({error: error.message}, {status: 400});
    }

}


//delete function
export async function DELETE(request, {params}){
    await dbConnect();

    const session = await getSessionFromRequest(request);
    if (!session || session.role !== 'admin') {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    const {id} = await params;

    const genre = await Genre.findById(id);
    if(!genre){
        return NextResponse.json({error: 'Genre not found'}, {status: 404});
    }

    const deletedBooks = await Book.deleteMany({genre: id});
    await Genre.findByIdAndDelete(id);

    return NextResponse.json({
        message: 'genre and its book deleted',
        deletedBookCount: deletedBooks.deletedCount,
    })

}