# Build the first stage with alpine node image and name as build
FROM node:18-alpine3.17 as build

# update and install the latest dependencies
RUN apk update && apk upgrade
# Add non root user to the docker image and set the user
RUN adduser -D nuxtuser
USER nuxtuser

# set work dir as app
WORKDIR /app
# copy the nuxt project content with proper permission for the user nuxtuser
COPY --chown=nuxtuser:nuxtuser . /app
# COPY . ./
# install all the project npm dependencies

RUN npm install
#RUN npm ci --only=production
# build the nuxt project to generate the artifacts in .output directory
RUN npx nuxt build

# we are using multi stage build process to keep the image size as small as possible
FROM node:18-alpine3.17
# update and install latest dependencies, add dumb-init package
RUN apk update && apk upgrade && apk add --no-cache \
  dumb-init \
  chromium \
  harfbuzz \
  "freetype>2.8" \
  ttf-freefont \
  nss
# add and set non root user
RUN adduser -D nuxtuser 
USER nuxtuser

# set work dir as app
WORKDIR /app
# copy the output directory to the /app directory from 
# build stage with proper permissions for user nuxt user
COPY --chown=nuxtuser:nuxtuser --from=build /app/.output ./
# expose 8080 on container
EXPOSE 8080

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

# set app host and port . In nuxt 3 this is based on nitor and you can read
#more on this https://nitro.unjs.io/deploy/node#environment-variables
ENV HOST=0.0.0.0

# set app port
ENV PORT=8080
# set node env as prod
ENV NODE_ENV=production
# start the app with dumb init to spawn the Node.js runtime process
# with signal support
CMD ["dumb-init","node","/app/server/index.mjs"]