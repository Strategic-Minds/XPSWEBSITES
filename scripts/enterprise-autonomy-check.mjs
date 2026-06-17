import { existsSync, readFileSync } from "node:fs";

const requiredFiles = [
  "app/page.tsx",
  "app/design/page.tsx",
  "app/floor-design-center/page.tsx",
  "app/quote/design/page.tsx",
  "app/customer-portal/page.tsx",
  "app/customer-portal/dashboard/page.tsx",
  "app/customer-portal/projects/[projectId]/page.tsx",
  "app/installer/page.tsx",
  "app/installer/jobs/[jobId]/page.tsx",
  "app/ops/page.tsx",
  "app/components/phoenix/PhoenixEnterpriseScreens.tsx",
  "app/lib/phoenix-demo-data.ts",
  "app/api/automation/frontend-validation/route.ts"
];

const requiredTokens = [
  ["app/components/phoenix/PhoenixEnterpriseScreens.tsx", "PublicQuoteLanding"],
  ["app/components/phoenix/PhoenixEnterpriseScreens.tsx", "FloorDesignCenter"],
  ["app/components/phoenix/PhoenixEnterpriseScreens.tsx", "ProjectDesignQuoteCenter"],
  ["app/components/phoenix/PhoenixEnterpriseScreens.tsx", "CustomerDashboard"],
  ["app/components/phoenix/PhoenixEnterpriseScreens.tsx", "InstallerPwa"],
  ["app/components/phoenix/PhoenixEnterpriseScreens.tsx", "OpsCommandCenter"],
  ["app/lib/phoenix-demo-data.ts", "mockupTargets"],
  ["app/api/automation/frontend-validation/route.ts", "buildFrontendAutomationReceipt"]
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

const receipt = {
  ok: failures.length === 0,
  checkedAt: new Date().toISOString(),
  mode: "branch_safe_static_validation",
  requiredFiles: requiredFiles.length,
  failures,
  nextActions: failures.length === 0
    ? ["Run Next.js build", "Run browser-worker desktop/mobile screenshots", "Compare against Drive baselines"]
    : ["Repair missing files or tokens", "Re-run npm run validate:enterprise"]
};

console.log(JSON.stringify(receipt, null, 2));
process.exit(failures.length === 0 ? 0 : 1);
