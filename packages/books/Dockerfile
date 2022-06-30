FROM node:16

EXPOSE 3001
WORKDIR /app

COPY . .

RUN npm install --only=production
CMD ["npm", "start"]