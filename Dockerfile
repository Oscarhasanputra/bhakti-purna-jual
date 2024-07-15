FROM node:16-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "config","rm","proxy"]
CMD ["npm", "config","rm","https-proxy"]
CMD ["ng", "build"]
FROM nginx:alpine
COPY --from=build /app/dist/browser/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80