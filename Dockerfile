# Stage 1: Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy schema.prisma dan jalankan prisma generate
COPY src/prisma ./src/prisma

RUN npx prisma generate --schema=src/prisma/schema.prisma

# Copy seluruh source code
COPY . .

# Build aplikasi Next.js
RUN npm run build

# Stage 2: Production image
FROM node:18-alpine

WORKDIR /app

ENV NODE_ENV=production

# Salin semua yang dibutuhkan
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.js ./next.config.js

CMD ["npm", "run", "start"]
