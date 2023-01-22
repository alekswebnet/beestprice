# Build
FROM node:lts-alpine as builder

# ENV NODE_ENV production
WORKDIR /home/node

RUN apk update && apk add --no-cache nmap && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories && \
    apk update && \
    apk add --no-cache \
      chromium \
      harfbuzz \
      "freetype>2.8" \
      ttf-freefont \
      nss

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build 

# Run
FROM node:lts-alpine as prod

ENV NODE_ENV production
USER node
WORKDIR /home/node

COPY --from=builder --chown=node:node /home/node/package*.json ./
COPY --from=builder --chown=node:node /home/node/.output/ ./.output/

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]