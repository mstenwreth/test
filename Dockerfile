FROM alpine
RUN apk add --update nodejs npm
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
CMD ["npm", "start"]
EXPOSE 3000