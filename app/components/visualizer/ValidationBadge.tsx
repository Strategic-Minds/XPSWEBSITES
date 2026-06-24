"use client";

import type { FeatureFlags } from "./types";

type ValidationBadgeProps = {
  flags: FeatureFlags;
  maskPointCount: number;
  hasImage: boolean;
  canExport: boolean;
};

export function ValidationBadge({ flags, maskPointCount, hasImage, canExport }: ValidationBadgeProps) {
  const checks = [
    { label: "Photo", ok: hasImage },
    { label: "Mask", ok: maskPointCount >= 3 },
    { label: "Export", ok: canExport },
    { label: "AI", ok: flags.aiSegmentation, muted: !flags.aiSegmentation },
    { label: "3D", ok: flags.scenes3d, muted: !flags.scenes3d },
    { label: "Blend", ok: flags.customBlend, muted: !flags.customBlend },
    { label: "Analytics", ok: flags.analytics, muted: !flags.analytics }
  ];

  return (
    <aside className="ev-validation" aria-label="Validation status">
      {checks.map((check) => (
        <span className={check.ok ? "ok" : check.muted ? "muted" : "pending"} key={check.label}>
          {check.label}
        </span>
      ))}
    </aside>
  );
}
