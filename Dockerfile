# syntax=docker/dockerfile:1

FROM hugomods/hugo:exts-0.125.7 AS builder
WORKDIR /src
COPY . .
RUN hugo --minify --gc

FROM scratch AS exporter
COPY --from=builder /src/public/ /

FROM caddy:2.8-alpine AS runtime
COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=builder /src/public/ /usr/share/caddy/
EXPOSE 80
