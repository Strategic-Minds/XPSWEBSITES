export const dynamic = "force-dynamic";

type TakeoffProposalRequest = {
  projectName?: string;
  bidDueAt?: string;
  categories?: string[];
  scopeSummary?: string;
};

export async function POST(request: Request) {
  if (process.env.TAKEOFF_ENGINE_ENABLED !== "true" || process.env.PROPOSAL_ENGINE_ENABLED !== "true") {
    return Response.json({
      ok: false,
      status: "approval_gated",
      message: "Takeoff and proposal engine is scaffolded but disabled. No takeoff, proposal, email, calendar event, or Drive write was performed."
    }, { status: 403 });
  }

  let payload: TakeoffProposalRequest;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ ok: false, status: "invalid_json" }, { status: 400 });
  }

  const projectName = payload.projectName?.trim() || "Unassigned Project";

  return Response.json({
    ok: true,
    status: "proposal_workflow_planned",
    projectName,
    bidDueAt: payload.bidDueAt ?? "not_set",
    categories: payload.categories ?? ["surface_prep", "polishing", "coatings", "repairs", "joint_fill", "moisture_mitigation", "traffic_control", "mobilization"],
    workflow: [
      { step: "document_scan", target: "plans, specs, bid request, addenda, scope emails" },
      { step: "measurement_extraction", target: "areas, linear feet, counts, alternates, exclusions" },
      { step: "takeoff_draft", target: "categorized quantities with subtotals and totals" },
      { step: "triple_check", target: "independent AI checks plus rule-based total validation" },
      { step: "scope_match", target: "compare final takeoff against scanned scope documents" },
      { step: "proposal_generation", target: "approved proposal template plus XPS/NCP standard scope language" },
      { step: "qa_agent_review", target: "proposal, checklist, docs, takeoff, calendar, and project folder" },
      { step: "human_review", target: "mandatory final human approval before sending" },
      { step: "client_submission", target: "proposal email with required attachments after approval" },
      { step: "follow_up_chain", target: "persistent email/phone follow-up until accepted, denied, or closed" }
    ],
    sla: "Proposal target is 48 hours after bid request receipt unless overridden by a project policy.",
    note: "This route is intentionally non-mutating until document storage, Gmail, Calendar, Tasks, proposal templates, approval policy, and follow-up timing are approved."
  });
}
