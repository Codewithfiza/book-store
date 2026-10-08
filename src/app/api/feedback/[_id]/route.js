import dbConnect from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import Feedback from "@/models/Feedback";

export async function PATCH(req, { params }) {
  try {
    await dbConnect();
    const { _id } = await params; // Next.js 15: params is async, must await
    const { status } = await req.json();

    if (!["approved", "rejected"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const updated = await Feedback.findByIdAndUpdate(
      _id,
      { status },
      { returnDocument: 'after' }
    );

    if (!updated) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    if (status === "approved") {
      revalidatePath("/"); // adjust if homepage isn't at root
    }

    return NextResponse.json(updated);
  } catch (err) {
    console.error("PATCH /api/feedback/[_id] error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}