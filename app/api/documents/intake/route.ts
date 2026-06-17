export const dynamic = "force-dynamic";

type DocumentIntakeRequest = {
  source?: "phone_scan" | "scanner" | "email" | "attachment" | "drive";
  projectName?: string;
  fileNames?: string[];
  requestedBy?: string;
};

export async function POST(request: Request) {
  if (process.env.DOCUMENT_SCANNER_ENABLED !== "true") {
    return Response.json({
      ok: false,
      status: "approval_gated",
      message: "Document intake is scaffolded but disabled. No files were stored, moved, scanned, or organized."
    }, { status: 403 });
  }

  let payload: DocumentIntakeRequest;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ ok: false, status: "invalid_json" }, { status: 400 });
  }

  const projectName = payload.projectName?.trim() || "Unassigned Project";
  const fileNames = payload.fileNames ?? [];

  return Response.json({
    ok: true,
    status: "intake_planned",
    projectName,
    source: payload.source ?? "attachment",
    requestedBy: payload.requestedBy ?? "unknown",
    fileCount: fileNames.length,
    plannedDriveStructure: {
      root: "XPS / Projects / Active / <project>",
      folders: ["01_Bid_Request", "02_Plans", "03_Scopes", "04_Takeoff", "05_Proposal", "06_QA", "07_Client_Submission", "08_Follow_Up", "09_Receipts"]
    },
    nextPipeline: [
      "ocr_and_classify_documents",
      "extract_scope_and_measurement_candidates",
      "create_takeoff_draft",
      "triple_check_takeoff",
      "match_scope_to_takeoff",
      "prepare_proposal_packet",
      "route_to_human_review"
    ],
    note: "This route returns a governed plan only. Drive writes and document processing require approved connector scopes and project folder policy."
  });
}
