import { auth } from "@/lib/auth";
import { Folder, Project as UserProject } from "@/models/user";
import { v4 as uuidv4 } from "uuid";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

interface AddProjectRequest {
  folderId: string;
  name: string;
  description?: string;
  columns?: any[];
}

export async function POST(req: Request) {
  try {
    const {
      folderId,
      name,
      description = "",
      columns = [],
    }: AddProjectRequest = await req.json();

    if (!folderId || !name) {
      return NextResponse.json(
        { message: "Folder ID and project name are required" },
        { status: 400 }
      );
    }

    if (typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { message: "Project name must be a non-empty string" },
        { status: 400 }
      );
    }

    const session = await auth.api.getSession({ headers: headers() });

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Parse existing folders
    const folders: Folder[] =
      typeof session.user.folders === "string"
        ? JSON.parse(session.user.folders)
        : ((session.user.folders || []) as Folder[]);

    // Check if folder exists
    const folder = folders.find((f) => f.id === folderId);
    if (!folder) {
      return NextResponse.json(
        { message: "Folder not found" },
        { status: 404 }
      );
    }

    // Create new project
    const newProject: UserProject = {
      id: uuidv4(),
      name: name.trim(),
      description: description?.toString() || "",
      columns: columns || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Add project to folder's projects array
    const updatedFolders = folders.map((f) =>
      f.id === folderId
        ? {
            ...f,
            projects: [...(f.projects || []), newProject],
          }
        : f
    );

    // Update user with new folders array
    const updatedUser = await auth.api.updateUser({
      body: {
        folders: updatedFolders,
      },
      headers: headers(),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Project added successfully",
        project: newProject,
        user: updatedUser,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error adding project:", err);
    return NextResponse.json(
      {
        message: "Failed to add project",
        error: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
