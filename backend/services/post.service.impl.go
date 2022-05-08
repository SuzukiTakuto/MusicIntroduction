package services

import (
	"context"
	"errors"

	"github.com/SuzukiTakuto/MusicIntroduction/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type PostServiceImpl struct {
	postcollection *mongo.Collection
	ctx            context.Context
}

func NewPostService(postcollection *mongo.Collection, ctx context.Context) PostService {
	return &PostServiceImpl{
		postcollection: postcollection,
		ctx:            ctx,
	}
}

func (p *PostServiceImpl) CreatePost(post *models.Post) error {
	_, err := p.postcollection.InsertOne(p.ctx, post)
	return err
}

/*func (u *PostServiceImpl) GetPost(name *string) (*models.Post, error) {
	var post *models.Post
	query := bson.D{bson.E{Key: "username", Value: name}}
	err := u.postcollection.FindOne(u.ctx, query).Decode(&post)
	return user, err
}*/

func (p *PostServiceImpl) GetAll() ([]*models.Post, error) {
	var posts []*models.Post
	cursor, err := p.postcollection.Find(p.ctx, bson.D{{}})
	if err != nil {
		return nil, err
	}
	for cursor.Next(p.ctx) {
		var post models.Post
		err := cursor.Decode(&post)
		if err != nil {
			return nil, err
		}
		posts = append(posts, &post)
	}
	if err := cursor.Err(); err != nil {
		return nil, err
	}
	cursor.Close(p.ctx)
	if len(posts) == 0 {
		return nil, errors.New("documents not found")
	}
	return posts, nil
}
