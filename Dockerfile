FROM node:18

WORKDIR /app

COPY package*.json ./
COPY entrypoint.sh /entrypoint.sh
COPY . .

RUN npm install
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]