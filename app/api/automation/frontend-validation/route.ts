import { buildFrontendAutomationReceipt } from "../../../lib/enterprise-system";

export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json(buildFrontendAutomationReceipt());
}
