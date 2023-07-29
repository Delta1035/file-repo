# node alpine image setup
FROM node:18.12.0 as builder
WORKDIR '/app'
#COPY .npmrc ./
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
ARG REMOTE_APP_DOMAIN_URL

RUN npm run build

# using NGINX 
FROM nginx
EXPOSE 80
COPY --from=builder app/build /usr/share/nginx/html
COPY --from=builder app/nginx.conf /etc/nginx/nginx.conf