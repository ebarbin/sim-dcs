FROM node:10 AS ui-build
WORKDIR /usr/src/app
COPY app/ ./app/
RUN cd app && npm install @angular/cli && npm install && npm run build

FROM node:10 AS server-build
WORKDIR /root/
COPY --from=ui-build /usr/src/app/app/dist ./app/dist
COPY package*.json ./
RUN npm install
COPY app.js .

EXPOSE 3080

CMD ["node", "app.js"]
