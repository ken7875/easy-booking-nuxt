# use node 20 alpine-alpine3.19 image
FROM node:20.15-bookworm as build-stage

# create work directory in app folder
WORKDIR /app

# install required packages for node image
# RUN apk --no-cache add openssh g++ make python3 git

# copy over package.json files
COPY . .

# install all depencies
RUN yarn install

# build the project
RUN yarn build

FROM node:20.15-alpine3.19 as production-stage

WORKDIR /app
# copy over all files to the work directory
COPY --from=build-stage /app /app

# expose the host and port 3000 to the server
EXPOSE 3000
# run the build project with node
CMD ["node", ".output/server/index.mjs"]