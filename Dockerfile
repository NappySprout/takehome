# Use an Image
FROM node:lts-alpine3.17

# Create working directory
WORKDIR /usr/src/app

# Get dependencies and install them
COPY package*.json ./
RUN npm install

# Copy app inside
COPY . .

# Expose port 3000 in the app
EXPOSE 3000

# Run and start container
CMD [ "node", "src/index.js" ]

#Set up
#docker build . -t takehome
#Run
#docker run takehome -d -p 3000:3000 --env-file ./.env -v /Users/sleepylog/Documents/jsfile/takehome/db:/usr/src/app/db