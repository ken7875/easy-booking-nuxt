# use node 20 alpine-alpine3.19 image
FROM node:20.15-bookworm as build-stage

# # create work directory in app folder
WORKDIR /app

COPY . .

RUN yarn install

# # build the project
RUN yarn build

FROM node:20.15-alpine3.19 as production-stage

WORKDIR /app

COPY --from=build-stage /app/.output /app/.output

ENV PORT 80

ENTRYPOINT ["node", ".output/server/index.mjs"]