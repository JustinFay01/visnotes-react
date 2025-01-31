# Use Node.js base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package.json and lockfile
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

RUN npm install -g serve

COPY . .

RUN pnpm build

# Expose port
EXPOSE 3000

# Start the app
CMD [ "serve", "-s", "dist" ]
