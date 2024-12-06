# syntax = docker/dockerfile:1.2

FROM node:22-alpine3.19 as base 

RUN apk update && apk upgrade

RUN yarn global add turbo

FROM base AS deps

WORKDIR /usr/src/app

COPY . .

RUN turbo prune dotfun --docker

FROM base as builder

WORKDIR /usr/src/app

COPY --from=deps /usr/src/app/out/json/ .
RUN --mount=type=cache,target=/root/.yarn YARN_CACHE_FOLDER=/root/.yarn yarn install --frozen-lockfile

COPY --from=deps /usr/src/app/out/full/ .

RUN --mount=type=secret,id=_env,dst=/etc/secrets/.env cat /etc/secrets/.env > ./web/dotfun/.env

RUN yarn turbo run build --filter=dotfun

FROM base as runner 

WORKDIR /usr/src/app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nuxt
USER nuxt

COPY --from=builder --chown=nuxt:nodejs  /usr/src/app/web/dotfun/.output .

ENV NODE_ENV=production
ENV HOSTNAME="0.0.0.0"

CMD  node server/index.mjs