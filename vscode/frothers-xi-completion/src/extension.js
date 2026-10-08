const vscode = require('vscode');
const { FROTHERS_XI_NAMES, isKnownXiName, normalizeXiName } = require('./xiSuggestions');

const diagnosticCollection = vscode.languages.createDiagnosticCollection('frothers-xi-completion');

function isXiPost(document) {
  return document.fileName.includes('/content/posts/') || document.fileName.includes('\\content\\posts\\');
}

function isXiCompletionContext(document, position) {
  if (!isXiPost(document)) {
    return false;
  }

  const beforeCursor = document.getText(new vscode.Range(new vscode.Position(0, 0), position));
  const afterCursor = document.getText(new vscode.Range(position, new vscode.Position(document.lineCount, 0)));

  const isInFrontMatterArray = /xi_and_subs\s*=\s*\[[\s\S]*$/m.test(beforeCursor);
  const closesArrayAfterCursor = /\]/.test(afterCursor.slice(0, 200));
  return isInFrontMatterArray && !closesArrayAfterCursor;
}

function updateXiDiagnostics(document) {
  if (!isXiPost(document)) {
    diagnosticCollection.delete(document.uri);
    return;
  }

  const text = document.getText();
  const diagnostics = [];
  const regex = /xi_and_subs\s*=\s*\[([\s\S]*?)\]/g;
  let match;

  while ((match = regex.exec(text)) !== null) {
    const arrayBody = match[1];
    const itemRegex = /"((?:\\.|[^"\\])*)"/g;
    let itemMatch;

    while ((itemMatch = itemRegex.exec(arrayBody)) !== null) {
      const value = itemMatch[1].replace(/\\"/g, '"').trim();
      if (!value) {
        continue;
      }

      if (!isKnownXiName(value)) {
        const startIndex = match.index + match[0].indexOf('[') + 1 + itemMatch.index;
        const start = document.positionAt(startIndex);
        const end = document.positionAt(startIndex + itemMatch[0].length);

        diagnostics.push(new vscode.Diagnostic(
          new vscode.Range(start, end),
          `Unknown XI name: "${value}". Check the spelling or add it to the approved list.`
        ));
      }
    }
  }

  diagnosticCollection.set(document.uri, diagnostics);
}

function provideCompletionItems(document, position) {
  if (!isXiCompletionContext(document, position)) {
    return [];
  }

  const currentWord = document.getText(document.getWordRangeAtPosition(position)) || '';
  const currentText = currentWord.replace(/['"\s]/g, '').toLowerCase();

  const items = FROTHERS_XI_NAMES
    .filter((name) => {
      if (!currentText) {
        return true;
      }

      return normalizeXiName(name).includes(currentText);
    })
    .map((name) => {
      const item = new vscode.CompletionItem(name, vscode.CompletionItemKind.EnumMember);
      item.detail = 'Approved Frothers XI name';
      item.insertText = `"${name}",`;
      item.filterText = name;
      item.sortText = name;
      return item;
    });

  return items;
}

function activate(context) {
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

  context.subscriptions.push(diagnosticCollection);
  context.subscriptions.push(vscode.workspace.onDidChangeTextDocument((event) => {
    updateXiDiagnostics(event.document);
  }));

  context.subscriptions.push(vscode.workspace.onDidOpenTextDocument((document) => {
    updateXiDiagnostics(document);
  }));

  context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor((editor) => {
    if (editor) {
      updateXiDiagnostics(editor.document);
    }
  }));

  for (const document of vscode.workspace.textDocuments) {
    updateXiDiagnostics(document);
  }

  if (vscode.window.activeTextEditor) {
    updateXiDiagnostics(vscode.window.activeTextEditor.document);
  }
}

module.exports = {
  activate,
};
