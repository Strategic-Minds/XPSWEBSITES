# XPS Flooring OS Validation Agent Draft

Status: DRAFT ONLY

Each validation agent must produce:

- `status`
- `evidence`
- `screenshots_or_log_refs`
- `pass_fail`
- `blocker_level`
- `recommended_fix`
- `receipt_id`

## Agents

1. `01_UI_VISUAL_VALIDATION_AGENT`
2. `02_ROUTE_HEALTH_AGENT`
3. `03_SUPABASE_SCHEMA_AGENT`
4. `04_RLS_SECURITY_AGENT`
5. `05_UPLOAD_PIPELINE_AGENT`
6. `06_TWILIO_SMS_AGENT`
7. `07_AI_GATEWAY_AGENT`
8. `08_WORKFLOW_CRON_AGENT`
9. `09_PWA_INSTALLABILITY_AGENT`
10. `10_RELEASE_READINESS_AGENT`

## Release Validation Checklist

- Homepage loads.
- Mobile PWA loads.
- Quote upload works in sandbox.
- Visualizer result can be saved.
- Lead is created in Supabase sandbox/branch.
- SMS event logs in demo mode.
- Portal project is created.
- Tracker stages render.
- Installer app check-in works.
- RLS blocks unauthorized access.
- Cron writes receipt.
- No secrets exposed.

## Blocked Until Approval

- Production runtime validation against real customer data.
- Live SMS validation.
- Payment flow validation with real funds.
- Production cron launch.
