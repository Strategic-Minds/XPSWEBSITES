import { buildStatusReceipt, readEnterpriseFlags } from "../../../lib/enterprise-system";

export const dynamic = "force-dynamic";

type OpsTickReceipt = {
  ok: boolean;
  checkedAt: string;
  schedule: "*/5 * * * *";
  mode: "status_only" | "branch_safe_diagnosis" | "blocked";
  autonomousActions: string[];
  blockers: string[];
};

export async function GET(request: Request) {
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.get("authorization");

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const flags = readEnterpriseFlags();
  const status = buildStatusReceipt();
  const autonomousActions = [
    "auto_analyze_status",
    "auto_diagnose_blockers",
    "auto_validate_visualizer_contract",
    "auto_prepare_branch_safe_fix_plan",
    "auto_record_evidence_receipt"
  ];

  const mode: OpsTickReceipt["mode"] = flags.autoOps ? "branch_safe_diagnosis" : "status_only";
  const blockers = [
    ...status.blockers,
    ...(flags.autoFix ? ["Auto-fix is enabled, but production mutation remains approval-gated."] : [])
  ];

  const receipt: OpsTickReceipt = {
    ok: blockers.length === 0,
    checkedAt: new Date().toISOString(),
    schedule: "*/5 * * * *",
    mode,
    autonomousActions,
    blockers
  };

  return Response.json(receipt, { status: blockers.length > 0 ? 207 : 200 });
}
