import mongoose, { Schema, Document, Types } from "mongoose";

export type MessageDirection = "inbound" | "outbound";
export type MessageType      = "text" | "image" | "audio" | "document" | "template";

export interface IChatMessage extends Document {
  agencyId:    Types.ObjectId;
  signalId:    Types.ObjectId;       // the Signal (conversation thread)
  platform:    "whatsapp" | "instagram";
  direction:   MessageDirection;
  senderName:  string;
  senderHandle:string;               // phone or IG ID
  text:        string;
  messageType: MessageType;
  mediaUrl?:   string;
  externalId:  string;               // Meta message ID (deduplication)
  timestamp:   Date;
  createdAt:   Date;
}

const ChatMessageSchema = new Schema<IChatMessage>(
  {
    agencyId:     { type: Schema.Types.ObjectId, ref: "User",   required: true, index: true },
    signalId:     { type: Schema.Types.ObjectId, ref: "Signal", required: true, index: true },
    platform:     { type: String, enum: ["whatsapp", "instagram"], required: true },
    direction:    { type: String, enum: ["inbound", "outbound"],   required: true },
    senderName:   { type: String, required: true },
    senderHandle: { type: String, required: true },
    text:         { type: String, default: "" },
    messageType:  { type: String, enum: ["text","image","audio","document","template"], default: "text" },
    mediaUrl:     { type: String },
    externalId:   { type: String, required: true, unique: true }, // dedupe on Meta msg ID
    timestamp:    { type: Date, required: true },
  },
  { timestamps: true }
);

export const ChatMessage =
  mongoose.models.ChatMessage ??
  mongoose.model<IChatMessage>("ChatMessage", ChatMessageSchema);
