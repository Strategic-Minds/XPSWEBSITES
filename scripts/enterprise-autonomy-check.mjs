import { existsSync, readFileSync } from "node:fs";

const requiredFiles = [
  "app/page.tsx",
  "app/layout.tsx",
  "app/globals.css",
  "app/components/LocalBusinessSchema.tsx",
  "public/national-epoxy-pros-logo.svg",
  "public/national-epoxy-hero.svg",
  "public/manifest.json",
  "public/sw.js",
  "README.md"
];

const requiredTokens = [
  ["app/page.tsx", "National Epoxy Pros"],
  ["app/page.tsx", "leads@nationalepoxypros.com"],
  ["app/page.tsx", "support@nationalepoxypros.com"],
  ["app/page.tsx", "sales@nationalepoxypros.com"],
  ["app/page.tsx", "(877) 958-6408"],
  ["app/page.tsx", "xtremepolishingsystems.com/pages/flake-visualizer"],
  ["app/page.tsx", "70+"],
  ["app/layout.tsx", "National Epoxy Pros"],
  ["app/components/LocalBusinessSchema.tsx", "HomeAndConstructionBusiness"],
  ["app/components/LocalBusinessSchema.tsx", "leads@nationalepoxypros.com"],
  ["README.md", "National Epoxy Pros"],
  ["README.md", "npm run validate"]
];

const forbiddenTokens = [
  ["app/page.tsx", "Phoenix Epoxy Pros"],
  ["app/layout.tsx", "Phoenix Epoxy Pros"],
  ["README.md", "Phoenix Epoxy Pros"],
  ["scripts/enterprise-autonomy-check.mjs", "PhoenixEnterpriseScreens"],
  ["scripts/enterprise-autonomy-check.mjs", "phoenix-demo-data"]
];

const failures = [];

for (const file of requiredFiles) {
  if (!existsSync(file)) failures.push(`Missing required file: ${file}`);
}

for (const [file, token] of requiredTokens) {
  if (!existsSync(file)) continue;
  const body = readFileSync(file, "utf8");
  if (!body.includes(token)) failures.push(`Missing token ${token} in ${file}`);
}

for (const [file, token] of forbiddenTokens) {
  if (!existsSync(file)) continue;
  const body = readFileSync(file, "utf8");
  if (body.includes(token)) failures.push(`Forbidden legacy token ${token} remains in ${file}`);
}

const receipt = {
  ok: failures.length === 0,
  checkedAt: new Date().toISOString(),
  mode: "national_epoxy_pros_static_validation",
  requiredFiles: requiredFiles.length,
  requiredTokens: requiredTokens.length,
  forbiddenTokens: forbiddenTokens.length,
  failures,
  nextActions: failures.length === 0
    ? [
        "Run Next.js build",
        "Run desktop and mobile browser snapshots",
        "Validate lead capture handoff without relying on mailto-only forms",
        "Validate PWA installability and service worker caching"
      ]
    : [
        "Repair missing National Epoxy Pros files or tokens",
        "Add missing PWA manifest/service worker evidence if PWA remains in scope",
        "Replace mailto-only form handling with a durable lead intake route before release",
        "Re-run npm run validate:enterprise"
      ]
};

console.log(JSON.stringify(receipt, null, 2));
process.exit(failures.length === 0 ? 0 : 1);
