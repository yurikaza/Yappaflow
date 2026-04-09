import mongoose, { Schema, Document, Types } from "mongoose";

export type SignalPlatform = "whatsapp" | "instagram";
export type SignalStatus   = "new" | "in_progress" | "converted" | "ignored";

export interface ISignal extends Document {
  agencyId:      Types.ObjectId;
  platform:      SignalPlatform;
  sender:        string;   // phone number or @handle
  senderName:    string;
  preview:       string;   // first message snippet
  isOnDashboard: boolean;  // user pinned it to Active Signals
  status:        SignalStatus;
  createdAt:     Date;
  updatedAt:     Date;
}

const SignalSchema = new Schema<ISignal>(
  {
    agencyId:      { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    platform:      { type: String, enum: ["whatsapp", "instagram"], required: true },
    sender:        { type: String, required: true },
    senderName:    { type: String, required: true },
    preview:       { type: String, required: true },
    isOnDashboard: { type: Boolean, default: false },
    status:        { type: String, enum: ["new", "in_progress", "converted", "ignored"], default: "new" },
  },
  { timestamps: true }
);

export const Signal = mongoose.models.Signal ?? mongoose.model<ISignal>("Signal", SignalSchema);
