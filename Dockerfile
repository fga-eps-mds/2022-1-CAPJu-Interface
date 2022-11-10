FROM node:latest

WORKDIR /app

ENV REACT_APP_DEV=true
ENV JWT_SECRET=sad4as84dVFGGRG8asd1a56d1asd1fadfdasfASD

COPY . .
RUN yarn cache clean
RUN yarn install --network-timeout 1000000

EXPOSE 3000