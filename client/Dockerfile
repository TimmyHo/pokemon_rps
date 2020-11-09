FROM node:slim

ENV TZ="Asia/Taipei"


ARG REACT_APP_SERVER_URL
ENV REACT_APP_SERVER_URL $REACT_APP_SERVER_URL
RUN echo $REACT_APP_SERVER_URL

RUN apt-get update && apt-get install -y \
    vim 

WORKDIR /pokemon-rps-client
COPY ./package.json ./

RUN npm install
COPY . .

RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "start"]