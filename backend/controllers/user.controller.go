package controllers

import (
	"fmt"
	"log"
	"net/http"
	"strings"

	"github.com/SuzukiTakuto/MusicIntroduction/helper"
	"github.com/SuzukiTakuto/MusicIntroduction/models"
	"github.com/SuzukiTakuto/MusicIntroduction/services"
	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

var validate = validator.New()

type UserController struct {
	UserService services.UserService
}

func HashPassword(password string) string {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	if err != nil {
		log.Panic(err)
	}
	return string(bytes)
}

func VerifyPassword(userPassword string, providedPassword string) (bool, string) {
	err := bcrypt.CompareHashAndPassword([]byte(providedPassword), []byte(userPassword))
	check := true
	msg := ""

	if err != nil {
		msg = fmt.Sprintf("email of password is incorrect")
		check = false
	}
	return check, msg
}

func NewUser(userservice services.UserService) UserController {
	return UserController{
		UserService: userservice,
	}
}

func (uc *UserController) CreateUser(ctx *gin.Context) {
	var user models.User
	if err := ctx.ShouldBindJSON(&user); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	validationErr := validate.Struct(user)
	if validationErr != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": validationErr.Error()})
		return
	}

	newId, _ := uuid.NewUUID()
	user.UserId = newId.String()

	password := HashPassword(user.Password)
	user.Password = password

	err := uc.UserService.CreateUser(&user)
	if err != nil {
		log.Panic(err)
		ctx.JSON(http.StatusBadGateway, gin.H{"message": err.Error()})
		return
	}

	token, _, _ := helper.GenerateAllTokens(user.Username, user.Email)

	ctx.JSON(http.StatusOK, gin.H{"token": token})
}

func (uc *UserController) LoginUser(ctx *gin.Context) {
	//var dbUser *models.User
	var loginUser models.LoginUser

	if err := ctx.ShouldBindJSON(&loginUser); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	dbUser, err := uc.UserService.FindUser(&loginUser.Email)
	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"message": err.Error()})
		return
	}

	passwordIsValid, msg := VerifyPassword(loginUser.Password, dbUser.Password)
	if passwordIsValid != true {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": msg})
		return
	}

	if dbUser.Email == "" {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "user not found"})
	}

	token, _, _ := helper.GenerateAllTokens(dbUser.Username, dbUser.Email)
	ctx.JSON(200, gin.H{
		"token": token,
	})
}

func (uc *UserController) GetUser(ctx *gin.Context) {
	token := ctx.Request.Header["Authorization"]

	slice := strings.Split(token[0], " ")
	auth, _ := helper.Parse_proc(slice[1])

	user, err := uc.UserService.GetUser(&auth.Username)
	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"message": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, user)
}

func (uc *UserController) GetAll(ctx *gin.Context) {
	users, err := uc.UserService.GetAll()
	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"message": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, users)
}

func (uc *UserController) UpdateUser(ctx *gin.Context) {
	var user models.User
	if err := ctx.ShouldBindJSON(&user); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}
	err := uc.UserService.UpdateUser(&user)
	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"message": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"message": "success"})
}

func (uc *UserController) DeleteUser(ctx *gin.Context) {
	username := ctx.Param("name")
	err := uc.UserService.DeleteUser(&username)
	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"message": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"message": "success"})
}

func (uc *UserController) RegisterUserRoutes(rg *gin.RouterGroup) {

	userroute := rg.Group("/user")
	userroute.POST("/login", uc.LoginUser)
	userroute.POST("/create", uc.CreateUser)
	userroute.GET("/get/", uc.GetUser)
	userroute.GET("/getall", uc.GetAll)
	userroute.POST("/update", uc.UpdateUser)
	userroute.POST("/delete/:name", uc.DeleteUser)
}
