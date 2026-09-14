FROM node:24.14.0-bookworm-slim AS node
FROM python:3.12.14-slim-bookworm
RUN apt-get update && apt-get install -y --no-install-recommends libstdc++6 && rm -rf /var/lib/apt/lists/*
COPY --from=node /usr/local/bin/node /usr/local/bin/node
COPY execution /execution
COPY numerical /numerical
COPY harness /harness
COPY cases /cases
ENV PYTHONDONTWRITEBYTECODE=1
WORKDIR /numerical
