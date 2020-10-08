FROM node:slim

ENV TZ="Asia/Taipei"

RUN apt-get update && apt-get install -y \
    vim

WORKDIR /pokemon-rps-server
COPY ./package.json ./

RUN npm install
COPY . .

EXPOSE 5000

CMD ["npm", "run", "start"]