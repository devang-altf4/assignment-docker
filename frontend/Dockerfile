# frontend dockerfile
# using node 20 for building and running vite dev server

FROM node:20-alpine

WORKDIR /app

# copy package files
COPY package*.json ./

# install deps
RUN npm install

# copy source code
COPY . .

# expose vite dev server port
EXPOSE 5173

# run vite dev server
CMD ["npm", "run", "dev"]
