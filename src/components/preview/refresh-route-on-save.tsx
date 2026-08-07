"use client";

import { RefreshRouteOnSave as PayloadLivePreview } from "@payloadcms/live-preview-react";
import { useRouter } from "next/navigation";

// ---------------------------------------------------------------------------
// En modo borrador: escucha los guardados del panel (autosave cada 375 ms)
// y refresca la ruta para que la vista previa se actualice al instante.
// ---------------------------------------------------------------------------

export function RefreshRouteOnSave() {
  const router = useRouter();
  return (
    <PayloadLivePreview
      refresh={() => router.refresh()}
      serverURL={process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost:3000"}
    />
  );
}
