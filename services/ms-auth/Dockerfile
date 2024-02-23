FROM node:18-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE $PORT
RUN echo $PORT
CMD [ "npm", "run", "start:dev"]