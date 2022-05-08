package controllers

import (
	"fmt"
	"net/http"
	"time"

	"github.com/SuzukiTakuto/MusicIntroduction/models"
	"github.com/SuzukiTakuto/MusicIntroduction/services"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type PostController struct {
	PostService services.PostService
}

func NewPost(postservice services.PostService) PostController {
	return PostController{
		PostService: postservice,
	}
}

func (pc *PostController) CreatePost(ctx *gin.Context) {
	var post models.Post
	if err := ctx.ShouldBindJSON(&post); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	newId, _ := uuid.NewUUID()
	post.PostId = newId.String()

	post.Date = time.Now()

	fmt.Println(post)

	err := pc.PostService.CreatePost(&post)
	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"message": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": http.StatusOK})
}

func (pc *PostController) GetAll(ctx *gin.Context) {
	posts, err := pc.PostService.GetAll()
	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"message": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"posts": posts})
}

func (pc *PostController) RegisterPostRoutes(rg *gin.RouterGroup) {
	postroute := rg.Group("/post")
	postroute.POST("/create", pc.CreatePost)
	postroute.GET("/getall", pc.GetAll)
}
