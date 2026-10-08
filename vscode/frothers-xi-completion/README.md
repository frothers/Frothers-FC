# Frothers XI Completion

This VS Code extension uses a fixed, curated list of approved Frothers XI names based on the current project data. It gives you autocomplete inside `xi_and_subs` arrays and warns when a typed name is not in the approved list.

## How it works

- Uses a hard-coded list of known XI names from this repo snapshot
- Offers those names as Markdown completion suggestions while editing `xi_and_subs`
- Warns on unknown names so typos are easier to catch before saving

## Usage

1. Open the workspace in VS Code.
2. Open a Markdown match post under `content/posts`.
3. Edit the `xi_and_subs` array.
4. Start typing a player name and choose from the suggestion list.
5. If a name is not in the approved list, the editor marks it with a warning.

## Updating the list

If you want to add or remove names later, update the static list in `src/frothersXiNames.js`.
