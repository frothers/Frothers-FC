FROM alpine:latest

VOLUME /app
WORKDIR /app
COPY . .

# install packages
RUN apk add --no-cache yarn hugo
RUN yarn install
