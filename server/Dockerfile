FROM node

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]

# https://vladilen.notion.site/Docker-2021-a72201ec8573461c8a2e62e2fcf33aa3