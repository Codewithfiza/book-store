import dbConnect from "@/lib/mongodb";
import Book from '@/models/Book';
import { getSessionFromRequest } from '@/lib/getSession';
import { NextResponse } from "next/server";



//get 
export async function GET(request, {params}){
    await dbConnect();
    const {id} = await params;

    const book = await Book.findById(id).populate('genre');
    if(!book){
        return NextResponse.json({error: 'Book not found'}, {status: 400});

    }

    return NextResponse.json(book);
}

//put

export async function PUT(request, {params}){
    await dbConnect();



     const session = await getSessionFromRequest(request);
    if (!session || session.role !== 'admin') {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const {id} = await params;
    const body = await request.json();


    try{
       const book = await Book.findById(id);
        if (!book) {
            return NextResponse.json({ error: 'Book not found' }, { status: 404 });
        }
        Object.assign(book, body);
        await book.save();
        await book.populate('genre');
        return NextResponse.json(book);
    }catch(error){
        return NextResponse.json({ error: error.message }, { status: 400 });

    }
 }


 //delete 
 export async function DELETE(request, {params}){
    await dbConnect();


    const session = await getSessionFromRequest(request);
    if (!session || session.role !== 'admin') {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    
    const {id} = await params;

    const book = await Book.findByIdAndDelete(id);
    if (!book) {
    return NextResponse.json({ error: 'Book not found' }, { status: 404 });
  }

  return NextResponse.json({ message: 'Book deleted' });


 }