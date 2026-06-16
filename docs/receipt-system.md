# Automation Receipt System

Every important automated or human-approved step should create a machine-readable receipt.

## Receipt Events

- build
- deploy
- validation
- owner approval
- estimate sent
- proposal signed
- payment received
- schedule approved
- job completed
- rollback

## Storage

Receipts should be written to:

1. Supabase `automation_receipts`
2. Phoenix Drive receipt archive
3. GitHub commit/status reference when the event involves code

## Schema

Use `schemas/receipt.schema.json` for event payload validation.

## No Secrets

Receipts may include ids, status, URLs, timestamps, and summaries. They must not include API keys, payment card data, private tokens, or provider secrets.
