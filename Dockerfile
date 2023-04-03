FROM ubuntu:latest

RUN apt-get update && \
    apt-get install -y curl && \
    curl -sL https://deb.nodesource.com/setup_lts.x | bash - && \
    apt-get install -y nodejs

WORKDIR /app

COPY package*.json ./
