# Build-time node version configuration
ARG NODE_VERSION=22

# Stage 1: Install dependencies
FROM node:${NODE_VERSION}-alpine AS dependencies
WORKDIR /app
RUN apk add --no-cache g++ make python3
COPY package.json package-lock.json ./
COPY client/package.json client/
COPY server/package.json server/
RUN npm ci --include=optional --workspace client --ignore-scripts

# Stage 2: Build application
FROM node:${NODE_VERSION}-alpine AS builder
WORKDIR /app
COPY . .
RUN npm ci --include=optional --workspace client --ignore-scripts
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build --workspace client

# Stage 3: Production environment
FROM node:${NODE_VERSION}-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    HOSTNAME=0.0.0.0 \
    PORT=3000

# Copy standalone build
COPY --from=builder /app/client/.next/standalone ./
COPY --from=builder /app/client/.next/static ./client/.next/static
COPY --from=builder /app/client/public ./client/public

# Run as non-root
USER node

EXPOSE 3000
CMD ["node", "server.js"]
