import { GraphQLError } from "graphql";
import axios from "axios";
import { PlatformConnection } from "../../models/PlatformConnection.model";
import { ChatMessage }        from "../../models/ChatMessage.model";
import { Signal }             from "../../models/Signal.model";
import type { AuthContext }   from "../../middleware/auth";

export const platformResolvers = {
  Query: {
    platformConnections: async (_: unknown, __: unknown, ctx: AuthContext) => {
      if (!ctx.userId) throw new GraphQLError("Unauthorized", { extensions: { code: "UNAUTHORIZED" } });
      const docs = await PlatformConnection.find({ userId: ctx.userId });
      return docs.map(serializeConn);
    },

    chatMessages: async (
      _: unknown,
      { signalId, limit = 50 }: { signalId: string; limit?: number },
      ctx: AuthContext
    ) => {
      if (!ctx.userId) throw new GraphQLError("Unauthorized", { extensions: { code: "UNAUTHORIZED" } });
      // Verify the signal belongs to this agency
      const signal = await Signal.findOne({ _id: signalId, agencyId: ctx.userId });
      if (!signal) throw new GraphQLError("Signal not found", { extensions: { code: "NOT_FOUND" } });

      const docs = await ChatMessage.find({ signalId })
        .sort({ timestamp: 1 })
        .limit(limit);
      return docs.map(serializeMsg);
    },
  },

  Mutation: {
    /** Connect WhatsApp Business — manual credentials from Meta Developer Console */
    connectWhatsApp: async (
      _: unknown,
      { input }: { input: { wabaId: string; phoneNumberId: string; accessToken: string; displayPhone: string } },
      ctx: AuthContext
    ) => {
      if (!ctx.userId) throw new GraphQLError("Unauthorized", { extensions: { code: "UNAUTHORIZED" } });

      // Quick validation: verify token works
      try {
        await axios.get(
          `https://graph.facebook.com/v19.0/${input.phoneNumberId}`,
          { params: { access_token: input.accessToken } }
        );
      } catch {
        throw new GraphQLError("WhatsApp credentials invalid — check WABA ID, Phone Number ID and token", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }

      const doc = await PlatformConnection.findOneAndUpdate(
        { userId: ctx.userId, platform: "whatsapp_business" },
        {
          $set: {
            userId:        ctx.userId,
            platform:      "whatsapp_business",
            wabaId:        input.wabaId,
            phoneNumberId: input.phoneNumberId,
            displayPhone:  input.displayPhone,
            accessToken:   input.accessToken,
            isActive:      true,
          },
        },
        { upsert: true, new: true }
      );
      return serializeConn(doc);
    },

    /** Connect Instagram DM — using access token from OAuth or manual */
    connectInstagram: async (
      _: unknown,
      { accessToken }: { accessToken: string },
      ctx: AuthContext
    ) => {
      if (!ctx.userId) throw new GraphQLError("Unauthorized", { extensions: { code: "UNAUTHORIZED" } });

      // Fetch IG business account info
      let igData: { id: string; username?: string; instagram_business_account?: { id: string } };
      try {
        const { data } = await axios.get("https://graph.facebook.com/v19.0/me/accounts", {
          params: { fields: "instagram_business_account,name", access_token: accessToken },
        });
        const page = data.data?.[0];
        const igAccountId = page?.instagram_business_account?.id;
        if (!igAccountId) throw new Error("No Instagram Business account found on this token");

        const igProfile = await axios.get(`https://graph.facebook.com/v19.0/${igAccountId}`, {
          params: { fields: "id,username", access_token: accessToken },
        });
        igData = { id: igProfile.data.id, username: igProfile.data.username, instagram_business_account: { id: igAccountId } };
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Instagram credentials invalid";
        throw new GraphQLError(msg, { extensions: { code: "BAD_USER_INPUT" } });
      }

      const doc = await PlatformConnection.findOneAndUpdate(
        { userId: ctx.userId, platform: "instagram_dm" },
        {
          $set: {
            userId:      ctx.userId,
            platform:    "instagram_dm",
            igAccountId: igData.instagram_business_account?.id ?? igData.id,
            igUserId:    igData.id,
            igUsername:  igData.username,
            accessToken,
            isActive:    true,
          },
        },
        { upsert: true, new: true }
      );
      return serializeConn(doc);
    },

    /** Disconnect a platform */
    disconnectPlatform: async (
      _: unknown,
      { platform }: { platform: string },
      ctx: AuthContext
    ) => {
      if (!ctx.userId) throw new GraphQLError("Unauthorized", { extensions: { code: "UNAUTHORIZED" } });
      await PlatformConnection.findOneAndUpdate(
        { userId: ctx.userId, platform },
        { $set: { isActive: false } }
      );
      return true;
    },
  },
};

function serializeConn(doc: InstanceType<typeof PlatformConnection>) {
  return {
    id:            doc._id.toString(),
    platform:      doc.platform,
    isActive:      doc.isActive,
    displayPhone:  doc.displayPhone  ?? null,
    igUsername:    doc.igUsername    ?? null,
    createdAt:     doc.createdAt.toISOString(),
  };
}

function serializeMsg(doc: InstanceType<typeof ChatMessage>) {
  return {
    id:           doc._id.toString(),
    signalId:     doc.signalId.toString(),
    platform:     doc.platform,
    direction:    doc.direction,
    senderName:   doc.senderName,
    senderHandle: doc.senderHandle,
    text:         doc.text,
    messageType:  doc.messageType,
    mediaUrl:     doc.mediaUrl ?? null,
    timestamp:    doc.timestamp.toISOString(),
  };
}
