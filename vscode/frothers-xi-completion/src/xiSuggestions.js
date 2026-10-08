const fs = require('node:fs');
const path = require('node:path');
const { FROTHERS_XI_NAMES } = require('./frothersXiNames');

function normalizeXiName(value = '') {
  return String(value || '')
    .trim()
    .replace(/\s+/g, ' ')
    .toLowerCase();
}

function parseXiNamesFromMarkdown(markdown = '') {
  const matches = [...markdown.matchAll(/xi_and_subs\s*=\s*\[((?:.|\n)*?)\]/g)];
  const names = [];

  for (const match of matches) {
    const arrayContents = match[1] || '';
    const quotedNames = [...arrayContents.matchAll(/"((?:\\.|[^"\\])*)"/g)];

    for (const quotedName of quotedNames) {
      const value = quotedName[1].replace(/\\"/g, '"').trim();
      if (value) {
        names.push(value);
      }
    }
  }

  return names;
}

function dedupeNames(names = []) {
  const seen = new Set();
  const unique = [];

  for (const name of names) {
    const trimmedName = String(name || '').trim();
    if (!trimmedName || seen.has(trimmedName)) {
      continue;
    }

    seen.add(trimmedName);
    unique.push(trimmedName);
  }

  return unique;
}

function isKnownXiName(name = '') {
  const normalized = normalizeXiName(name);
  return FROTHERS_XI_NAMES.some((knownName) => normalizeXiName(knownName) === normalized);
}

async function collectXiNamesFromWorkspace(workspaceRoot) {
  const rootPath = workspaceRoot || path.resolve(__dirname, '../../content/posts');
  const discoveredNames = [];

  if (!fs.existsSync(rootPath)) {
    return [...FROTHERS_XI_NAMES].sort((a, b) => a.localeCompare(b));
  }

  async function walkDirectory(currentPath) {
    const entries = await fs.promises.readdir(currentPath, { withFileTypes: true });

    for (const entry of entries) {
      const nextPath = path.join(currentPath, entry.name);
      if (entry.isDirectory()) {
        await walkDirectory(nextPath);
        continue;
      }

      if (entry.isFile() && entry.name.toLowerCase().endsWith('.md')) {
        const fileContents = await fs.promises.readFile(nextPath, 'utf8');
        const names = parseXiNamesFromMarkdown(fileContents);
        discoveredNames.push(...names);
      }
    }
  }

  await walkDirectory(rootPath);
  return dedupeNames(discoveredNames).sort((a, b) => a.localeCompare(b));
}

module.exports = {
  parseXiNamesFromMarkdown,
  dedupeNames,
  isKnownXiName,
  normalizeXiName,
  collectXiNamesFromWorkspace,
  FROTHERS_XI_NAMES,
};
