import { auth } from "@/lib/auth";
import { Folder } from "@/models/user";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    const { folderId } = await req.json();

    if (!folderId) {
      return NextResponse.json(
        { message: "Folder ID is required" },
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

    const folderExists = folders.some((folder) => folder.id === folderId);
    if (!folderExists) {
      return NextResponse.json(
        { message: "Folder not found" },
        { status: 404 }
      );
    }
    const updatedFolders = folders.filter((folder) => folder.id !== folderId);

    const updatedUser = await auth.api.updateUser({
      body: {
        folders: updatedFolders,
      },
      headers: headers(),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Folder deleted successfully",
        deletedFolderId: folderId,
        remainingFolders: updatedFolders.length,
        user: updatedUser,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error deleting folder:", err);
    return NextResponse.json(
      {
        message: "Failed to delete folder",
        error: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
