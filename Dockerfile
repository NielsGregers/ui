FROM node:lts
WORKDIR /usr/src/app
COPY . .
RUN npm install -g pnpm turbo ts-node
WORKDIR /usr/src/app/apps/www
RUN pnpm install
# RUN mkdir -p /tmp/root/365admin-nodejs
RUN turbo run build 

EXPOSE 3001
CMD ["npm", "run","start"]
