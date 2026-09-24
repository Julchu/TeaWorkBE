# syntax=docker/dockerfile:1

ARG NODE_VERSION=22.4.1

FROM node:${NODE_VERSION}-alpine

RUN corepack enable

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

USER node

EXPOSE 3001

CMD ["pnpm", "start"]
