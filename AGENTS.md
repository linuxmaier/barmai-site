# barmai-site

The household's public website at [barmai.us](https://barmai.us/). Right now it's mostly the wedding information at `/wedding/`: a landing page of buttons, some going to pages here and some to other sites.

`CLAUDE.md` is a symlink to this file. Edit `AGENTS.md`, never the symlink.

## How it works

- [Astro](https://astro.build) builds a static site. Content is Markdown in `content/`, not `src/`, so non-developers can find it. The schema is in `src/content.config.ts`. [`EDITING.md`](EDITING.md) explains the content format for people editing in GitHub's web editor. Keep it in sync with the schema.
- `content/wedding/index.md` is the landing page. Every other file in that folder is a button. A file with `link:` goes to another site; a file without one becomes `/wedding/<file name>/`. `draft: true` hides it. A page also lists the entries in the folder of the same name (`content/wedding/books/*.md` on `/wedding/books/`), in the `entries` collection: as sections down the page by default, or with `layout: tiles` as a grid of covers (`src/components/Cover.astro`) linking to each entry's own page (`src/pages/wedding/[page]/[entry].astro`).
- Markdown uses the `unified` processor with `remark-breaks`, so a single line break is a `<br>` (for poems and vows). Astro 7's default processor, Sätteri, doesn't run remark plugins.
- The `Dockerfile` builds the site and serves it with Caddy (`Caddyfile`) on port 8080. It runs as nobody, with a read-only root filesystem and a tmpfs on `/tmp`. `GET /healthz` returns 200.
- The site is public but unlisted: every page sends `noindex` as a meta tag and in an `X-Robots-Tag` header.

## Hosting

It runs on the household platform, [linuxmaier/home-server](https://github.com/linuxmaier/home-server), as the `public`-tier app `apps/site`.

- **Release:** `.github/workflows/release.yml` builds the image on PRs. **Every push to `main` publishes and deploys it**: it pushes `ghcr.io/linuxmaier/barmai-site` (tags: the commit SHA and `main`), and the `release` job pins the new digest in home-server with a PR it merges once home-server's CI passes (home-server ADR 0013). That's what makes web-editor commits go live without a developer.
- Because `main` is the deploy, don't push to it without the owner asking. Agents work on a branch and open a PR.

## Working on it

- mise pins the toolchain (`mise.toml`). Run `mise install`, then `npm ci`.
- `npm run dev` serves the site at http://localhost:4321 with live reload.
- `mise run check` runs what CI checks: the build (which also validates the content against the schema) and `actionlint`.
- To test the production image: `docker build -t barmai-site:dev . && docker run --rm -p 8080:8080 --read-only --tmpfs /tmp barmai-site:dev`.
- Pin base images by digest in the `Dockerfile`, and actions by commit SHA.
- Styles use the CSS custom properties in `src/styles/global.css`, which has light and dark values. Fonts are self-hosted through Fontsource, so pages make no third-party requests.
- The site must work at phone width. Most guests will open it from a QR code or a text message.
