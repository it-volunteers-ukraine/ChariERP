FROM node:22-alpine AS dependencis
WORKDIR /server
COPY package.json package-lock.json ./
RUN npm install

FROM node:22-alpine AS builder
WORKDIR /server
COPY --from=dependencis /server/node_modules ./node_modules
COPY . .

RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /server

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nestjs

# Set the correct permission for prerender cache
RUN mkdir dist
RUN chown nestjs:nodejs dist

COPY --from=builder --chown=nestjs:nodejs /server/dist/ ./

USER nestjs
EXPOSE 8080
ENV PORT 8080

CMD HOSTNAME="0.0.0.0" node main.js
