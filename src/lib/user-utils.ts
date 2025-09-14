import { Folder } from "@/models/user";
import { auth } from "./auth";

export class UserService{
  static async addFolder(userId: string, folderData: Omit<Folder, 'id'| 'createdAt' | 'updatedAt'>){
    const folder: Folder = {
      id: crypto.randomUUID(),
      ...folderData,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    await auth.(userId, {
      fodlers: {
        $push: folder
      }
    })
    return folder;
  }
}