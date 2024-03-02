FROM node:16.20.0-alpine3.18

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps \
    && npm install typescript

COPY . .

CMD ["npm", "run", "start"]
