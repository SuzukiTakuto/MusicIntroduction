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
)

var (
	server         *gin.Engine
	userservice    services.UserService
	postservice    services.PostService
	usercontroller controllers.UserController
	postcontroller controllers.PostController
	ctx            context.Context
	usercollection *mongo.Collection
	postcollection *mongo.Collection
	mongoclient    *mongo.Client
	err            error
)

func init() {

	serverAPIOptions := options.ServerAPI(options.ServerAPIVersion1)

	mongoconn := options.Client().ApplyURI("mongodb+srv://takt:Zeldalink0907@cluster0.tqbty.mongodb.net/Cluster0?retryWrites=true&w=majority").SetServerAPIOptions(serverAPIOptions)
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	mongoclient, err := mongo.Connect(ctx, mongoconn)
	if err != nil {
		log.Fatal(err)
	}

	/*ctx := context.Background()
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
	}*/

	fmt.Println("mongo connection established")

	usercollection = mongoclient.Database("Cluster0").Collection("users")
	postcollection = mongoclient.Database("Cluster0").Collection("post")
	userservice = services.NewUserService(usercollection, ctx)
	postservice = services.NewPostService(postcollection, ctx)
	usercontroller = controllers.NewUser(userservice)
	postcontroller = controllers.NewPost(postservice)
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
	postcontroller.RegisterPostRoutes(basepath)

	log.Fatal(server.Run(":8000"))
}
