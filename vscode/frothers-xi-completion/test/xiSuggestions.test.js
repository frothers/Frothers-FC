const assert = require('node:assert/strict');
const test = require('node:test');
const { parseXiNamesFromMarkdown, dedupeNames, collectXiNamesFromWorkspace } = require('../src/xiSuggestions');

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

test('collects names across post files in the workspace', async () => {
  const names = await collectXiNamesFromWorkspace('/home/chris/Frothers-FC/content/posts');
  assert.ok(names.includes('Tom'));
  assert.ok(names.includes('Charles Daily'));
  assert.ok(names.includes('Farshid Shokoohi'));
  assert.ok(names.length > 20);
});
