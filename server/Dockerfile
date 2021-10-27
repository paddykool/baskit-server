# FROM node:14-alpine
# ENV NODE_ENV=production
# WORKDIR /usr/src/server
# COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
# RUN npm install --production --silent && mv node_modules ../
# COPY . .
# EXPOSE 3000
# RUN chown -R node /usr/src/app
# USER node
# CMD ["npm", "start"]

# TODO create a user for the below... not good to always use root ?

FROM ubuntu:20.04
ENV NODE_ENV=production

RUN apt-get update -y \
    && apt-get install curl gnupg -y \
    && curl -sL https://deb.nodesource.com/setup_14.x | bash \
    && apt-get install nodejs -y

# TODO Where is a good workdir ?????
WORKDIR /usr/src/server

# Do i need to copy the package-lock file ?
COPY package*.json ./

# How do I install for production - no dev dependicies ?
RUN npm install 

# Copy over the code file... why not just copy over 
# package.json and code all at once ?
# TODO maybe take everything directly form git??
# TODO setup Github Actions or something ?
COPY . .

CMD node server.js