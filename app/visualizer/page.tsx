import { FinishVisualizer } from "../components/FinishVisualizer";
import { EnterpriseVisualizerShell } from "../components/visualizer/EnterpriseVisualizerShell";
import type { FeatureFlags } from "../components/visualizer/types";

export default function VisualizerPage() {
  const enterpriseEnabled = process.env.VISUALIZER_ENTERPRISE_ENABLED !== "false";
  const flags: FeatureFlags = {
    aiSegmentation: process.env.NEXT_PUBLIC_VISUALIZER_AI_SEGMENTATION_ENABLED === "true" || process.env.VISUALIZER_AI_ENABLED === "true",
    scenes3d: process.env.NEXT_PUBLIC_VISUALIZER_3D_SCENES_ENABLED === "true",
    quoteUpload: process.env.NEXT_PUBLIC_VISUALIZER_QUOTE_UPLOAD_ENABLED === "true" || process.env.VISUALIZER_QUOTE_UPLOAD_ENABLED === "true",
    customBlend: process.env.NEXT_PUBLIC_VISUALIZER_CUSTOM_BLEND_ENABLED === "true",
    analytics: process.env.NEXT_PUBLIC_VISUALIZER_ANALYTICS_ENABLED === "true",
    debugOverlay: process.env.NEXT_PUBLIC_VISUALIZER_DEBUG_OVERLAY_ENABLED === "true"
  };

  if (!enterpriseEnabled) {
    return (
      <main className="phoenix-site visualizer-page">
        <a href="/" className="back-link">Back to Phoenix Epoxy Pros</a>
        <FinishVisualizer />
      </main>
    );
  }

  return <EnterpriseVisualizerShell flags={flags} />;
}
