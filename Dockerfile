# Static prototype server (no build)
FROM nginx:1.27-alpine

# Copy site files
COPY . /usr/share/nginx/html

# Remove files that shouldn't be served if present
RUN rm -rf /usr/share/nginx/html/.git \
    && rm -f /usr/share/nginx/html/Dockerfile \
    && rm -f /usr/share/nginx/html/docker-compose.yml \
    && rm -f /usr/share/nginx/html/.dockerignore \
    && rm -f /usr/share/nginx/html/nginx.conf \
    && true

# Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf
