import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const MONGODB_URI = process.env.MONGODB_URI;

const client = new MongoClient(MONGODB_URI!);
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db),
  user: {
    additionalFields: {
      profileImage: {
        type: "string",
        required: false,
      },
      folders: {
        type: "json",
        defaultValue: [],
      },
      teams: {
        type: "json",
        defaultValue: [],
      },
    },
  },

  emailAndPassword: {
    enabled: true,
  },
});
