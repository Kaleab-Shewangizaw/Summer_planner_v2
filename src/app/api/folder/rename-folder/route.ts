import { auth } from "@/lib/auth";
import { Folder } from "@/models/user";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const { folderId, name } = await req.json();

    if (!folderId || !name) {
      return NextResponse.json(
        { message: "Folder ID and name are required" },
        { status: 400 }
      );
    }

    if (typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { message: "Folder name must be a non-empty string" },
        { status: 400 }
      );
    }

    const session = await auth.api.getSession({ headers: headers() });

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const folders: Folder[] =
      typeof session.user.folders === "string"
        ? JSON.parse(session.user.folders)
        : ((session.user.folders || []) as Folder[]);

    const folderIndex = folders.findIndex((folder) => folder.id === folderId);
    if (folderIndex === -1) {
      return NextResponse.json(
        { message: "Folder not found" },
        { status: 404 }
      );
    }

    const updatedFolders = folders.map((folder) =>
      folder.id === folderId ? { ...folder, name: name.trim() } : folder
    );

    const updatedUser = await auth.api.updateUser({
      body: {
        folders: updatedFolders,
      },
      headers: headers(),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Folder updated successfully",
        updatedFolder: { id: folderId, name: name.trim() },
        user: updatedUser,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error updating folder:", err);
    return NextResponse.json(
      {
        message: "Failed to update folder",
        error: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
