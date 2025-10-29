# Build-time node version configuration
ARG NODE_VERSION=22

# Stage 1: Install dependencies
FROM node:${NODE_VERSION}-alpine AS dependencies
WORKDIR /client
COPY package*.json ./
RUN npm ci --include=optional

# Stage 2: Build application
FROM node:${NODE_VERSION}-alpine AS builder
WORKDIR /client
COPY --from=dependencies /client/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Stage 3: Production environment
FROM node:${NODE_VERSION}-alpine AS runner
WORKDIR /client

# Configure port for the application
ARG PORT=3000
ENV NODE_ENV=production \
    PORT=${PORT} \
    NEXT_TELEMETRY_DISABLED=1 \
    HOSTNAME=0.0.0.0

# Define user and group for security
ARG USER=nextjs
ARG GROUP=nodejs
ARG UID=1001
ARG GID=1001

# Setup security and permissions
RUN addgroup --system --gid ${GID} ${GROUP} && \
    adduser --system --uid ${UID} ${USER} && \
    mkdir .next && \
    chown ${USER}:${GROUP} .next

# Copy built application with correct ownership
COPY --from=builder --chown=${USER}:${GROUP} /client/.next/standalone ./
COPY --from=builder --chown=${USER}:${GROUP} /client/.next/static ./.next/static
COPY --from=builder --chown=${USER}:${GROUP} /client/public ./public

USER ${USER}
EXPOSE ${PORT}
CMD ["node", "server.js"]
