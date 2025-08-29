import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import User from "@/models/user";

interface Params {
  params: { id: string | number };
}

export async function GET(req: NextRequest, { params }: Params) {
  try {
    await connectMongo();
    const user = await User.findById(params.id);
    if (!user) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }
    return NextResponse.json({ user });
  } catch (err) {
    return NextResponse.json({
      message: "err",
      error: err,
    });
  }
}
