FROM node:14-alpine

WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

COPY src/api-docs build/api-docs
