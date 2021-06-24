FROM node:14 AS builder
WORKDIR /workspace
COPY . .
RUN npm install
RUN npm run build

FROM nginx:alpine
ENV TZ Asia/Chongqing
COPY --from=builder /workspace/dist /usr/share/nginx/html

CMD nginx -g "daemon off;"