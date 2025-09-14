// api/folder/add-folder/route.tsx
import { auth } from "@/lib/auth";
import { Folder } from "@/models/user";
import { v4 as uuidv4 } from "uuid";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name } = await req.json();

    const session = await auth.api.getSession({ headers: headers() });
    if (!session?.user) {
      return NextResponse.json({ message: "unauthorized" }, { status: 401 });
    }

    const folders =
      typeof session.user.folders === "string"
        ? JSON.parse(session.user.folders)
        : ((session.user.folders || []) as Folder[]);

    const newFolder = { id: uuidv4(), name: name || "untitled folder" };
    const updatedFolders = [...folders, newFolder];

    const updatedUser = await auth.api.updateUser({
      body: {
        folders: updatedFolders,
      },
      headers: headers(),
    });

    // Return the new folder data
    return NextResponse.json(
      {
        success: true,
        folder: newFolder,
        user: updatedUser,
      },
      { status: 200 }
    );
  } catch (err) {
    console.log("error adding the folder", err);
    return NextResponse.json(
      { message: "failed to add new folder" },
      { status: 500 }
    );
  }
}
