FROM node:18-alpine

# Cài đặt dependencies cho audio
RUN apk add --no-cache python3 make g++ ffmpeg

WORKDIR /app

# Copy package files
COPY package*. json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY .  .

# Expose port cho health check
EXPOSE 3000

# Start bot
CMD ["npm", "start"]