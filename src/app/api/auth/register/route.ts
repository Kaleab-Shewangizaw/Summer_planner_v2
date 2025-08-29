import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectMongo from "@/lib/mongodb";
import User from "@/models/user";

export async function POST(req: Request) {
  await connectMongo();
  const { username, email, password } = await req.json();

  if (!username || !email || !password) {
    return NextResponse.json({ error: "All fields required" }, { status: 400 });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json(
      { error: "Email already exists" },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ username, email, password: hashedPassword });

  if (user) {
    return NextResponse.json(
      { message: "User created", user },
      { status: 201 }
    );
  } else {
    return NextResponse.json({ message: "no user" });
  }
}
