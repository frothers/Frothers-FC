FROM klakegg/hugo:0.83.1-ext-alpine

EXPOSE 1313
VOLUME /app
WORKDIR /app
COPY . .

# install packages
# RUN apk add --no-cache npm hugo
RUN npm install

RUN npx webpack --mode development --config webpack.dev.js --hot
CMD ["server", "-d", "./dist", "-vw"]

