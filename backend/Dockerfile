# backend dockerfile
# using node 20 alpine for smaller image size

FROM node:20-alpine

# set working dir
WORKDIR /app

# copy package files first for better caching
COPY package*.json ./

# install deps
RUN npm install

# copy rest of the code
COPY . .

# expose port 5000
EXPOSE 5000

# run the server
CMD ["npm", "start"]
