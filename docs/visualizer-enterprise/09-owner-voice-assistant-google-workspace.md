# Owner Voice Assistant And Google Workspace Plan

## Objective

Create a dedicated executive assistant for Chris Lavin that can eventually operate by voice only and explain system status in plain language.

## Owner Requirements

- Chris Lavin is the primary owner/operator.
- Voice-only operation must be the primary interface.
- Technical information must be explained in layman's terms.
- The assistant must support email, calendar, task, project, and system-status workflows.
- ChatGPT Business will have a dedicated account for this system.

## Assistant Personality And Capability Standard

- Calm, direct, human, and concise.
- No jargon unless asked.
- Gives clear next actions.
- Separates what is done from what is pending.
- Never claims an email, calendar event, Drive write, call, or production change happened unless the connected tool confirms it.
- Routes consequential actions through approval gates.

## Implemented Scaffold

- Route: `app/api/ai/owner-assistant/route.ts`
- Disabled by default with `OWNER_ASSISTANT_ENABLED`.
- Uses Vercel AI Gateway when enabled.
- Requires `AI_GATEWAY_PRIMARY_MODEL` to be Groq-prefixed and `AI_GATEWAY_FALLBACK_MODELS` to include OpenAI-prefixed fallback.
- Designed for voice, chat, email, and calendar channels.

## Voice Scaffold

- Route: `app/api/voice/twilio/route.ts`
- Disabled by default with `TWILIO_VOICE_ASSISTANT_ENABLED`.
- Inbound receptionist scaffold returns TwiML.
- Outbound appointment setting remains approval-gated.
- Voice quality and provider selection must be validated with real call tests before launch.

## Google Workspace Scope

Future connected capabilities:

- Gmail: read bid requests, draft replies, send approved proposal emails.
- Drive: create project folders, organize scans, store takeoffs/proposals/receipts.
- Calendar: assign proposal deadlines, project milestones, owner review blocks.
- Google Tasks: create follow-up tasks, checklist tasks, proposal QA tasks.

## Approval Gates

Before live Workspace actions:

1. Confirm dedicated Workspace account and scopes.
2. Confirm project folder hierarchy.
3. Confirm email aliases and bid-request inbox.
4. Confirm calendar names and task lists.
5. Confirm proposal review schedule.
6. Confirm which actions may be automatic and which require approval.
7. Run dry-run receipts before sending or writing anything live.

## Immediate Next Step

Keep the assistant route disabled until AI Gateway model env, Workspace scopes, Twilio policy, and owner approval flow are verified.
