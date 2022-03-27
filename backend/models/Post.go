package models

type Post struct {
	PostId    string `json:"postId" bson:"postId"`
	UserId    string `json:"userId" bson:"userId"`
	Musicname string `json:"musicname" bson:"musicname"`
	Album     string `json:"album" bson:"album"`
	Comment   string `json:"comment" bson:"comment"`
	Date      string `json:"date" bson:"date"`
}
