# Frothers XI Completion

This VS Code extension scans the project’s post files and suggests names already used in `xi_and_subs` arrays, so editors can quickly reuse squad members without retyping names.

## How it works

- It walks `content/posts/**/*.md`
- Reads each file’s TOML front matter
- Extracts values from `xi_and_subs = [...]`
- Deduplicates them and offers them as Markdown completion suggestions while editing a match post

## Usage

1. Open the workspace in VS Code.
2. Open a Markdown match post under `content/posts`.
3. Edit the `xi_and_subs` array.
4. Type a name or open completion inside the string quotes to see existing player names.

## Refresh

Run the command `Frothers XI: Refresh Frothers XI List` if you add or rename players in the repo and want the list to update.
