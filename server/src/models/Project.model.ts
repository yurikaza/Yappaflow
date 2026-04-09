import mongoose, { Schema, Document, Types } from "mongoose";

export type ProjectPlatform = "shopify" | "wordpress" | "webflow" | "ikas" | "custom";
export type ProjectPhase    = "listening" | "building" | "deploying" | "live";

export interface IProject extends Document {
  agencyId:    Types.ObjectId;
  name:        string;
  clientName:  string;
  platform:    ProjectPlatform;
  phase:       ProjectPhase;
  progress:    number;          // 0–100
  signalId?:   Types.ObjectId;  // linked incoming signal
  dueDate?:    Date;
  liveUrl?:    string;
  notes?:      string;
  createdAt:   Date;
  updatedAt:   Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    agencyId:   { type: Schema.Types.ObjectId, ref: "User",   required: true, index: true },
    name:       { type: String, required: true },
    clientName: { type: String, required: true },
    platform:   { type: String, enum: ["shopify", "wordpress", "webflow", "ikas", "custom"], required: true },
    phase:      { type: String, enum: ["listening", "building", "deploying", "live"], default: "listening" },
    progress:   { type: Number, default: 0, min: 0, max: 100 },
    signalId:   { type: Schema.Types.ObjectId, ref: "Signal" },
    dueDate:    { type: Date },
    liveUrl:    { type: String },
    notes:      { type: String },
  },
  { timestamps: true }
);

export const Project = mongoose.models.Project ?? mongoose.model<IProject>("Project", ProjectSchema);
