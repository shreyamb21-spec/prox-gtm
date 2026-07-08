"use client";

import { useState } from "react";
import { getSessionSnapshot } from "@/lib/session-store";
import { buildCampaignFiles } from "@/lib/export-markdown";

export function ExportButton() {
  const [busy, setBusy] = useState(false);

  async function download() {
    setBusy(true);
    try {
      const [{ default: JSZip }, { saveAs }] = await Promise.all([
        import("jszip"),
        import("file-saver"),
      ]);
      const zip = new JSZip();
      const files = buildCampaignFiles(getSessionSnapshot());
      for (const [path, content] of Object.entries(files)) {
        zip.file(path, content);
      }
      const blob = await zip.generateAsync({ type: "blob" });
      saveAs(blob, "campaign.zip");
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      onClick={download}
      disabled={busy}
      className="font-mono text-[14px] bg-accent text-paper px-6 py-3 rounded disabled:opacity-40"
    >
      {busy ? "building zip" : "download campaign.zip"}
    </button>
  );
}
