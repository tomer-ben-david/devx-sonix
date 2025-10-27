import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const pipelineRouter = router({
  health: publicProcedure.query(() => ({ status: "ok" })),
  listMeetingAssets: publicProcedure
    .input(
      z.object({
        folderId: z.string().min(1),
        mimeTypes: z.array(z.string()).optional(),
      }),
    )
    .query(async ({ ctx, input }) =>
      ctx.meetingPipeline.getAssets({
        folderId: input.folderId,
        mimeTypes: input.mimeTypes,
      }),
    ),
  prepareResearchBrief: publicProcedure
    .input(
      z.object({
        summary: z.string().min(1),
        keywords: z.array(z.string()).default([]),
      }),
    )
    .mutation(async ({ ctx, input }) =>
      ctx.meetingPipeline.prepareResearch({
        summary: input.summary,
        keywords: input.keywords,
      }),
    ),
  buildContentBundle: publicProcedure
    .input(
      z.object({
        folderId: z.string().min(1),
        summary: z.string().min(1),
        keywords: z.array(z.string()).default([]),
        mimeTypes: z.array(z.string()).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) =>
      ctx.meetingPipeline.buildContentBundle({
        folderId: input.folderId,
        summary: input.summary,
        keywords: input.keywords,
        mimeTypes: input.mimeTypes,
      }),
    ),
});
