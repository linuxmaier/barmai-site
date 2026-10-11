# barmai-site

The household's public website at [barmai.us](https://barmai.us/), starting with the wedding information at [barmai.us/wedding](https://barmai.us/wedding/).

- **Editing content:** [`EDITING.md`](EDITING.md). You can do it all in GitHub's web editor, and saved changes go live in a few minutes.
- **How it's built and hosted:** [`AGENTS.md`](AGENTS.md).

```sh
mise install && npm ci
npm run dev        # http://localhost:4321
mise run check     # what CI checks
```
