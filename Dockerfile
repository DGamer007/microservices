FROM node:18.15.0-alpine3.17

RUN mkdir /gateway
WORKDIR /gateway

COPY package*.json .
RUN npm ci

COPY . .
CMD [ "npm","start" ]