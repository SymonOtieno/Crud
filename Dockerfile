FROM node:16-alpine

WORKDIR /var/www/crud/

# Install app dependencies
COPY package*.json .
RUN npm install

# Bundle app source
COPY . .

EXPOSE 3333

CMD [ "npm", "start" ]