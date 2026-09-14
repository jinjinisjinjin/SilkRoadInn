import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { runInNewContext } from "node:vm";

const root = resolve(import.meta.dirname, "..");
const context = { window: {} };
runInNewContext(readFileSync(resolve(root, "historical-notes.js"), "utf8"), context);

const notes = context.window.SilkRoadHistoricalNotes;
const orders = JSON.parse(readFileSync(resolve(root, "data/orders.json"), "utf8")).orders;
const milestones = JSON.parse(readFileSync(resolve(root, "data/progression.json"), "utf8")).milestones;
const orderById = new Map(orders.map((order) => [order.id, order]));
const milestoneById = new Map(milestones.map((milestone) => [milestone.id, milestone]));

assert.equal(notes.length, 3, "The pilot should contain exactly three notes.");
assert.equal(new Set(notes.map((note) => note.id)).size, notes.length, "Note IDs must be unique.");

for (const note of notes) {
  assert.ok(note.id && note.kind && note.title && note.teaser, `Missing heading in ${note.id}.`);
  assert.ok(note.evidence && note.reconstruction && note.fiction, `Missing historical boundary in ${note.id}.`);
  assert.ok(note.glyph && note.clueLabel && note.clueTitle, `Missing concrete historical clue in ${note.id}.`);
  assert.ok(note.question && note.feedback && note.takeaway, `Missing learning prompt or feedback in ${note.id}.`);
  assert.ok(Array.isArray(note.choices) && note.choices.length >= 2, `Missing judgment choices in ${note.id}.`);
  assert.equal(new Set(note.choices).size, note.choices.length, `Duplicate judgment choices in ${note.id}.`);
  assert.ok(Number.isInteger(note.answerIndex) && note.answerIndex >= 0 && note.answerIndex < note.choices.length,
    `Invalid answer index in ${note.id}.`);
  assert.ok(Array.isArray(note.sources) && note.sources.length > 0, `Missing sources in ${note.id}.`);
  for (const source of note.sources) {
    assert.ok(source.label && new URL(source.url).protocol === "https:", `Invalid source in ${note.id}.`);
  }
  assert.notEqual(Boolean(note.orderId), Boolean(note.repairId), `Note ${note.id} needs exactly one unlock trigger.`);
  if (note.orderId) {
    assert.equal(orderById.get(note.orderId)?.chapter, note.chapter, `Order chapter mismatch in ${note.id}.`);
    assert.equal(orderById.get(note.orderId)?.oneTime, true, `Traveler note ${note.id} must use a one-time order.`);
  }
  if (note.repairId) {
    assert.equal(milestoneById.get(note.repairId)?.chapter, note.chapter, `Repair chapter mismatch in ${note.id}.`);
    assert.ok(note.markerLabel, `Repair note ${note.id} needs a map marker label.`);
  }
}

console.log(`Historical note validation passed: ${notes.length} notes with valid triggers, labels, and sources.`);
