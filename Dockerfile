FROM node:alpine3.14 as build
RUN mkdir -p /app
WORKDIR /app
EXPOSE 3000
COPY package.json .
RUN npm install
COPY . .
CMD ["npm", "start"]