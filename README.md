# Sonix – Milestone M1 (Next.js + tRPC)

This milestone stands up the Sonix skeleton using the same stack patterns as `~/dev/projects/2025-market-overload`: Next.js 16, React 19, Tailwind, and tRPC. The focus is on wiring the ingestion + research boundary end-to-end with a lightweight UI so we can iterate toward automatic LinkedIn/press outputs in the next milestone.

## What’s Included

- **Next.js App Router** with strict TypeScript configuration (`target: ES2024`) aligned to our Node 22 runtime.
- **tRPC API** mounted at `/api/trpc`, exposing meeting asset discovery, research brief preparation, and bundle orchestration.
- **Pipeline services** (`server/services/*`) that abstract Drive access and deep research. Default implementations return deterministic demo data until real integrations are provided.
- **Interactive UI demo** on the home page that calls the pipeline routes, visualising Drive assets and research output.
- **Tailwind CSS** styling, ready to scale toward the Sonix product aesthetic.

## Project Structure

```
app/
  api/trpc/[trpc]/route.ts  # Next.js handler bridging to tRPC
  layout.tsx                # Root layout + global styles
  page.tsx                  # Hero + interactive pipeline demo
components/
  PipelineDemo.tsx          # Client component exercising pipeline endpoints
lib/
  trpc/Provider.tsx         # React Query + tRPC provider
  trpc/client.ts            # tRPC React client
server/
  context.ts                # Injects pipeline into each request
  trpc.ts                   # tRPC init helpers
  routers/                  # API routers (pipeline health/assets/bundle)
  services/                 # Drive + research abstractions/stubs
tailwind.config.ts
next.config.ts
postcss.config.mjs
tsconfig.json
```

## Available Scripts

- `npm run dev` – Launches the Next.js dev server with hot reload.
- `npm run build` – Generates the production build.
- `npm run start` – Runs the production build (after `npm run build`).
- `npm run lint` – Executes `next lint`.

## Pass-Driven Local Env

The current demo runs without secrets, but real provider wiring should use local `pass` entries instead of committed env blobs.

```bash
./scripts/pass-init.sh
pass edit apps/sonix/local
./scripts/env-sync.sh
```

This materializes a local `.env.local` for integrations such as Google Drive or model APIs without committing any secret-bearing env artifact.

## tRPC Surface

| Procedure                         | Type     | Description                                                         |
|-----------------------------------|----------|---------------------------------------------------------------------|
| `pipeline.health`                 | query    | Returns `{ status: "ok" }` for uptime checks.                       |
| `pipeline.listMeetingAssets`      | query    | Retrieves Drive assets for a folder (defaults to stubbed data).     |
| `pipeline.prepareResearchBrief`   | mutation | Generates a research outline from summary + keywords.               |
| `pipeline.buildContentBundle`     | mutation | Combines asset listing with a research brief in one orchestration.  |

## Integrating Real Services

1. **Google Drive**  
  After generating `.env.local` via `./scripts/env-sync.sh`, replace the stub gateway by instantiating a `drive_v3.Drive` client and injecting it via the request context:
   ```ts
   import { google } from "googleapis";
   import { createDriveClient, createGoogleDriveGateway } from "@/server/services/googleDriveGateway";
   import { createMeetingPipeline } from "@/server/services/pipeline";

   const auth = new google.auth.JWT({
     email: process.env.GOOGLE_CLIENT_EMAIL,
     key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
     scopes: ["https://www.googleapis.com/auth/drive.readonly"],
   });

   const meetingPipeline = createMeetingPipeline({
     driveGateway: createGoogleDriveGateway(createDriveClient(auth)),
   });
   ```

2. **Deep Research**  
   Swap `createMeetingPipeline()`’s default research agent with a provider backed by Grok, GPT-4o, or your chosen API. `server/services/researchAgent.ts` exposes helper constructors so you can wire the provider without changing router code.

## Next Milestone Handoff

- Hook the Drive gateway to real OAuth/service-account credentials.
- Add transcription handling (Deepgram/AssemblyAI) and persist transcripts for reuse.
- Layer LinkedIn + press release generation routes and surface them in the UI.
- Extend the pass-driven environment workflow as more runtime secrets are introduced.

With the full stack aligned to `2025-market-overload`, `npm run dev` now spins up a working Next.js app that previews Sonix’s ingestion pipeline. Use this as the foundation for the AI generation milestones.***
