FROM nginx:alpine

# Copy only the built index.html from the local dist directory
COPY Angular/final-project/dist/final-project/browser/index.html /usr/share/nginx/html/

# Copy nginx configuration if needed
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
