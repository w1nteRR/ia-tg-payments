FROM node:18.18.0
LABEL authors="darth"

WORKDIR /usr/dist

COPY package*.json ./

#install dependencies

RUN npm install

# Copy local code to the container image.
COPY . ./

# Build the application
RUN npm run build

# Run the web service on container startup.
CMD [ "npm", "run", "start" ]
