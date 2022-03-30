package main

import (
	"context"
	"fmt"
	"log"
	"time"

	"github.com/SuzukiTakuto/MusicIntroduction/controllers"
	"github.com/SuzukiTakuto/MusicIntroduction/services"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

var (
	server         *gin.Engine
	userservice    services.UserService
	usercontroller controllers.UserController
	ctx            context.Context
	usercollection *mongo.Collection
	mongoclient    *mongo.Client
	err            error
)

func init() {
	ctx := context.Background()

	mongoconn := options.Client().ApplyURI("mongodb://root:password123@mongodb:27017/MusicIntroduction?authSource=admin")
	mongoclient, err = mongo.Connect(ctx, mongoconn)
	if err != nil {
		log.Println("---------------------------")
		log.Fatal(err)
	}
	err = mongoclient.Ping(context.TODO(), readpref.Primary())
	if err != nil {
		log.Println("===========================")
		log.Fatal(err)
	}

	fmt.Println("mongo connection established")

	usercollection = mongoclient.Database("MusicIntroduction").Collection("users")
	userservice = services.NewUserService(usercollection, ctx)
	usercontroller = controllers.New(userservice)
	server = gin.Default()
}

// v1/user/create
func main() {
	server.Use(cors.New(cors.Config{
		// アクセスを許可したいアクセス元
		AllowOrigins: []string{
			"http://localhost:3000",
		},
		// アクセスを許可したいHTTPメソッド(以下の例だとPUTやDELETEはアクセスできません)
		AllowMethods: []string{
			"POST",
			"GET",
			"DELETE",
			"OPTIONS",
		},
		// 許可したいHTTPリクエストヘッダ
		AllowHeaders: []string{
			"Access-Control-Allow-Credentials",
			"Access-Control-Allow-Headers",
			"Content-Type",
			"Content-Length",
			"Accept-Encoding",
			"Authorization",
		},
		// cookieなどの情報を必要とするかどうか
		AllowCredentials: true,
		// preflightリクエストの結果をキャッシュする時間
		MaxAge: 24 * time.Hour,
	}))

	defer mongoclient.Disconnect(ctx)

	basepath := server.Group("/v1")
	usercontroller.RegisterUserRoutes(basepath)

	log.Fatal(server.Run(":8000"))
}
