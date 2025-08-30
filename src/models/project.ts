import mongoose, { Document, Model, Schema } from "mongoose";

export interface IProject extends Document {
  title: string;
  description?: string;
  owner: mongoose.Types.ObjectId;
  folder: mongoose.Types.ObjectId;
  isCompleted: boolean;
  startDate?: Date;
  dueDate?: Date;
  isTeamProject: boolean;
  team?: mongoose.Types.ObjectId;
  boards: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    folder: {
      type: Schema.Types.ObjectId,
      ref: "Folder",
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    startDate: {
      type: Date,
    },
    dueDate: {
      type: Date,
    },
    isTeamProject: {
      type: Boolean,
      default: false,
    },
    team: {
      type: Schema.Types.ObjectId,
      ref: "Team",
    },
    boards: [
      {
        type: Schema.Types.ObjectId,
        ref: "Board",
      },
    ],
  },
  { timestamps: true }
);

export const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);
