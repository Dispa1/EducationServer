FROM node:16.20.0-alpine3.18

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN chmod +x /app/node_modules/.bin/tsc

CMD ["npm", "run", "start"]