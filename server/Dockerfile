# Build-time node version configuration
ARG NODE_VERSION=22

# Stage 1: Dependencies
FROM node:${NODE_VERSION}-alpine AS dependencies
WORKDIR /app
RUN apk add --no-cache g++ make python3
COPY package.json package-lock.json* ./
RUN npm i --include=optional --ignore-scripts

# Stage 2: Build
FROM node:${NODE_VERSION}-alpine AS builder
WORKDIR /app
RUN apk add --no-cache g++ make python3

COPY --from=dependencies /app/node_modules ./node_modules
COPY package.json package-lock.json* ./
COPY . .

RUN npm run build

# Stage 3: Production dependencies only
FROM node:${NODE_VERSION}-alpine AS prod-deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm i --include=optional --omit=dev --ignore-scripts && \
    npm cache clean --force

# Stage 4: Minimal production runtime
FROM node:${NODE_VERSION}-alpine AS runner
WORKDIR /app

# Install minimal runtime dependencies
RUN apk add --no-cache dumb-init && \
    addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001

ENV NODE_ENV=production \
    PORT=8080 \
    HOST=0.0.0.0

COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json

# Set ownership
RUN chown -R nestjs:nodejs /app

USER nestjs

EXPOSE 8080

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/src/main.js"]
