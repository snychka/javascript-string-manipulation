FROM node:12.13-alpine
LABEL maintainer="AJ Foster"

WORKDIR /src/app/

COPY . .

RUN npm install
RUN chown -R node:node ./

USER node
