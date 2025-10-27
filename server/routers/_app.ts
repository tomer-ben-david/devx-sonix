import { router } from "../trpc";
import { pipelineRouter } from "./pipeline";

export const appRouter = router({
  pipeline: pipelineRouter,
});

export type AppRouter = typeof appRouter;
