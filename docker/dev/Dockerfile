FROM node:alpine

WORKDIR /var/www

RUN npm install -g typescript prisma
COPY ./package.json /var/www/package.json
RUN npm install
COPY . .
# RUN npm run build

EXPOSE 3000

CMD [ "npm", "start", "dev" ]
