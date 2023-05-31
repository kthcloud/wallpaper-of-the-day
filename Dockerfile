FROM node:20

COPY . /app

WORKDIR /app

CMD [ "node server.js" ]