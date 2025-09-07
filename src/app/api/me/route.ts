// import { auth } from "@/lib/auth";
// import { NextResponse } from "next/server";
// import { User } from "@/models/user";
// import dbConnect from "@/lib/mongodb";

// export async function GET() {
//   try {
//     const session = await auth();
//     await dbConnect();
//     const user = await User.findById(session.user.id);
//     if (!user) {
//       return NextResponse.json({ error: "user Not found" }, { status: 404 });
//     }
//     return NextResponse.json({ user: user });
//   } catch (err) {
//     return NextResponse.json({ error: err, message: "error is here" });
//   }
// }

const data = {
  name: "name",
};

export async function GET() {
  console.log("here we are");
  return data;
}
