FROM node:20-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_PUBLIC_API_BASE=/api/v1
ENV NEXT_PUBLIC_SOCKET_URL=https://norcaltrucktrade-backend-tcczor-864aff-169-58-206-96.sslip.io
ENV SOCKET_PUBLIC_URL=https://norcaltrucktrade-backend-tcczor-864aff-169-58-206-96.sslip.io
ENV BACKEND_ORIGIN=https://norcaltrucktrade-backend-tcczor-864aff-169-58-206-96.sslip.io

RUN npm run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
ENV BACKEND_ORIGIN=https://norcaltrucktrade-backend-tcczor-864aff-169-58-206-96.sslip.io
ENV SOCKET_PUBLIC_URL=https://norcaltrucktrade-backend-tcczor-864aff-169-58-206-96.sslip.io

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

CMD ["node", "server.js"]
