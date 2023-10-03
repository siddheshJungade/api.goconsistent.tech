FROM node:18

WORKDIR /src/app

# Copy package.json and yarn.lock files.
COPY package.json yarn.lock ./

# Install dependencies using Yarn.
RUN yarn install

# Copy the rest of your application code.
COPY . .

# Build your application.
RUN yarn build

EXPOSE 3000
# Start your application using Yarn.
CMD ["yarn", "start:prod"]

# // need to setup yarn