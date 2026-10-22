# Builds the static site, then serves it with Caddy on port 8080 as a non-root user.
# Runs with a read-only root filesystem, no capabilities, and no-new-privileges, as on the platform:
#   docker build -t barmai-site:dev . && docker run --rm -p 8080:8080 --read-only --tmpfs /tmp \
#     --cap-drop ALL --security-opt no-new-privileges:true barmai-site:dev
FROM node:24-alpine@sha256:06d7adf3e0ef61a13f1d28682726366f97a15aa1888c934d3ecec86c33918b53 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY astro.config.mjs tsconfig.json ./
COPY src src
COPY public public
COPY content content
RUN npm run build

FROM caddy:2-alpine@sha256:d8542f48d34a9cf4e4c11a478865229840e87e4c96ea3f439101f31a5d35f75f
# The image's caddy binary has cap_net_bind_service as a file capability, for ports below 1024. The
# platform runs containers with no capabilities and no-new-privileges, which refuses to exec such a
# binary. This listens on 8080, so drop it.
RUN apk add --no-cache libcap && setcap -r /usr/bin/caddy && apk del libcap
COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/dist /srv
ENV XDG_CONFIG_HOME=/tmp/caddy XDG_DATA_HOME=/tmp/caddy
USER 65534:65534
EXPOSE 8080
