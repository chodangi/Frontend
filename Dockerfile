FROM node:15.9.0

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN touch app/.env

EXPOSE 3000

CMD ["npm", "start"]
