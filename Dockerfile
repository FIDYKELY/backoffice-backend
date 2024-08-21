# syntax=docker/dockerfile:1
 FROM node:16-alpine
 RUN apk add --no-cache python g++ make
 WORKDIR /gentle-tundra-07483
 COPY . .
 RUN npm install --production
 CMD ["node", "./src/recluster.js"]