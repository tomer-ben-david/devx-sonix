'use client';

import { useState } from 'react';
import { api } from '@/lib/trpc/client';

const DEFAULT_FOLDER_ID = 'demo-folder';

export function PipelineDemo() {
  const [folderId, setFolderId] = useState(DEFAULT_FOLDER_ID);
  const [summary, setSummary] = useState(
    'Product roadmap sync covering generative content pipeline',
  );
  const [keywords, setKeywords] = useState('LinkedIn, press release, AI automation');
  const [mimeTypes, setMimeTypes] = useState('video/mp4,audio/mp4');

  const {
    data: assets,
    isLoading: assetsLoading,
    refetch: refetchAssets,
  } = api.pipeline.listMeetingAssets.useQuery(
    {
      folderId,
      mimeTypes: mimeTypes
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
    },
    {
      enabled: folderId.trim().length > 0,
    },
  );

  const bundleMutation = api.pipeline.buildContentBundle.useMutation();

  const handleBuildBundle = async () => {
    await bundleMutation.mutateAsync({
      folderId,
      summary,
      keywords: keywords
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
      mimeTypes: mimeTypes
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
    });
  };

  const bundle = bundleMutation.data;

  return (
    <section className="mx-auto max-w-4xl space-y-6 rounded-2xl border border-slate-800 bg-slate-900/50 p-8 backdrop-blur">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-white">
          Meeting Pipeline Preview
        </h2>
        <p className="text-sm text-slate-400">
          Connect a Drive folder, add a working summary, and Sonix assembles the
          assets + research brief that power LinkedIn and PR generation in the
          next milestone.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm">
          <span className="text-slate-300">Drive Folder ID</span>
          <input
            value={folderId}
            onChange={(event) => setFolderId(event.target.value)}
            placeholder="drive-folder-id"
            className="rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-slate-100 outline-none transition-colors focus:border-brand"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm">
          <span className="text-slate-300">Allowed Mime Types</span>
          <input
            value={mimeTypes}
            onChange={(event) => setMimeTypes(event.target.value)}
            placeholder="video/mp4,audio/mpeg"
            className="rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-slate-100 outline-none transition-colors focus:border-brand"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm md:col-span-2">
          <span className="text-slate-300">Meeting Summary Seed</span>
          <textarea
            value={summary}
            onChange={(event) => setSummary(event.target.value)}
            rows={3}
            className="rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-slate-100 outline-none transition-colors focus:border-brand"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm md:col-span-2">
          <span className="text-slate-300">Keywords (comma separated)</span>
          <input
            value={keywords}
            onChange={(event) => setKeywords(event.target.value)}
            placeholder="LinkedIn, PR, launch"
            className="rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-slate-100 outline-none transition-colors focus:border-brand"
          />
        </label>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => refetchAssets()}
          className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-slate-100 transition hover:bg-slate-700"
        >
          Refresh Assets
        </button>
        <button
          type="button"
          onClick={handleBuildBundle}
          className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-brand-dark hover:text-white"
        >
          Build Content Bundle
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
            Drive Assets
          </h3>
          <div className="mt-2 space-y-3 rounded-xl border border-slate-800 bg-slate-950/60 p-4">
            {assetsLoading && <p className="text-sm text-slate-500">Loading…</p>}
            {!assetsLoading && (!assets || assets.length === 0) && (
              <p className="text-sm text-slate-500">
                No assets found. Connect a folder or adjust filters.
              </p>
            )}
            {assets?.map((asset) => (
              <div key={asset.id} className="rounded-lg border border-slate-800 p-3">
                <p className="text-sm font-medium text-white">{asset.name}</p>
                <p className="text-xs text-slate-500">{asset.mimeType}</p>
                {asset.webViewLink ? (
                  <a
                    href={asset.webViewLink}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-block text-xs text-brand hover:text-brand-dark"
                  >
                    Open in Drive →
                  </a>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
            Research Brief
          </h3>
          <div className="mt-2 space-y-3 rounded-xl border border-slate-800 bg-slate-950/60 p-4">
            {!bundle && (
              <p className="text-sm text-slate-500">
                Trigger &ldquo;Build Content Bundle&rdquo; to generate a research brief.
              </p>
            )}
            {bundle?.research.insights.map((insight) => (
              <p key={insight} className="text-sm text-slate-300">
                {insight}
              </p>
            ))}
            {bundle?.research.sources.length ? (
              <ul className="space-y-2">
                {bundle.research.sources.map((source) => (
                  <li key={source.url} className="rounded-md border border-slate-800 p-3">
                    <p className="text-sm font-medium text-white">{source.title}</p>
                    <p className="text-xs text-slate-500">{source.keyTakeaway}</p>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
