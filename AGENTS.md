# barmai-site

The household's public website at [barmai.us](https://barmai.us/). Right now it's mostly the wedding information at `/wedding/`: a landing page of buttons, some going to pages here and some to other sites.

`CLAUDE.md` is a symlink to this file. Edit `AGENTS.md`, never the symlink.

## Everything here is public

The site has no login, and this repository is public on GitHub, including its full history. Deleting a file later doesn't remove it from the history, so review content before it's committed, not after.

- Before committing a change to `content/` or `public/`, read it for anything that shouldn't be public: home addresses, phone numbers, email addresses, children's full names or schools, guest lists and seating, dates when the house will be empty, health details, and anything about other people that they haven't agreed to share.
- If something looks sensitive, point it out to the owner and ask. Don't silently rewrite or remove it, since it may be there on purpose.
- Photos can carry the GPS location where they were taken. Strip metadata from any image before committing it (for example, re-encode it with sharp, which drops metadata by default).
- `noindex` keeps pages out of search results. It isn't access control: anyone with a link can read every page.
- Never commit secrets or credentials. There's no reason for any to be in this repo.

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
- To test the production image: `docker build -t barmai-site:dev . && docker run --rm -p 8080:8080 --read-only --tmpfs /tmp --cap-drop ALL --security-opt no-new-privileges:true barmai-site:dev`.
- Pin base images by digest in the `Dockerfile`, and actions by commit SHA.
- Styles use the CSS custom properties in `src/styles/global.css`, which has light and dark values. Fonts are self-hosted through Fontsource, so pages make no third-party requests.
- The site must work at phone width. Most guests will open it from a QR code or a text message.
