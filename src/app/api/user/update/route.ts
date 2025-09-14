import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { User } from "@/models/user";

const session = await auth.api.getSession({
  headers: await headers(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    await dbConnect();

    const { name, image, folders } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      session.user.id,
      { name, image, folders },
      { new: true }
    );

    return res.status(200).json({
      message: "User updated",
      user: {
        id: session.user.id.toString(),
        name: updatedUser?.name,
        email: updatedUser?.email,
        image: updatedUser?.image,
        folders: updatedUser?.folders,
      },
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: error, message: "Internal server error" });
  }
}
