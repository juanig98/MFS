FROM node:lts-hydrogen

WORKDIR /app

COPY package.json package-lock.json /app/

RUN npm install --legacy-peer-deps

COPY . /app

EXPOSE 3000

ENV DB_HOST=mysql_host
ENV DB_USER=mysql_user
ENV DB_PASS=mysql_password
ENV DB_NAME=mysql_database

CMD ["npm", "run", "start:dev"]