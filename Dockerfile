FROM node:16-alpine3.16

RUN apk --update add --no-cache \
        python3 \
        make \
        g++ \
        chromium \
        nss \
        freetype \
        freetype-dev \
        harfbuzz \
        ca-certificates && \
    addgroup -S pptruser && \
    adduser -S pptruser -G pptruser && \
    mkdir -p /home/pptruser/Downloads && \
    chown -R pptruser:pptruser /home/pptruser && \
    mkdir -p /app && \
    chown -R pptruser:pptruser /app && \
    mkdir -p /var/cache/screenshoter && \
    chown -R pptruser:pptruser /var/cache/screenshoter

WORKDIR /app

USER pptruser

COPY --chown=pptruser:pptruser package*.json ./

# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

RUN npm install --unsafe-perm

COPY --chown=pptruser:pptruser . .

RUN npm run build

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]