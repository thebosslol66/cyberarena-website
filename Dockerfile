FROM node:16-alpine

WORKDIR /app

# Install serve globally to serve the built app
RUN npm install -g serve

# Copy built application directly (using existing build folder)
COPY build ./build

# Expose port 3000
EXPOSE 3000

# Serve the application
CMD ["serve", "-s", "build", "-l", "3000"]

