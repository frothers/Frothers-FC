const path = require('node:path');
const vscode = require('vscode');
const { collectXiNamesFromWorkspace } = require('./xiSuggestions');

let cachedNames = [];

async function refreshXiNames() {
  const workspaceRoot = vscode.workspace.workspaceFolders?.[0]?.uri?.fsPath;
  const contentRoot = workspaceRoot
    ? path.join(workspaceRoot, 'content', 'posts')
    : path.resolve(__dirname, '../../content/posts');

  cachedNames = await collectXiNamesFromWorkspace(contentRoot);
  return cachedNames;
}

function isXiCompletionContext(document, position) {
  if (!document.fileName.includes('/content/posts/') && !document.fileName.includes('\\content\\posts\\')) {
    return false;
  }

  const beforeCursor = document.getText(new vscode.Range(new vscode.Position(0, 0), position));
  const afterCursor = document.getText(new vscode.Range(position, new vscode.Position(document.lineCount, 0)));

  const isInFrontMatterArray = /xi_and_subs\s*=\s*\[[\s\S]*$/m.test(beforeCursor);
  const closesArrayAfterCursor = /\]/.test(afterCursor.slice(0, 200));
  return isInFrontMatterArray && !closesArrayAfterCursor;
}

async function provideCompletionItems(document, position) {
  if (!isXiCompletionContext(document, position)) {
    return [];
  }

  const availableNames = cachedNames.length > 0 ? cachedNames : await refreshXiNames();
  const currentWord = document.getText(document.getWordRangeAtPosition(position)) || '';
  const currentText = currentWord.replace(/['"\s]/g, '').toLowerCase();

  const items = availableNames
    .filter((name) => {
      if (!currentText) {
        return true;
      }

      return name.toLowerCase().includes(currentText);
    })
    .map((name) => {
      const item = new vscode.CompletionItem(name, vscode.CompletionItemKind.EnumMember);
      item.detail = 'Existing Frothers XI name';
      item.insertText = `"${name}",`;
      item.filterText = name;
      item.sortText = name;
      return item;
    });

  return items;
}

async function activate(context) {
  const refreshCommand = vscode.commands.registerCommand('frothersXiCompletion.refresh', async () => {
    const names = await refreshXiNames();
    vscode.window.showInformationMessage(`Loaded ${names.length} Frothers XI names.`);
  });

  context.subscriptions.push(refreshCommand);
  context.subscriptions.push(
    vscode.languages.registerCompletionItemProvider(
      { scheme: 'file', language: 'markdown' },
      { provideCompletionItems },
      '"',
      "'",
      ',',
      ' '
    )
  );

  await refreshXiNames();
}

module.exports = {
  activate,
};
