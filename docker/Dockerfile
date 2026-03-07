# Use the official Playwright image (includes Node + browsers)
FROM mcr.microsoft.com/playwright:v1.55.1-jammy

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the project
COPY . .

# Run tests (can be overridden in docker run command)
CMD ["npx", "playwright", "test"]
