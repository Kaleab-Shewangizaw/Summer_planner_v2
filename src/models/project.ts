import mongoose, { Document, Model, Schema } from "mongoose";

interface ChecklistItem {
  id: number;
  text: string;
  completed: boolean;
}

export interface IComment {
  user: mongoose.Types.ObjectId;
  text: string;
  createdAt: Date;
}

export interface IAttachment {
  filename: string;
  url: string;
  uploadedBy: mongoose.Types.ObjectId;
  uploadedAt: Date;
}

export interface Tag {
  id: number;
  name: string;
  color: string;
}

interface Task {
  title: string;
  description?: string;
  column: number;
  position: number;
  assignees: mongoose.Types.ObjectId[];
  startDate?: Date;
  dueDate?: Date;
  isCompleted: boolean;
  colorTags: Tag[];
  checklistItems?: ChecklistItem[];
  comments: IComment[];
  attachments: IAttachment[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Column {
  id: number;
  title: string;
}

export interface IProject extends Document {
  id: string;
  title: string;
  description?: string;
  priority: "high" | "medium" | "low";
  owner: string;
  tasks?: Task[];
  isCompleted: boolean;
  startDate?: Date;
  dueDate?: Date;
  isTeamProject: boolean;
  team?: string;
  columns: Column[];
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
    prority: {
      type: String,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tasks: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          default: () => new mongoose.Types.ObjectId(),
        },
        title: {
          type: String,
          required: true,
        },
        description: {
          type: String,
        },
        board: {
          type: Number,
        },
        position: {
          type: Number,
          required: true,
        },
        assignees: [
          {
            type: Schema.Types.ObjectId,
            ref: "User",
          },
        ],
        startDate: {
          type: Date,
        },
        dueDate: {
          type: Date,
        },
        isCompleted: {
          type: Boolean,
          default: false,
        },
        colorTags: [
          {
            id: {
              type: Number,
            },
            name: {
              type: String,
              required: true,
            },
            color: {
              type: String,
              required: true,
            },
          },
        ],
        comments: [
          {
            user: {
              type: Schema.Types.ObjectId,
              ref: "User",
              required: true,
            },
            text: {
              type: String,
              required: true,
            },
            createdAt: {
              type: Date,
              default: Date.now,
            },
          },
        ],
        attachments: [
          {
            filename: {
              type: String,
              required: true,
            },
            url: {
              type: String,
              required: true,
            },
            uploadedBy: {
              type: Schema.Types.ObjectId,
              ref: "User",
              required: true,
            },
            uploadedAt: {
              type: Date,
              default: Date.now,
            },
          },
        ],
      },
    ],
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
    columns: [
      {
        id: {
          type: Number,
        },
        title: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

export const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);
