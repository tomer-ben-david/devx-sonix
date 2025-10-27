import type { ResearchAgent, ResearchBrief, ResearchPrompt } from "./pipeline";

export type ExternalResearchProvider = {
  generateBrief(prompt: ResearchPrompt): Promise<ResearchBrief>;
};

export const createResearchAgent = (
  provider: ExternalResearchProvider,
): ResearchAgent => ({
  compileBrief: (prompt) => provider.generateBrief(prompt),
});

export const createDemoResearchAgent = (): ResearchAgent => ({
  async compileBrief(prompt: ResearchPrompt): Promise<ResearchBrief> {
    return {
      topic: prompt.summary,
      insights: [
        `Demo research brief generated for "${prompt.summary}".`,
        "Swap this agent with your deep research integration in Milestone M2.",
      ],
      sources:
        prompt.keywords.length > 0
          ? prompt.keywords.map((keyword, index) => ({
              title: `Seed source ${index + 1}: ${keyword}`,
              url: `https://example.com/insights/${keyword}`,
              keyTakeaway: `Outline coverage of ${keyword} for downstream content.`,
            }))
          : [
              {
                title: "General research placeholder",
                url: "https://example.com/insights/placeholder",
                keyTakeaway:
                  "Add keywords to request targeted discovery for the content bundle.",
              },
            ],
    };
  },
});
