package services

import "github.com/SuzukiTakuto/MusicIntroduction/models"

type UserService interface {
	CreateUser(*models.User) error
	GetUser(name *string) (*models.User, error)
	FindUser(email *string) (*models.User, error)
	GetAll() ([]*models.User, error)
	UpdateUser(*models.User) error
	DeleteUser(*string) error
}
