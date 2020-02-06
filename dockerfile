FROM node:12

RUN mkdir serviceFolder

WORKDIR /usr/app/

COPY . . 

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]