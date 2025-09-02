import mongoose, { Document, Model, Schema } from "mongoose";

interface Folder {
  name: string;
  icon: string;
  isFavorite: boolean;
  projects: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IUser extends Document {
  name: string;
  email: string;
  image?: string;
  emailVerified: boolean;
  folders?: Folder[];
  teams: mongoose.Types.ObjectId[];
  ownedTeams: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    folders: [
      {
        name: {
          type: String,

          required: true,
        },
        icon: {
          type: String,
          required: true,
        },
        isFavorite: {
          type: Boolean,
          default: false,
        },
        projects: [
          {
            type: Schema.Types.ObjectId,
            ref: "Project",
          },
        ],
        createdAt: {
          type: Date,
          default: Date.now,
        },
        updatedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    teams: [
      {
        type: Schema.Types.ObjectId,
        ref: "Team",
      },
    ],
    ownedTeams: [
      {
        type: Schema.Types.ObjectId,
        ref: "Team",
      },
    ],
  },
  { timestamps: true }
);

export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
