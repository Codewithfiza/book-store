import dbConnect from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Feedback from "@/models/Feedback";

export async function POST(req) {
  try {
    await dbConnect();
    const { name, message, rating } = await req.json();

    if (!name?.trim() || !message?.trim() || !rating) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Invalid rating" }, { status: 400 });
    }

    const feedback = await Feedback.create({
      name: name.trim(),
      message: message.trim(),
      rating,
    });

    return NextResponse.json(feedback, { status: 201 });
  } catch (err) {
    console.error("POST /api/feedback error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    await dbConnect();
    const status = req.nextUrl.searchParams.get("status") || "approved";

    const feedback = await Feedback.find({ status }).sort({ createdAt: -1 });
    return NextResponse.json(feedback);
  } catch (err) {
    console.error("GET /api/feedback error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}