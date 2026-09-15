FROM node:24.14.0-bookworm-slim AS node
FROM python:3.12.14-slim-bookworm
RUN apt-get update && apt-get install -y --no-install-recommends git libstdc++6 && rm -rf /var/lib/apt/lists/*
COPY --from=node /usr/local/bin/node /usr/local/bin/node
COPY repo /repo
ENV PYTHONDONTWRITEBYTECODE=1
WORKDIR /repo
