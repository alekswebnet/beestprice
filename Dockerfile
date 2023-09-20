# FROM node:16-alpine3.16

# RUN apk --update add --no-cache \
#         python3 \
#         make \
#         g++ \
#         chromium \
#         nss \
#         freetype \
#         freetype-dev \
#         harfbuzz \
#         ca-certificates && \
#     addgroup -S pptruser && \
#     adduser -S pptruser -G pptruser && \
#     mkdir -p /home/pptruser/Downloads && \
#     chown -R pptruser:pptruser /home/pptruser && \
#     mkdir -p /app && \
#     chown -R pptruser:pptruser /app && \
#     mkdir -p /var/cache/screenshoter && \
#     chown -R pptruser:pptruser /var/cache/screenshoter

# WORKDIR /app

# USER pptruser

# COPY --chown=pptruser:pptruser package*.json ./

# # Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
# ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

# RUN npm install --unsafe-perm

# COPY --chown=pptruser:pptruser . .

# RUN npm run build

# EXPOSE 3000

# CMD ["node", ".output/server/index.mjs"]

FROM node:18-alpine AS base
 
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
 
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build && npm cache clean --force
 
FROM base AS runner
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nuxt
COPY --from=builder /app .
USER nuxt
EXPOSE 3000
ENV PORT 3000
CMD ["npm", "run", "start"]