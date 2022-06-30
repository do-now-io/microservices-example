FROM node:16
EXPOSE 4000
WORKDIR /app

COPY . .

RUN npm install --only=production
CMD ["npm", "start"]