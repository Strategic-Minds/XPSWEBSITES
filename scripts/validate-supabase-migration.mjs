import { readFile } from "node:fs/promises";

const sql = await readFile("supabase/migrations/0001_initial_schema.sql", "utf8");
const requiredTables = [
  "locations", "customers", "leads", "lead_images", "estimates", "estimate_line_items",
  "jobs", "job_timeline_events", "proposals", "payments", "schedule_requests",
  "change_orders", "color_approvals", "progress_photos", "completion_forms",
  "warranty_deliveries", "automation_receipts", "audit_log"
];

for (const table of requiredTables) {
  if (!sql.includes(`create table ${table}`)) {
    throw new Error(`Missing table: ${table}`);
  }
}

if (/API_KEY|SECRET_KEY|SERVICE_ROLE_KEY\s*=/.test(sql)) {
  throw new Error("Migration must not contain secrets.");
}

console.log("Supabase migration validation passed.");
