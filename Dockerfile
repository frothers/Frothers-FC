FROM alpine:latest

EXPOSE 1313
VOLUME /app
WORKDIR /app

# install packages
RUN apk add --no-cache npm hugo
RUN npm install

# RUN npm install -g webpack webpack-cli webpack-dev-server
RUN hugo -d ./dist -vw
RUN npx webpack --mode development --config webpack.dev.js --hot
# RUN server -d ./dist -vw

