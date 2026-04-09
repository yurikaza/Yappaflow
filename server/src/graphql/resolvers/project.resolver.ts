import { GraphQLError } from "graphql";
import { Project } from "../../models/Project.model";
import type { AuthContext } from "../../middleware/auth";

export const projectResolvers = {
  Query: {
    projects: async (_: unknown, __: unknown, ctx: AuthContext) => {
      if (!ctx.userId) throw new GraphQLError("Unauthorized", { extensions: { code: "UNAUTHORIZED" } });
      const docs = await Project.find({ agencyId: ctx.userId }).sort({ createdAt: -1 });
      return docs.map(serialize);
    },

    project: async (_: unknown, { id }: { id: string }, ctx: AuthContext) => {
      if (!ctx.userId) throw new GraphQLError("Unauthorized", { extensions: { code: "UNAUTHORIZED" } });
      const doc = await Project.findOne({ _id: id, agencyId: ctx.userId });
      if (!doc) throw new GraphQLError("Project not found", { extensions: { code: "NOT_FOUND" } });
      return serialize(doc);
    },
  },

  Mutation: {
    createProject: async (
      _: unknown,
      { input }: { input: { name: string; clientName: string; platform: string; dueDate?: string; notes?: string; signalId?: string } },
      ctx: AuthContext
    ) => {
      if (!ctx.userId) throw new GraphQLError("Unauthorized", { extensions: { code: "UNAUTHORIZED" } });
      const doc = await Project.create({
        agencyId:   ctx.userId,
        name:       input.name,
        clientName: input.clientName,
        platform:   input.platform,
        phase:      "listening",
        progress:   0,
        dueDate:    input.dueDate ? new Date(input.dueDate) : undefined,
        notes:      input.notes,
        signalId:   input.signalId,
      });
      return serialize(doc);
    },

    updateProject: async (
      _: unknown,
      { id, input }: { id: string; input: Record<string, unknown> },
      ctx: AuthContext
    ) => {
      if (!ctx.userId) throw new GraphQLError("Unauthorized", { extensions: { code: "UNAUTHORIZED" } });
      const doc = await Project.findOneAndUpdate(
        { _id: id, agencyId: ctx.userId },
        { $set: { ...input, ...(input.dueDate ? { dueDate: new Date(input.dueDate as string) } : {}) } },
        { new: true }
      );
      if (!doc) throw new GraphQLError("Project not found", { extensions: { code: "NOT_FOUND" } });
      return serialize(doc);
    },

    deleteProject: async (_: unknown, { id }: { id: string }, ctx: AuthContext) => {
      if (!ctx.userId) throw new GraphQLError("Unauthorized", { extensions: { code: "UNAUTHORIZED" } });
      const result = await Project.deleteOne({ _id: id, agencyId: ctx.userId });
      return result.deletedCount > 0;
    },
  },
};

function serialize(doc: InstanceType<typeof Project>) {
  return {
    id:         doc._id.toString(),
    name:       doc.name,
    clientName: doc.clientName,
    platform:   doc.platform,
    phase:      doc.phase,
    progress:   doc.progress,
    dueDate:    doc.dueDate?.toISOString() ?? null,
    liveUrl:    doc.liveUrl ?? null,
    notes:      doc.notes ?? null,
    signalId:   doc.signalId?.toString() ?? null,
    createdAt:  doc.createdAt.toISOString(),
    updatedAt:  doc.updatedAt.toISOString(),
  };
}
