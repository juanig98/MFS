FROM node:14

WORKDIR /app

COPY ./package*.json ./
COPY ./.env ./
RUN npm install --legacy-peer-deps

COPY . .

CMD ["npm", "run", "dev"]