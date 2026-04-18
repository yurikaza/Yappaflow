import { GraphQLError } from "graphql";
import { Signal } from "../../models/Signal.model";
import { Project } from "../../models/Project.model";
import type { AuthContext } from "../../middleware/auth";

export const signalResolvers = {
  Query: {
    signals: async (
      _: unknown,
      { onDashboardOnly }: { onDashboardOnly?: boolean },
      ctx: AuthContext
    ) => {
      if (!ctx.userId) throw new GraphQLError("Unauthorized", { extensions: { code: "UNAUTHORIZED" } });
      const filter: Record<string, unknown> = { agencyId: ctx.userId };
      if (onDashboardOnly === true) filter.isOnDashboard = true;
      const docs = await Signal.find(filter).sort({ createdAt: -1 }).limit(50);
      return docs.map(serialize);
    },

    signal: async (_: unknown, { id }: { id: string }, ctx: AuthContext) => {
      if (!ctx.userId) throw new GraphQLError("Unauthorized", { extensions: { code: "UNAUTHORIZED" } });
      const doc = await Signal.findOne({ _id: id, agencyId: ctx.userId });
      if (!doc) throw new GraphQLError("Signal not found", { extensions: { code: "NOT_FOUND" } });
      return serialize(doc);
    },

    dashboardStats: async (_: unknown, __: unknown, ctx: AuthContext) => {
      if (!ctx.userId) throw new GraphQLError("Unauthorized", { extensions: { code: "UNAUTHORIZED" } });

      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

      const [totalSignals, newSignals, activeProjects, liveProjects, completedThisWeek] =
        await Promise.all([
          Signal.countDocuments({ agencyId: ctx.userId }),
          Signal.countDocuments({ agencyId: ctx.userId, status: "new" }),
          Project.countDocuments({ agencyId: ctx.userId, phase: { $in: ["listening", "building", "deploying"] } }),
          Project.countDocuments({ agencyId: ctx.userId, phase: "live" }),
          Project.countDocuments({ agencyId: ctx.userId, phase: "live", updatedAt: { $gte: weekAgo } }),
        ]);

      return { totalSignals, newSignals, activeProjects, liveProjects, completedThisWeek };
    },
  },

  Mutation: {
    createSignal: async (
      _: unknown,
      { input }: { input: { platform: string; sender: string; senderName: string; preview: string } },
      ctx: AuthContext
    ) => {
      if (!ctx.userId) throw new GraphQLError("Unauthorized", { extensions: { code: "UNAUTHORIZED" } });
      const doc = await Signal.create({ agencyId: ctx.userId, ...input });
      return serialize(doc);
    },

    toggleSignalDashboard: async (
      _: unknown,
      { id, onDashboard }: { id: string; onDashboard: boolean },
      ctx: AuthContext
    ) => {
      if (!ctx.userId) throw new GraphQLError("Unauthorized", { extensions: { code: "UNAUTHORIZED" } });
      const doc = await Signal.findOneAndUpdate(
        { _id: id, agencyId: ctx.userId },
        { $set: { isOnDashboard: onDashboard } },
        { new: true }
      );
      if (!doc) throw new GraphQLError("Signal not found", { extensions: { code: "NOT_FOUND" } });
      return serialize(doc);
    },

    updateSignalStatus: async (
      _: unknown,
      { id, status }: { id: string; status: string },
      ctx: AuthContext
    ) => {
      if (!ctx.userId) throw new GraphQLError("Unauthorized", { extensions: { code: "UNAUTHORIZED" } });
      const doc = await Signal.findOneAndUpdate(
        { _id: id, agencyId: ctx.userId },
        { $set: { status } },
        { new: true }
      );
      if (!doc) throw new GraphQLError("Signal not found", { extensions: { code: "NOT_FOUND" } });
      return serialize(doc);
    },

    deleteSignal: async (_: unknown, { id }: { id: string }, ctx: AuthContext) => {
      if (!ctx.userId) throw new GraphQLError("Unauthorized", { extensions: { code: "UNAUTHORIZED" } });
      const result = await Signal.deleteOne({ _id: id, agencyId: ctx.userId });
      return result.deletedCount > 0;
    },
  },
};

function serialize(doc: InstanceType<typeof Signal>) {
  return {
    id:            doc._id.toString(),
    platform:      doc.platform,
    source:        (doc as Record<string, unknown>).source ?? null,
    sender:        doc.sender,
    senderName:    doc.senderName,
    preview:       doc.preview,
    isOnDashboard: doc.isOnDashboard,
    status:        doc.status,
    importedAt:    (doc as Record<string, unknown>).importedAt
                     ? (doc as Record<string, unknown> & { importedAt: Date }).importedAt.toISOString()
                     : null,
    createdAt:     doc.createdAt.toISOString(),
    updatedAt:     doc.updatedAt.toISOString(),
  };
}
