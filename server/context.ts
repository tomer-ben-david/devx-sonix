import { createMeetingPipeline } from "./services/pipeline";

export type AppContext = {
  meetingPipeline: ReturnType<typeof createMeetingPipeline>;
};

export const createContext = async (): Promise<AppContext> => ({
  meetingPipeline: createMeetingPipeline(),
});
