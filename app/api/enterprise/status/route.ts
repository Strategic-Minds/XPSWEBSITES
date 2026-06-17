import { buildStatusReceipt, readAiGatewayConfig, readEnterpriseFlags } from "../../../lib/enterprise-system";

export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({
    ...buildStatusReceipt(),
    flags: readEnterpriseFlags(),
    aiGateway: readAiGatewayConfig()
  });
}
