FROM golang:latest
RUN mkdir /usr/src/backend
WORKDIR /usr/src/backend
# ローカルの、go.modとgo.sumをコピー
COPY go.mod go.sum ./
# 依存ライブラリをダウンロードする
RUN go mod download