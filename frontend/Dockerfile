FROM node:14-alpine

WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./

RUN npm install
RUN npm install -g serve
RUN npm rebuild node-sass

COPY . .
