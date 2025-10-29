# Stage 1: Install dependencies
ARG NODE_VERSION=22
FROM node:${NODE_VERSION}-alpine AS deps
WORKDIR /server
COPY package*.json ./
RUN npm ci

# Stage 2: Build application
FROM node:${NODE_VERSION}-alpine AS builder
WORKDIR /server
COPY --from=deps /server/node_modules ./node_modules
COPY . .
RUN chmod +x node_modules/.bin/* || true
RUN npm run build

# Stage 3: Production runtime
FROM node:${NODE_VERSION}-alpine AS production
WORKDIR /server

# Set production environment
ARG PORT=8080
ENV NODE_ENV=production \
    PORT=${PORT} \
    HOSTNAME=0.0.0.0

# Create user and setup permissions
ARG USER=nestjs
ARG GROUP=nodejs
ARG UID=1001
ARG GID=1001
RUN addgroup --system --gid ${GID} ${GROUP} && \
    adduser --system --uid ${UID} ${USER} && \
    mkdir -p dist && \
    chown ${USER}:${GROUP} dist

# Copy built application
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY --from=builder --chown=${USER}:${GROUP} /server/dist/ ./dist/

USER ${USER}
EXPOSE ${PORT}

CMD ["node", "dist/src/main.js"]
