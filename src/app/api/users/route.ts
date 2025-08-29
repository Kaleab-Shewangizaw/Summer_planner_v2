import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import User from "@/models/user";

export async function GET() {
  await connectMongo();

  const users = await User.find();

  if (users) {
    return NextResponse.json({ message: "all users", users }, { status: 201 });
  } else {
    return NextResponse.json({ message: "no user" });
  }
}
