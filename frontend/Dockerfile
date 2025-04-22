#  build stage
    FROM node:20-alpine AS builder
    WORKDIR /app
    
    COPY package*.json ./
    RUN npm ci                      # <-- remove  --omit=dev
    
    # copy source & build the static files
    COPY . .
    RUN npm run build               # produces  /app/dist
    
    #  runtime stage
    FROM nginx:1.27-alpine
    COPY --from=builder /app/dist /usr/share/nginx/html
    EXPOSE 80
    CMD ["nginx", "-g", "daemon off;"]
    