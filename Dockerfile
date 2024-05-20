# 我們的 node 版本 image 的環境
FROM node:16-alpine AS builder

# ENV HOST=0.0.0.0

# 創造目標的資料夾
RUN mkdir -p /easy-booking-app
WORKDIR /easy-booking-app

RUN apk update && apk upgrade
RUN apk add git

COPY package*.json ./

RUN yarn install && yarn cache clean
# CMD ["sh", "-c", "npm install && npm run dev"]
# 把當下資料夾內容複製到容器內的指定的資料夾底下 (若有 dockerignore 會忽略指定的內容)
COPY . /easy-booking-app

# 安裝所有套件並建置
# RUN yarn install
# 若 你是整包原始碼裝過來的話，請設定 .dockerignore 並加上下一行
# RUN npm build

# 把容器對外的 port 開啟
EXPOSE 3000

# 容器內 我們 nuxt 的 host 和 port 指定給環境變數
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

# 執行鏡像時會執行的 script
# CMD [ "yarn", "dev" ]
ENTRYPOINT [ "yarn", "dev" ]