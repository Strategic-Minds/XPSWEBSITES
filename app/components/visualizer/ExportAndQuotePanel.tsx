"use client";

import type { FinishOption } from "../../data/finish-options";
import type { QuotePreviewPayload, VisualizerControlsState } from "./types";

type ExportAndQuotePanelProps = {
  canExport: boolean;
  finish: FinishOption;
  controls: VisualizerControlsState;
  imageName: string;
  onExport: () => string | null;
  onQuotePrepared: (payload: QuotePreviewPayload) => void;
  preparedQuote: QuotePreviewPayload | null;
  quoteUploadEnabled: boolean;
};

export function ExportAndQuotePanel({ canExport, finish, controls, imageName, onExport, onQuotePrepared, preparedQuote, quoteUploadEnabled }: ExportAndQuotePanelProps) {
  function handleDownload() {
    const dataUrl = onExport();
    if (!dataUrl) return;
    const anchor = document.createElement("a");
    anchor.href = dataUrl;
    anchor.download = `xps-floor-preview-${Date.now()}.png`;
    anchor.click();
  }

  function handlePrepareQuote() {
    const dataUrl = onExport();
    if (!dataUrl) return;
    onQuotePrepared({
      previewDataUrl: dataUrl,
      finish,
      controls,
      imageName,
      preparedAt: new Date().toISOString()
    });
  }

  return (
    <section className="ev-panel" aria-label="Export and quote">
      <div>
        <p className="ev-kicker">Step 5</p>
        <h2>Export Or Quote</h2>
        <p className="ev-muted">Export works locally. Quote upload stays gated until storage and CRM targets are approved.</p>
      </div>
      <div className="ev-control-row">
        <button disabled={!canExport} onClick={handleDownload} type="button">Export PNG</button>
        <button disabled={!canExport} onClick={handlePrepareQuote} type="button">Use With Quote</button>
      </div>
      {preparedQuote ? (
        <div className="ev-quote-ready" role="status">
          <strong>Preview prepared for quote.</strong>
          <span>{preparedQuote.finish.name} · {preparedQuote.finish.family}</span>
          <small>{quoteUploadEnabled ? "Quote upload flag is enabled, but live CRM/storage still needs approval." : "Quote upload flag is off, so no customer image was uploaded."}</small>
        </div>
      ) : null}
    </section>
  );
}
