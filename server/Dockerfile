# Stage 1: Install dependencies
ARG NODE_VERSION=22
FROM node:${NODE_VERSION}-alpine AS dependencies
WORKDIR /app
RUN apk add --no-cache g++ make python3
COPY package.json package-lock.json ./
COPY client/package.json ./client/
COPY server/package.json ./server/
RUN npm ci --include=optional --workspace server --ignore-scripts

# Stage 2: Build application
FROM node:${NODE_VERSION}-alpine AS builder
WORKDIR /app
COPY . .
RUN npm ci --include=optional --workspace server --ignore-scripts
RUN chmod +x node_modules/.bin/* || true
RUN npm run build --workspace server

# Stage 3: Production runtime
FROM node:${NODE_VERSION}-alpine AS runner
WORKDIR /app/server

ENV NODE_ENV=production \
    PORT=8080 \
    HOST=0.0.0.0

COPY --from=builder /app/server/package*.json ./
COPY --from=builder /app/server/node_modules ./node_modules
COPY --from=builder /app/server/dist ./dist

USER node
EXPOSE 8080

CMD ["node", "dist/src/main.js"]
