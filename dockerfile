FROM golang

WORKDIR /app
COPY . .

RUN go env -w GOPROXY=https://mirrors.aliyun.com/goproxy
RUN go mod tidy
RUN go build -o main main.go

CMD ["./main"]