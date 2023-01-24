FROM node:lts-alpine as builder

# Installs latest Chromium (109) package.
RUN apk add --no-cache \
      chromium \
      nss \
      freetype \
      harfbuzz \
      ca-certificates \
      ttf-freefont \
      yarn

# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# ENV NODE_ENV production
WORKDIR /home/node

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn build 

# Run
FROM node:lts-alpine as prod

ENV NODE_ENV production
USER node
WORKDIR /home/node

COPY --from=builder --chown=node:node /home/node/package*.json ./
COPY --from=builder --chown=node:node /home/node/.output/ ./.output/

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]