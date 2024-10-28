FROM node:18-alpine

WORKDIR /usr/local/app

COPY . .

RUN cd backend && npm i -f

EXPOSE 3000

CMD [ "node", "backend/dist/main.js" ]

