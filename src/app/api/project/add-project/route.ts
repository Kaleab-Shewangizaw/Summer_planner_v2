import { auth } from "@/lib/auth";
import { Folder, FolderProject } from "@/models/user";
import { IProject, Project } from "@/models/project";
import { v4 as uuidv4 } from "uuid";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";

interface AddProjectRequest {
  name: string;
  description?: string;
  priority: "high" | "medium" | "low";
  folderName: string;
  teamId?: string;
}

export async function POST(req: Request) {
  try {
    const {
      name,
      description = "",
      folderName,
      priority,
      teamId,
    }: AddProjectRequest = await req.json();

    if (typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { message: "Project name must be a non-empty string" },
        { status: 400 }
      );
    }

    await dbConnect();

    // Get headers once and reuse them
    const headersList = await headers();
    const session = await auth.api.getSession({ headers: headersList });

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const folders: Folder[] =
      typeof session.user.folders === "string"
        ? JSON.parse(session.user.folders)
        : ((session.user.folders || []) as Folder[]);

    const folder = folders.find((f) => f.name === folderName);
    if (!folder) {
      return NextResponse.json(
        { message: "Folder not found" },
        { status: 404 }
      );
    }

    // Create new project
    const newProject: IProject = {
      id: uuidv4(),
      title: name.trim(),
      description: description?.toString() || "",
      owner: session.user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
      startDate: new Date(),
      priority: priority,
      team: teamId,
    };

    await Project.create(newProject);

    const updatedFolders = folders.map((f) =>
      f.name === folderName
        ? {
            ...f,
            projects: [...(f.projects || []), newProject],
          }
        : f
    );

    const updatedUser = await auth.api.updateUser({
      body: {
        folders: updatedFolders,
      },
      headers: headersList,
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
