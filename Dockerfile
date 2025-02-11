FROM node:20-alpine as builder

WORKDIR /app

COPY Angular/final-project /app/

RUN npm ci && \
    npm run build --prod

FROM nginx:alpine

COPY --from=builder /app/dist/final-project/index.html /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
