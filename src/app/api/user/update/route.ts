import { getServerSession } from "next-auth/next";
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import { User } from "@/models/user";
import { NextAuthOptions } from "next-auth";
import { auth } from "@/lib/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const session = await auth();

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    await dbConnect();

    const { name, image } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      session.user.id,
      { name, image },
      { new: true }
    );

    return res.status(200).json({
      message: "User updated",
      user: {
        id: updatedUser._id.toString(),
        name: updatedUser.name,
        email: updatedUser.email,
        image: updatedUser.image,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
