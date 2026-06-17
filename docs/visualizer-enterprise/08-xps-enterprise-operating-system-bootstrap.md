# XPS Enterprise Operating System Bootstrap

## System Boundary

This build is no longer only a visualizer. It is the bootstrap layer for a locked, light-mode-primary PWA that can later operate as the XPS enterprise command system.

The visualizer remains the first revenue and conversion surface. The broader system is scaffolded behind flags and approval gates.

## Corporate Map

- Parent company: Xtreme Polishing Systems (XPS)
- Store network: XPS Xpress, 70+ nationwide and international stores
- Installation company: National Concrete Polishing
- Training school: Polished Concrete University
- Primary owner/operator: Chris Lavin
- Owner operating requirement: voice-only primary control, plain-language technical explanations

## Operating Modes

1. Visualizer Mode
2. Owner Voice Assistant Mode
3. Lead and Quote Mode
4. Project Intake Mode
5. AI Document Scanner Mode
6. AI Takeoff Mode
7. Proposal Mode
8. QA and Triple-Check Mode
9. Calendar and Task Mode
10. Follow-Up Mode
11. Social Automation Mode
12. Auto Analyze / Diagnose / Fix / Heal / Optimize / Evolve Mode

## Implemented Branch-Safe Scaffolds

- `app/lib/enterprise-system.ts`
- `app/api/enterprise/status/route.ts`
- `app/api/cron/enterprise-ops-tick/route.ts`
- `app/api/visualizer/browser-validation/route.ts`
- `app/api/ai/owner-assistant/route.ts`
- `app/api/voice/twilio/route.ts`
- `app/api/documents/intake/route.ts`
- `app/api/takeoff/proposal/route.ts`

## Enterprise Autonomy Rules

Allowed without further approval:

- Read-only status checks.
- Branch-safe diagnosis.
- Evidence receipts.
- Non-mutating plans.
- Disabled-route readiness reports.

Approval required:

- Production promotion.
- CRM mutation.
- Customer photo persistence.
- Sending email.
- Sending SMS.
- Placing outbound calls.
- Creating calendar events.
- Creating Google Tasks.
- Writing to Drive project folders.
- AI provider spending beyond approved limits.
- HeyGen video generation.
- Social posting.
- Database migrations or storage bucket creation.

## PWA Standard

- Light mode primary.
- Dark mode supported.
- Locked role-aware system.
- Mobile/tablet usable for field sales and owner voice control.
- No technical jargon for Chris-facing explanations.
- Every autonomous action produces an evidence receipt.

## Next Build Packet

The next packet should split implementation into parallel lanes:

1. Vizualizer parity lane.
2. Vercel automation and validation lane.
3. Owner assistant and voice lane.
4. Google Workspace operations lane.
5. Document/takeoff/proposal lane.
6. Storage/CRM/analytics lane.
7. Social automation lane.

Each lane must stay feature-flagged and preview-first until explicit approval.
