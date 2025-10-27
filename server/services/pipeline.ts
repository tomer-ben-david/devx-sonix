export type MeetingAsset = {
  id: string;
  name: string;
  mimeType: string;
  webViewLink?: string;
  createdTime?: string;
};

export type ListAssetsRequest = {
  folderId: string;
  mimeTypes?: string[];
};

export type ResearchPrompt = {
  summary: string;
  keywords: string[];
};

export type ResearchSource = {
  title: string;
  url: string;
  keyTakeaway: string;
};

export type ResearchBrief = {
  topic: string;
  insights: string[];
  sources: ResearchSource[];
};

export type MeetingContentBundle = {
  assets: MeetingAsset[];
  research: ResearchBrief;
};

export interface DriveGateway {
  listAssets(request: ListAssetsRequest): Promise<MeetingAsset[]>;
}

export interface ResearchAgent {
  compileBrief(prompt: ResearchPrompt): Promise<ResearchBrief>;
}

export type MeetingPipelineDeps = {
  driveGateway: DriveGateway;
  researchAgent: ResearchAgent;
};

export type MeetingPipeline = {
  getAssets(request: ListAssetsRequest): Promise<MeetingAsset[]>;
  prepareResearch(prompt: ResearchPrompt): Promise<ResearchBrief>;
  buildContentBundle(input: {
    folderId: string;
    summary: string;
    keywords?: string[];
    mimeTypes?: string[];
  }): Promise<MeetingContentBundle>;
};

const defaultDriveGateway: DriveGateway = {
  async listAssets(request) {
    return [
      {
        id: `demo-${request.folderId}`,
        name: "sample-meeting.mp4",
        mimeType: "video/mp4",
        webViewLink: "https://drive.google.com/demo/sample-meeting",
        createdTime: new Date().toISOString(),
      },
    ];
  },
};

const defaultResearchAgent: ResearchAgent = {
  async compileBrief(prompt) {
    const primaryInsight =
      `Initial research blueprint for ${prompt.summary} ` +
      (prompt.keywords.length
        ? `covering ${prompt.keywords.join(", ")}.`
        : "with no keywords supplied.");

    return {
      topic: prompt.summary,
      insights: [
        primaryInsight,
        "Replace this stub with a deep-research integration for milestone M2.",
      ],
      sources:
        prompt.keywords.length > 0
          ? prompt.keywords.map((keyword) => ({
              title: `Placeholder insight on ${keyword}`,
              url: `https://example.com/research/${keyword}`,
              keyTakeaway: `Research pathway identified for ${keyword}.`,
            }))
          : [
              {
                title: "Sonix Research Seed",
                url: "https://example.com/research/seed",
                keyTakeaway:
                  "Add keywords in the request to seed targeted discovery.",
              },
            ],
    };
  },
};

export const createMeetingPipeline = (
  deps?: Partial<MeetingPipelineDeps>,
): MeetingPipeline => {
  const driveGateway = deps?.driveGateway ?? defaultDriveGateway;
  const researchAgent = deps?.researchAgent ?? defaultResearchAgent;

  return {
    getAssets: (request) => driveGateway.listAssets(request),
    prepareResearch: (prompt) => researchAgent.compileBrief(prompt),
    async buildContentBundle(input) {
      const assets = await driveGateway.listAssets({
        folderId: input.folderId,
        mimeTypes: input.mimeTypes,
      });

      const research = await researchAgent.compileBrief({
        summary: input.summary,
        keywords: input.keywords ?? [],
      });

      return { assets, research };
    },
  };
};
