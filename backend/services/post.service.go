package services

import "github.com/SuzukiTakuto/MusicIntroduction/models"

type PostService interface {
	CreatePost(*models.Post) error
	//GetPost(name *string) (*models.Post, error)
	//FindPost(email *string) (*models.Post, error)
	GetAll() ([]*models.Post, error)
	//UpdatePost(*models.Post) error
	//DeletePost(*string) error
}
