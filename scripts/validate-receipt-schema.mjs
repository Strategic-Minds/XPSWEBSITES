import { readFile } from "node:fs/promises";

const schema = JSON.parse(await readFile("schemas/receipt.schema.json", "utf8"));
const events = JSON.parse(await readFile("schemas/automation-events.json", "utf8"));
const enumValues = schema.properties.receipt_type.enum;

for (const event of events.events) {
  if (!enumValues.includes(event.type)) {
    throw new Error(`Receipt event ${event.type} is missing from receipt schema enum.`);
  }
  if (!event.drive_folder || !Array.isArray(event.required)) {
    throw new Error(`Receipt event ${event.type} must define drive_folder and required fields.`);
  }
}

console.log("Receipt schema validation passed.");
