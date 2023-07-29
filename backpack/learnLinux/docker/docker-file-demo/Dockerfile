FROM node:latest
WORKDIR /app
# source(当前dockerfile同级目录) dest(目标目录,app文件夹)
COPY . . 
RUN npm config set registry https://registry.npm.taobao.org
RUN npm install -g http-server
EXPOSE 8080
CMD [ "http-server","-p","8080" ]