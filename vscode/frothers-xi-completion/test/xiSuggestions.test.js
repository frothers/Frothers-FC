const assert = require('node:assert/strict');
const test = require('node:test');
const { parseXiNamesFromMarkdown, dedupeNames, collectXiNamesFromWorkspace, isKnownXiName, normalizeXiName, FROTHERS_XI_NAMES } = require('../src/xiSuggestions');

const sample = `+++
xi_and_subs = [
  "Tom",
  "Charles Daily",
  "Tom",
  "Nikolai",
]
+++
`;

test('parses quoted xi_and_subs names from front matter', () => {
  assert.deepEqual(parseXiNamesFromMarkdown(sample), ['Tom', 'Charles Daily', 'Tom', 'Nikolai']);
});

test('deduplicates names while preserving first occurrence', () => {
  assert.deepEqual(dedupeNames(['Tom', 'Charles Daily', 'Tom', 'Nikolai']), ['Tom', 'Charles Daily', 'Nikolai']);
});

test('contains the curated XI list from the current repo snapshot', () => {
  assert.ok(FROTHERS_XI_NAMES.includes('Tom'));
  assert.ok(FROTHERS_XI_NAMES.includes('Charles Daily'));
  assert.ok(FROTHERS_XI_NAMES.includes('Farshid Shokoohi'));
  assert.ok(FROTHERS_XI_NAMES.length > 20);
});

test('normalizes names so typo checking is case and spacing safe', () => {
  assert.equal(normalizeXiName('  Tom  '), 'tom');
  assert.equal(normalizeXiName('Charles Daily'), 'charles daily');
  assert.equal(isKnownXiName('Tom'), true);
  assert.equal(isKnownXiName('T0m'), false);
});

test('only reads names from the xi_and_subs array, not the rest of the markdown text', () => {
  const markdown = `+++
notes = ["NotAPlayer"]
xi_and_subs = [
  "Tom",
  "Charles Daily",
  "Bad Name"
]
+++
`;

  assert.deepEqual(parseXiNamesFromMarkdown(markdown), ['Tom', 'Charles Daily', 'Bad Name']);
  assert.equal(isKnownXiName('NotAPlayer'), false);
});

test('collects names across post files in the workspace', async () => {
  const names = await collectXiNamesFromWorkspace('/home/chris/Frothers-FC/content/posts');
  assert.ok(names.includes('Tom'));
  assert.ok(names.includes('Charles Daily'));
  assert.ok(names.includes('Farshid Shokoohi'));
  assert.ok(names.length > 20);
});
