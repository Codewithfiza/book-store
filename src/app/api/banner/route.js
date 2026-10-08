import dbConnect from '@/lib/mongodb';
import Banner from '@/models/Banner';
import { getSessionFromRequest } from '@/lib/getSession';
import { NextResponse } from 'next/server';




export async function GET() {
  await dbConnect();
  const banner = await Banner.findOne();

  if (!banner) {
    return NextResponse.json(null);
  }

  const isExpired = banner.endDate && new Date(banner.endDate) < new Date();

  return NextResponse.json({
    ...banner.toObject(),
    isExpired,
    isCurrentlyVisible: banner.isActive && !isExpired,
  });
}

export async function PUT(request){
    await dbConnect();
    const session = await getSessionFromRequest(request);
    if (!session || session.role !== 'admin') {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }


    const body = await request.json();


    try{
        let banner = await Banner.findOne();
        if(banner){
            banner = await Banner.findByIdAndUpdate(banner._id, body, {
                returnDocument: 'after',
                runValidators: true,
            });
        }else{
            banner = await Banner.create(body);
        }
        return NextResponse.json(banner);

    }catch(error){
 return NextResponse.json({ error: error.message }, { status: 400 })
    }
}