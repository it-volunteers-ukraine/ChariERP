FROM node:20-alpine AS dependencis
RUN apk add --no-cache libc6-compat
WORKDIR /client
COPY package.json package-lock.json ./
RUN npm install --production

FROM node:20-alpine AS builder
WORKDIR /client
COPY --from=dependencis /client/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /client

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /client/.next ./.next
COPY --from=builder /client/node_modules ./node_modules
COPY --from=builder /client/next.config.js ./next.config.js
COPY --from=builder /client/postcss.config.js ./postcss.config.js
COPY --from=builder /client/tailwind.config.ts ./tailwind.config.ts
COPY --from=builder /client/tsconfig.json ./tsconfig.json
COPY --from=builder /client/package.json ./package.json

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["npm", "start"]
