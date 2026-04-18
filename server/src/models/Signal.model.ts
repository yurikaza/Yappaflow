import mongoose, { Schema, Document, Types } from "mongoose";

export type SignalPlatform = "whatsapp" | "instagram" | "telegram" | "csv" | "other";
export type SignalStatus   = "new" | "in_progress" | "converted" | "ignored";
export type SignalSource   = "webhook" | "import" | "api";

export interface ISignal extends Document {
  agencyId:      Types.ObjectId;
  platform:      SignalPlatform;
  source:        SignalSource;   // how this signal entered the system
  sender:        string;         // phone number or @handle
  senderName:    string;
  preview:       string;         // first message snippet
  isOnDashboard: boolean;        // user pinned it to Active Signals
  status:        SignalStatus;
  importedAt?:   Date;           // when the chat file was imported
  createdAt:     Date;
  updatedAt:     Date;
}

const PLATFORMS = ["whatsapp", "instagram", "telegram", "csv", "other"] as const;

const SignalSchema = new Schema<ISignal>(
  {
    agencyId:      { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    platform:      { type: String, enum: PLATFORMS, required: true },
    source:        { type: String, enum: ["webhook", "import", "api"], default: "webhook" },
    sender:        { type: String, required: true },
    senderName:    { type: String, required: true },
    preview:       { type: String, required: true },
    isOnDashboard: { type: Boolean, default: false },
    status:        { type: String, enum: ["new", "in_progress", "converted", "ignored"], default: "new" },
    importedAt:    { type: Date },
  },
  { timestamps: true }
);

export const Signal = mongoose.models.Signal ?? mongoose.model<ISignal>("Signal", SignalSchema);
