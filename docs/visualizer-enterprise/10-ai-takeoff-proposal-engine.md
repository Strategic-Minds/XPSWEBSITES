# AI Document Scanner, Takeoff, And Proposal Engine

## Objective

Prepare the system for a future paperless XPS/National Concrete Polishing workflow that can intake bid documents, create accurate takeoffs, validate them, prepare proposals, route to human review, send approved proposal packets, and follow up persistently.

This is scaffolded for future use and must not mutate Drive, Gmail, Calendar, Tasks, CRM, or customer records until approved.

## Primary Workflow

1. Bid request arrives through a designated email inbox.
2. Documents are scanned from phone, scanner, email, attachment, or Drive.
3. System creates or finds the project folder.
4. Documents are OCR'd, classified, and organized.
5. AI extracts measurement candidates and scope terms.
6. Takeoff draft is created with categories, subtotals, totals, and itemizations.
7. Independent validation performs a triple-check:
   - AI reviewer check.
   - Rule/math check.
   - Scope/document consistency check.
8. Final takeoff is stored in the project folder.
9. Scope documents are matched against takeoff totals.
10. Proposal template is populated with approved scope language.
11. Proposal QA agent checks files, checklist, takeoff, proposal, calendar, and task state.
12. Human receives final review email and checklist.
13. Approved proposal email is sent with required attachments.
14. Proposal record is stored.
15. Follow-up email and call chain is scheduled until accepted, denied, or closed.

## Implemented Scaffold

- `app/api/documents/intake/route.ts`
- `app/api/takeoff/proposal/route.ts`

Both routes are non-mutating and disabled by default.

## 48-Hour SLA

Standard target: finalized proposal within 48 hours of bid request receipt.

Required system support:

- Intake timestamp.
- Bid due date extraction.
- Proposal deadline calculation.
- Calendar reminder.
- Daily human review queue.
- Escalation if the 48-hour target is at risk.

## Project Folder Standard

Recommended Drive folders:

- `01_Bid_Request`
- `02_Plans`
- `03_Scopes`
- `04_Takeoff`
- `05_Proposal`
- `06_QA`
- `07_Client_Submission`
- `08_Follow_Up`
- `09_Receipts`

## Takeoff Accuracy Standard

The system must not claim final accuracy from one model pass.

Required:

- Source document reference per measurement.
- Confidence score per extracted value.
- Units normalized.
- Subtotals and totals recalculated independently.
- Scope keywords matched against categories.
- Human review before client submission.

## Future Commercialization

The takeoff/proposal engine can later become an add-on feature for XPS customers, installers, franchise/store users, or internal NCP operations.

## Missing Inputs

- Final proposal templates.
- Standard job scope specifications.
- Category dictionary.
- Pricing rules.
- Bid email address.
- Follow-up cadence.
- Human review time of day.
- Required attachment packet.
- Legal/insurance/company document library.
