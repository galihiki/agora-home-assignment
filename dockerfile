# --------------------------
# Stage 1: Build React App
# --------------------------
FROM node:20-alpine AS build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependenciesS
RUN npm install

# Copy all source code
COPY . .

# Build TypeScript + Vite app
RUN npm run build

# --------------------------
# Stage 2: Serve with Nginx
# --------------------------
FROM nginx:alpine

# Copy Vite build output (dist folder)
COPY --from=build /app/dist /usr/share/nginx/html

# Inline Nginx config for SPA routing
RUN echo 'server { \
    listen 80; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { try_files $uri /index.html; } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
