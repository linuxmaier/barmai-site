# Builds the static site, then serves it with Caddy on port 8080 as a non-root user.
# Runs with a read-only root filesystem; Caddy writes nothing at runtime.
#   docker build -t barmai-site:dev . && docker run --rm -p 8080:8080 --read-only barmai-site:dev
FROM node:24-alpine@sha256:ebfe2f90462722a7a4de65e91990e97fe0d401c70e0e762c5b53302f905ec1c1 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY astro.config.mjs tsconfig.json ./
COPY src src
COPY public public
COPY content content
RUN npm run build

FROM caddy:2-alpine@sha256:d8542f48d34a9cf4e4c11a478865229840e87e4c96ea3f439101f31a5d35f75f
COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/dist /srv
ENV XDG_CONFIG_HOME=/tmp/caddy XDG_DATA_HOME=/tmp/caddy
USER 65534:65534
EXPOSE 8080
