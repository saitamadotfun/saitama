# syntax = docker/dockerfile:1.2

FROM node:22-alpine3.20 as base 

RUN apk upgrade && apk update && \
    apk add libgcc libstdc++ libc6-compat && \ 
    apk add make gcc g++ python3

RUN yarn global add turbo

FROM base as builder

WORKDIR /usr/src/app

COPY . .

RUN  turbo prune api --docker

FROM base as installer

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/out/json/ .
RUN --mount=type=cache,target=/root/.yarn YARN_CACHE_FOLDER=/root/.yarn yarn install --frozen-lockfile

COPY --from=builder /usr/src/app/out/full/ .
RUN yarn turbo run build --filter=api

FROM base as runner 

WORKDIR /usr/src/app

COPY --from=installer /usr/src/app/ .

RUN  node ./node_modules/@fastify/secure-session/genkey.js > /usr/src/app/servers/api/secret-key

WORKDIR /usr/src/app/servers/api

CMD yarn migrate && node dist/index.cjs