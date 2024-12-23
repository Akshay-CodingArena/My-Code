# Use an official Node runtime as a parent image
FROM node:16.16.0

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install --force

# Copy the content of the local src directory to the working directory
COPY . .

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Define environment variable
# ENV REACT_APP_API_URL=http://your-api-url
ENV FAST_REFRESH=false
ENV REACT_APP_URL_API=https://uat-webapi.revoltmotors.com
ENV REACT_APP_ROOT_PATH=https://uat-webapi.revoltmotors.com
# REACT_APP_ROOT_PATH=https://dmsi.revoltmotors.com
# REACT_APP_URL_API=https://dmsi.revoltmotors.com
ENV REACT_APP_URL_APIX=https://apix.revoltmotors.com
ENV REACT_APP_SAM=sanmeet
ENV REACT_APP_API_KEY=dgdfg40466d4ccfde517fbf94ae66fd8d7f6bdfgghgjhk
ENV REACT_APP_CLEVERTAP_KEY=TEST-779-RWZ-K86Z

# Run npm start when the container launches
CMD ["npm", "start"]