import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { Folder, TeamMembership } from "@/models/user";

const MONGODB_URI = process.env.MONGODB_URI;

const client = new MongoClient(MONGODB_URI!);
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db),
  additionalFields: {
    profileImage: {
      type: "string",
      required: false,
    },
    folders: {
      type: "array",
      default: [] as Folder[],
    },
    teams: {
      type: "array",
      default: [] as TeamMembership[],
    },
  },

  emailAndPassword: {
    enabled: true,
  },
});
