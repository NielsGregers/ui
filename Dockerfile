FROM node:lts
WORKDIR /usr/src/app
COPY apps/www .
RUN npm install -g pnpm turbo ts-node
RUN pnpm install
# RUN mkdir -p /tmp/root/365admin-nodejs
RUN turbo run build 
WORKDIR /usr/src/app
EXPOSE 3001
CMD ["npm", "run","start"]
