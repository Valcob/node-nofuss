FROM node:7.2.1-alpine

RUN apk add --update tzdata
ENV TZ=Europe/Bucharest

WORKDIR /usr/nofuss/app
COPY package.json ./
RUN npm install--global --no-progress --silent --depth 0

# Copy application files
COPY . /usr/nofuss/app
RUN npm build

EXPOSE 3000

CMD [ "node", "./build/server.js" ]
