FROM node:16-alpine

RUN apk add --no-cache libc6-compat

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json yarn.lock ./

# Install app dependencies
RUN yarn --frozen-lockfile && yarn cache clean

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN yarn run build

# Start the server using the production build
CMD [ "node", "dist/main.js" ]