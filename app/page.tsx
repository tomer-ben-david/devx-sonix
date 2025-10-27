import { PipelineDemo } from "@/components/PipelineDemo";
import { TRPCProvider } from "@/lib/trpc/Provider";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-12 px-6 py-16">
      <header className="space-y-4">
        <p className="text-sm uppercase tracking-[0.32em] text-brand">Milestone M1</p>
        <h1 className="text-4xl font-semibold text-white md:text-5xl">
          Sonix turns meeting recordings into launch-ready narratives.
        </h1>
        <p className="max-w-3xl text-base text-slate-400 md:text-lg">
          The M1 skeleton wires up Google Drive ingestion and a deep-research stub
          behind a typed tRPC surface. Use the controls below to explore how Sonix
          will orchestrate assets ahead of LinkedIn + press release generation in
          the next milestone.
        </p>
      </header>

      <TRPCProvider>
        <PipelineDemo />
      </TRPCProvider>
    </main>
  );
}
